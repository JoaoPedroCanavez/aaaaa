from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # O Django já cria username, password, first_name, last_name, email e is_active
    email = models.EmailField(unique=True)
    is_admin = models.BooleanField(default=False)
    
    # Exemplo: Se quiser guardar a foto do operador futuramente
    avatar_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.username


# 2. CONFIGURAÇÃO DA IA
class IAConfig(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(help_text="Descrição do comportamento da IA (Prompt do Sistema)")
    
    functions_names = models.JSONField(default=list, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome


# 3. LEADS (CLIENTES)
class Lead(models.Model):
    STATUS_CHOICES = [
        ('EM_ANDAMENTO', 'Em andamento'),
        ('CONVERTIDO', 'Convertido'),
        ('NAO_CONVERTIDO', 'Não Convertido'),
        ('CANCELADO', 'Cancelado'),
    ]

    nome = models.CharField(max_length=120)
    numero_telefone = models.CharField(max_length=30, unique=True) 
    email = models.EmailField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='EM_ANDAMENTO')
    tags = models.JSONField(default=list, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nome} ({self.numero_telefone})"


# 4. CONVERSAS
class Conversa(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='conversas')
    
    # O operador pode ser null (conversa só com a IA ou aguardando atendimento)
    operador = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='atendimentos')
    
    # Opcional: Vincular qual IA está ativa nesta conversa
    ia_config = models.ForeignKey(IAConfig, on_delete=models.SET_NULL, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) # Serve para ordenar: conversas mais recentes no topo

    # Otimização para listar conversas sem ler todas as mensagens
    last_message_content = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Chat com {self.lead.nome}"


# 5. MENSAGENS
class Mensagem(models.Model):
    TIPO_REMETENTE = [
        ('LEAD', 'Lead'),
        ('OPERADOR', 'Operador'),
        ('IA', 'IA'),
        ('SISTEMA', 'Sistema'), # Para avisos como "Atendimento iniciado"
    ]

    conversa = models.ForeignKey(Conversa, on_delete=models.CASCADE, related_name='mensagens')
    remetente_tipo = models.CharField(max_length=10, choices=TIPO_REMETENTE)
    
    # Conteúdo do texto. Se for áudio/imagem, você pode guardar a URL aqui ou num campo separado
    conteudo = models.TextField(blank=True, null=True)
    
    # O MongoDB permite guardar o JSON inteiro que vem da Z-API/Meta
    # Isso é CRUCIAL para debugar problemas ou pegar IDs de mensagem depois
    meta_dados_brutos = models.JSONField(default=dict, blank=True)
    
    # ID da mensagem no WhatsApp (para evitar duplicidade de webhooks)
    whatsapp_id = models.CharField(max_length=100, blank=True, null=True, db_index=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.remetente_tipo}] {self.conteudo[:20]}..."