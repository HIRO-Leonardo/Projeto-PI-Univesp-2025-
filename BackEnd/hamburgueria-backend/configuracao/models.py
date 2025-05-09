from django.db import models

class HorarioFuncionamento(models.Model):
    dia_semana = models.CharField(max_length=20)
    hora_abertura = models.TimeField()
    hora_fechamento = models.TimeField()
    tipo = models.CharField(max_length=20, choices=[
        ('Regular', 'Regular'),
        ('Feriado', 'Feriado'),
        ('Evento', 'Evento')
    ], default='Regular')
    data_especifica = models.DateField(null=True, blank=True)