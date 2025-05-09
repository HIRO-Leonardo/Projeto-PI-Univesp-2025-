from django.urls import path, include
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('api/menu/', include('menu.urls')),
    path('api/estoque/', include('inventory.urls')),
    path('api/mesas/', include('mesas.urls')),
    path('api/config/', include('configuracao.urls')),
    path('api/usuarios/', include('users.urls')),
]
