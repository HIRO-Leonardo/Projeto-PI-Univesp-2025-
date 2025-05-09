from rest_framework import serializers
from .models import HorarioFuncionamento

class HorarioFuncionamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioFuncionamento
        fields = '__all__'