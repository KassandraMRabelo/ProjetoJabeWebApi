from django.urls import path
from .views import login, criar_alerta, criar_denuncia

urlpatterns = [
    path('login/', login),
    path('alerta/', criar_alerta),
    path('denuncia/', criar_denuncia),
]
