from django.contrib.auth.models import User
from rest_framework import serializers
from .models import League, Team, Player


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password","email","first_name","last_name"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_username(self, value):
        # Check if the username already exists in the database
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Username is already taken')
        return value        

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ['id', 'name', 'description']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name',  'description']

class PlayerSerializer(serializers.ModelSerializer):
    team = TeamSerializer()

    class Meta:
        model = Player
        fields = [
            'id', 'name', 'team', 'price', 'image', 'element_type',
            'assists', 'bonus', 'bps', 'clean_sheets', 'creativity',
            'goals_conceded', 'goals_scored', 'ict_index', 'influence',
            'minutes', 'own_goals', 'penalties_missed', 'penalties_saved',
            'red_cards', 'saves', 'threat', 'total_points', 'yellow_cards'
        ]