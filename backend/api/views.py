from django.shortcuts import render
from .models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CustomTokenObtainPairSerializer
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Lead
from django.utils import timezone
from datetime import datetime
from dateutil.relativedelta import relativedelta
from django.db.models import Q


def _set_token_cookies(response, access, refresh):
    """Set HttpOnly cookies for access and refresh tokens on the response."""
    secure = not settings.DEBUG
    # access token (~30min) and refresh token (~1 day) lifetimes are configured in SIMPLE_JWT
    # here we set reasonable max-age values (in seconds)
    if access:
        response.set_cookie(
            'accessToken',
            access,
            max_age=30 * 60,
            httponly=True,
            secure=secure,
            samesite='Lax',
            path='/'
        )
    if refresh:
        response.set_cookie(
            'refreshToken',
            refresh,
            max_age=24 * 60 * 60,
            httponly=True,
            secure=secure,
            samesite='Lax',
            path='/'
        )

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # call parent to validate credentials and build response data
        response = super().post(request, *args, **kwargs)
        try:
            if response.status_code == 200 and isinstance(response.data, dict):
                access = response.data.get('access')
                refresh = response.data.get('refresh')
                # set HttpOnly cookies (server-side). Keep body for SPA compatibility.
                _set_token_cookies(response, access, refresh)
        except Exception:
            # don't raise on cookie-setting errors; return original response
            pass
        return response


class CustomTokenRefreshView(TokenRefreshView):
    # ensure refreshed tokens are also set as HttpOnly cookies
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        try:
            if response.status_code == 200 and isinstance(response.data, dict):
                access = response.data.get('access')
                refresh = response.data.get('refresh')
                _set_token_cookies(response, access, refresh)
        except Exception:
            pass
        return response

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_metrics(request):
    """Return conversion and cancellation rates for the last 6 months based on Lead.status.

    Response format:
    {
      labels: ['Jan','Fev',...],
      conversion: [24.5, ...],
      cancellation: [3.5, ...],
      conversion_latest: 24.5,
      cancellation_latest: 3.5
    }
    """
    # default: last 6 months including current month
    now = timezone.now()
    months = []
    labels = []
    conv_values = []
    cancel_values = []

    # build month ranges from oldest to newest
    for i in range(5, -1, -1):
        m = (now - relativedelta(months=i)).replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        start = m
        end = (m + relativedelta(months=1))
        months.append((start, end))
        labels.append(m.strftime('%b'))

    total_counts = []
    converted_counts = []
    canceled_counts = []

    for start, end in months:
        total = Lead.objects.filter(created_at__gte=start, created_at__lt=end).count()
        # Tolerant status matching: prefer case-insensitive exact match but
        # also count common variants (contains 'convert' / 'cancel') so
        # Mongo values with different casing or small variations are handled.
        try:
            conv_q = Q(status__iexact='CONVERTIDO') | Q(status__icontains='convert') | Q(status__icontains='convertid') | Q(status__iexact='CONVERTED')
            cancel_q = Q(status__iexact='CANCELADO') | Q(status__icontains='cancel') | Q(status__iexact='CANCELED')

            converted = Lead.objects.filter(created_at__gte=start, created_at__lt=end).filter(conv_q).count()
            canceled = Lead.objects.filter(created_at__gte=start, created_at__lt=end).filter(cancel_q).count()
        except Exception:
            # Fallback: best-effort exact matches
            converted = Lead.objects.filter(created_at__gte=start, created_at__lt=end, status__iexact='CONVERTIDO').count()
            canceled = Lead.objects.filter(created_at__gte=start, created_at__lt=end, status__iexact='CANCELADO').count()

        conv_pct = round((converted / total * 100) if total > 0 else 0, 1)
        cancel_pct = round((canceled / total * 100) if total > 0 else 0, 1)

        conv_values.append(conv_pct)
        cancel_values.append(cancel_pct)

        total_counts.append(total)
        converted_counts.append(converted)
        canceled_counts.append(canceled)

    resp = {
        'labels': labels,
        'conversion': conv_values,
        'cancellation': cancel_values,
        'conversion_latest': conv_values[-1] if conv_values else 0,
        'cancellation_latest': cancel_values[-1] if cancel_values else 0,
    }

    # Include absolute counts per month
    resp.update({
        'total_counts': total_counts,
        'converted_counts': converted_counts,
        'canceled_counts': canceled_counts,
    })

    return Response(resp)
