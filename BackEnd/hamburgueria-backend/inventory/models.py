from django.db import models

class EstoqueItem(models.Model):
    nome = models.CharField(max_length=100)
    quantidade = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    unidade = models.CharField(max_length=20, default='unid')
    status = models.CharField(max_length=10, choices=[('OK', 'OK'), ('Baixo', 'Baixo'), ('Alto', 'Alto')], default='OK')
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.nome} ({self.status})'