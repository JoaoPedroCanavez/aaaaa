from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, CustomTokenObtainPairView, CustomTokenRefreshView, dashboard_metrics
from django.views.generic import TemplateView
from django.urls import include
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', TemplateView.as_view(template_name='login.html'), name='home'),
    # Dashboard app routes (rendered by dashboard_app)
    path('dashboard/', include('dashboard_app.urls')),

    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/dashboard/metrics/', dashboard_metrics),
]