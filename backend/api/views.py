from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from .models import League, Team, Player,Squad,Transfer,Gameweek
from .serializers import LeagueSerializer, TeamSerializer, PlayerSerializer,TransferSerializer,GameweekSerializer,SquadSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class TransferViewSet(viewsets.ModelViewSet):
    queryset = Transfer.objects.all()
    serializer_class = TransferSerializer
    permission_classes = [IsAuthenticated]


class GameweekViewSet(viewsets.ModelViewSet):
    queryset = Gameweek.objects.all()
    serializer_class = GameweekSerializer
    permission_classes = [IsAuthenticated]


class PlayerListView(generics.ListAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class SquadViewSet(viewsets.ModelViewSet):
    queryset = Squad.objects.all()
    serializer_class = SquadSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
