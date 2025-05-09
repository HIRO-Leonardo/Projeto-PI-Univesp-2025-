from django.db import models

class EstoqueItem(models.Model):
    nome = models.CharField(max_length=100)
    quantidade = models.DecimalField(max_digits=10, decimal_places=2)
    unidade = models.CharField(max_length=20, default='unid')
    status = models.CharField(max_length=10, choices=[('OK', 'OK'), ('Baixo', 'Baixo'), ('Alto', 'Alto')])

    def __str__(self):
        return f'{self.nome} ({self.status})'