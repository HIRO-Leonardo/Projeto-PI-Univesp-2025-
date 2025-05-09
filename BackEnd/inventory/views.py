from rest_framework import viewsets
from .models import EstoqueItem
from .serializers import EstoqueItemSerializer

class EstoqueItemViewSet(viewsets.ModelViewSet):
    queryset = EstoqueItem.objects.all().order_by('nome')
    serializer_class = EstoqueItemSerializer