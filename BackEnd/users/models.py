from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    FUNCOES = [
        ('Administrador', 'Administrador'),
        ('Garcom', 'Garçom'),
        ('Caixa', 'Caixa'),
        ('Cozinha', 'Cozinha')
    ]
    funcao = models.CharField(max_length=20, choices=FUNCOES, default='Garcom')