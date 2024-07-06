from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeagueViewSet, TeamViewSet, PlayerViewSet, GameweekViewSet, SquadViewSet, TransferViewSet

router = DefaultRouter()
router.register(r'leagues', LeagueViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'gameweeks', GameweekViewSet)
router.register(r'squads', SquadViewSet)
router.register(r'transfers', TransferViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
