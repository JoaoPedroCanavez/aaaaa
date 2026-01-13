from functools import wraps
from django.shortcuts import redirect
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


def jwt_required(redirect_to='/login/'):
    """Decorator para views Django que valida JWT no cabeçalho Authorization.
    Se o token for inválido ou ausente, redireciona para `redirect_to`.
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            auth = JWTAuthentication()
            # Prefer header Authorization, fallback to cookie 'accessToken'
            header = auth.get_header(request)
            raw_token = None
            if header is not None:
                try:
                    raw_token = auth.get_raw_token(header)
                except Exception:
                    raw_token = None
            if raw_token is None:
                # check cookie
                raw_token = request.COOKIES.get('accessToken')
            if raw_token is None:
                return redirect(redirect_to)
            try:
                validated = auth.get_validated_token(raw_token)
                user = auth.get_user(validated)
                request.user = user
            except (InvalidToken, TokenError, Exception):
                return redirect(redirect_to)
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator
