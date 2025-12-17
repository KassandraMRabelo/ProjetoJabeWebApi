from django.db import models
from django.contrib.auth.models import User

class Alerta(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14)
    telefone = models.CharField(max_length=20)
    latitude = models.FloatField()
    longitude = models.FloatField()
    criado_em = models.DateTimeField(auto_now_add=True)

class Denuncia(models.Model):
    usuario = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    anonima = models.BooleanField(default=False)
    nome = models.CharField(max_length=100, blank=True)
    cpf = models.CharField(max_length=14, blank=True)
    telefone = models.CharField(max_length=20, blank=True)
    tipo = models.CharField(max_length=100)
    local = models.CharField(max_length=200)
    descricao = models.TextField()

    agressor_nome = models.CharField(max_length=100, blank=True)
    agressor_idade = models.IntegerField(null=True, blank=True)
    agressor_descricao = models.TextField(blank=True)
    agressor_relacionamento = models.CharField(max_length=100, blank=True)
    agressor_endereco = models.CharField(max_length=200, blank=True)

    criado_em = models.DateTimeField(auto_now_add=True)
