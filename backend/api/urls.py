from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeagueViewSet, TeamViewSet, PlayerViewSet

router = DefaultRouter()
router.register(r'leagues', LeagueViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'players', PlayerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
