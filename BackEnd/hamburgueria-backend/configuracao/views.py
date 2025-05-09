from rest_framework import viewsets
from .models import HorarioFuncionamento
from .serializers import HorarioFuncionamentoSerializer

class HorarioFuncionamentoViewSet(viewsets.ModelViewSet):
    queryset = HorarioFuncionamento.objects.all()
    serializer_class = HorarioFuncionamentoSerializer