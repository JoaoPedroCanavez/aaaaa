from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Lead, Conversa, Mensagem, IAConfig

# Registra o seu Usuário personalizado com o visual padrão do Django
admin.site.register(User, UserAdmin)

# Registra as outras tabelas para você poder manipular visualmente
@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('nome', 'numero_telefone', 'status', 'created_at')
    search_fields = ('nome', 'numero_telefone')

@admin.register(Conversa)
class ConversaAdmin(admin.ModelAdmin):
    list_display = ('id', 'lead', 'operador', 'updated_at')
    list_filter = ('operador',)

@admin.register(Mensagem)
class MensagemAdmin(admin.ModelAdmin):
    list_display = ('conversa', 'remetente_tipo', 'timestamp')
    # Isso permite ver o JSON bruto dentro do admin de forma bonita
    readonly_fields = ('timestamp',) 

admin.site.register(IAConfig)