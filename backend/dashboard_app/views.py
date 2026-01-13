from django.shortcuts import render
from django.http import FileResponse, Http404
from django.conf import settings
import os
from .auth import jwt_required
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import redirect

# Views para renderizar as páginas do dashboard.
# Comentários são curtos e objetivos, explicando apenas a finalidade.

@jwt_required(redirect_to='/login/')
def admin_dashboard(request):
    """Renderiza a página principal do painel do administrador.

    Acesso protegido por JWT; se o build estático existir, serve o
    `index.html` do frontend, caso contrário cai em fallback.
    """
    # Apenas administradores/staff podem acessar esta rota.
    user = getattr(request, 'user', None)
    if not (getattr(user, 'is_staff', False) or getattr(user, 'is_admin', False)):
        # redireciona para root, que decidirá a rota correta para este usuário
        return redirect('/dashboard/')

    index_path = os.path.join(settings.BASE_DIR, 'static', 'dashboard', 'index.html')
    if os.path.exists(index_path):
        return FileResponse(open(index_path, 'rb'), content_type='text/html')
    return render(request, 'dashboard_admin.html')


@jwt_required(redirect_to='/login/')
def user_dashboard(request):
    """Renderiza a página do usuário (serve `dashborad/src` build).

    Protegida por JWT; serve o SPA `index.html` para a rota `dashboard/user`.
    """
    # Apenas usuários não-administradores podem acessar esta rota.
    user = getattr(request, 'user', None)
    if (getattr(user, 'is_staff', False) or getattr(user, 'is_admin', False)):
        return redirect('/dashboard/')

    index_path = os.path.join(settings.BASE_DIR, 'static', 'dashboard', 'index.html')
    if os.path.exists(index_path):
        return FileResponse(open(index_path, 'rb'), content_type='text/html')
    return render(request, 'dashboard_user.html')


def dashboard_root(request):
    """Redireciona '/dashboard/' para '/dashboard/admin/' ou '/dashboard/user/'.

    Se o cabeçalho Authorization contiver um JWT válido, decide com base em
    `user.is_staff` ou `user.is_admin`. Caso contrário redireciona para login.
    """
    auth = JWTAuthentication()
    header = auth.get_header(request)
    raw_token = None
    if header is not None:
        try:
            raw_token = auth.get_raw_token(header)
        except Exception:
            raw_token = None
    if raw_token is None:
        raw_token = request.COOKIES.get('accessToken')
    if raw_token is None:
        return redirect('/login/')
    try:
        validated = auth.get_validated_token(raw_token)
        user = auth.get_user(validated)
        # ROTAS INVERTIDAS: enviar administradores para '/dashboard/user/'
        # e usuários normais para '/dashboard/admin/'.
        if getattr(user, 'is_staff', False) or getattr(user, 'is_admin', False):
            return redirect('/dashboard/user/')
        return redirect('/dashboard/admin/')
    except Exception:
        return redirect('/login/')
