from django.db import models

class Mesa(models.Model):
    numero = models.PositiveIntegerField(unique=True)
    capacidade = models.PositiveIntegerField(default=4)
    localizacao = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=[
        ('Disponível', 'Disponível'),
        ('Reservada', 'Reservada'),
        ('Ocupada', 'Ocupada')
    ], default='Disponível')
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Mesa {self.numero}'