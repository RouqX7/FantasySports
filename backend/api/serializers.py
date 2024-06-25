from django.contrib.auth.models import User
from rest_framework import serializers
from .models import League, Team, Player, Squad, Gameweek, Transfer,PlayerPerformance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password","email","first_name","last_name"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_username(self, value):
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

class GameweekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameweek
        fields = ['id', 'number', 'start_date', 'end_date']

class TransferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transfer
        fields = ['id', 'squad', 'player_out', 'player_in', 'gameweek']

class SquadSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True)
    starting_lineup = PlayerSerializer(many=True)
    captain = PlayerSerializer()
    transfers = TransferSerializer(many=True, read_only=True)

    class Meta:
        model = Squad
        fields = ['id', 'user', 'players', 'starting_lineup', 'captain', 'budget', 'wildcard_used', 'bench_boost_used', 'free_hit_used', 'transfers_available', 'last_transfer_gameweek', 'transfers']

    def validate(self, data):
        if len(data['players']) > 15:
            raise serializers.ValidationError("Cannot have more than 15 players in a squad")
        if len(data['starting_lineup']) > 11:
            raise serializers.ValidationError("Cannot have more than 11 players in the starting lineup")
        team_counts = {}
        for player in data['players']:
            team_counts[player.team.id] = team_counts.get(player.team.id, 0) + 1
            if team_counts[player.team.id] > 3:
                raise serializers.ValidationError("Cannot have more than 3 players from one team in a squad")
        total_price = sum(player.price for player in data['players'])
        if total_price > 100.0 and not data.get('free_hit_used', False):
            raise serializers.ValidationError("Total squad price cannot exceed 100 million")
        return data

    def create(self, validated_data):
        players_data = validated_data.pop('players')
        starting_lineup_data = validated_data.pop('starting_lineup')
        captain_data = validated_data.pop('captain')
        squad = Squad.objects.create(**validated_data)
        squad.players.set(players_data)
        squad.starting_lineup.set(starting_lineup_data)
        squad.captain = captain_data
        squad.save()
        return squad
    

class PlayerPerformanceSerializer(serializers.ModelSerializer):
    player_name = serializers.SerializerMethodField()

    class Meta:
        model = PlayerPerformance
        fields = ['id', 'player', 'player_name', 'gameweek', 'total_points', 'goals_scored', 'assists', 'clean_sheets', 'goals_conceded', 'saves']

    def get_player_name(self, obj):
        return obj.player.name