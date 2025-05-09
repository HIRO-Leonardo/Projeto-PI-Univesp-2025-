from rest_framework import serializers
from .models import EstoqueItem

class EstoqueItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstoqueItem
        fields = '__all__'