from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from .models import Alerta, Denuncia


@api_view(['POST'])
def login(request):
    user = authenticate(
        username=request.data.get('username'),
        password=request.data.get('password')
    )

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "success": True,
            "token": token.key
        })

    return Response({
        "success": False,
        "message": "Usuário ou senha inválidos"
    }, status=401)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def criar_alerta(request):
    Alerta.objects.create(
        usuario=request.user,
        nome=request.data['nome'],
        cpf=request.data['cpf'],
        telefone=request.data['telefone'],
        latitude=request.data['latitude'],
        longitude=request.data['longitude']
    )

    return Response({
        "success": True,
        "message": "Alerta registrado com sucesso"
    })

@api_view(['POST'])
def criar_denuncia(request):
    Denuncia.objects.create(
        usuario=request.user if request.user.is_authenticated else None,
        anonima=request.data['anonima'],
        nome=request.data.get('nome', ''),
        cpf=request.data.get('cpf', ''),
        telefone=request.data.get('telefone', ''),
        tipo=request.data['tipo'],
        local=request.data['local'],
        descricao=request.data['descricao'],

        agressor_nome=request.data.get('agressor_nome', ''),
        agressor_idade=request.data.get('agressor_idade'),
        agressor_descricao=request.data.get('agressor_descricao', ''),
        agressor_relacionamento=request.data.get('agressor_relacionamento', ''),
        agressor_endereco=request.data.get('agressor_endereco', '')
    )

    return Response({
        "success": True,
        "message": "Denúncia registrada com sucesso"
    })
