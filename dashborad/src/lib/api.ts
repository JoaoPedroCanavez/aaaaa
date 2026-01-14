import axios from 'axios';

// Cria uma instância do axios com a URL base da sua API Django
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000', // Ajuste se seu IP for diferente
  headers: {
    'Content-Type': 'application/json',
  },
});

// INTERCEPTOR DE REQUISIÇÃO
// Antes de sair do React, injeta o Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// INTERCEPTOR DE RESPOSTA (Opcional, mas recomendado)
// Se der erro 401 (Token expirado), tenta usar o Refresh Token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se o erro for 401 e não for uma tentativa de refresh que já falhou
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error("Sem refresh token");

        // Tenta pegar um novo token com o Django
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: refreshToken
        });

        const { access } = response.data;
        
        // Salva o novo token
        localStorage.setItem('accessToken', access);
        
        // Atualiza o header e refaz a requisição original
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        // Se falhar o refresh, desloga o usuário
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;