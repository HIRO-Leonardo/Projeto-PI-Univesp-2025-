from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EstoqueItemViewSet

router = DefaultRouter()
router.register(r'estoque', EstoqueItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]