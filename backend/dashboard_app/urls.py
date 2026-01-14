from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_root, name='dashboard_root'),
    # rotas invertidas conforme solicitado: 'admin/' serve a view do usuário e
    # 'user/' serve a view do administrador
    path('admin/', views.admin_dashboard, name='dashboard_admin'),
    path('user/', views.user_dashboard, name='dashboard_user'),
]
