from django.db import models
from django.contrib.auth.models import User
from django.db.models import Count


class League(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class Team(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Player(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True)  # Adjust nullability based on your data
    price = models.DecimalField(max_digits=6, decimal_places=1)
    image = models.URLField(null=True, blank=True)
    element_type = models.IntegerField()
    assists = models.IntegerField(default=0)
    bonus = models.IntegerField(default=0)
    bps = models.IntegerField(default=0)
    clean_sheets = models.IntegerField(default=0)
    creativity = models.DecimalField(max_digits=6, decimal_places=1, default=0.0)
    goals_conceded = models.IntegerField(default=0)
    goals_scored = models.IntegerField(default=0)
    ict_index = models.DecimalField(max_digits=6, decimal_places=1, default=0.0)
    influence = models.DecimalField(max_digits=6, decimal_places=1, default=0.0)
    minutes = models.IntegerField(default=0)
    own_goals = models.IntegerField(default=0)
    penalties_missed = models.IntegerField(default=0)
    penalties_saved = models.IntegerField(default=0)
    red_cards = models.IntegerField(default=0)
    saves = models.IntegerField(default=0)
    threat = models.DecimalField(max_digits=6, decimal_places=1, default=0.0)
    total_points = models.IntegerField(default=0)
    yellow_cards = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Gameweek(models.Model):
    number = models.IntegerField(unique=True)
    name = models.CharField(max_length=50)
    deadline_time = models.DateTimeField()
    average_entry_score = models.IntegerField(null=True, blank=True)
    highest_score = models.IntegerField(null=True, blank=True)
    is_previous = models.BooleanField(default=False)
    is_current = models.BooleanField(default=False)
    is_next = models.BooleanField(default=False)

    def __str__(self):
        return f"Gameweek {self.number} - {self.name}"

class Squad(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    players = models.ManyToManyField(Player, related_name='squads')
    starting_lineup = models.ManyToManyField(Player, related_name='starting_lineup')
    captain = models.ForeignKey(Player, related_name='captain', on_delete=models.SET_NULL, null=True, blank=True)
    budget = models.DecimalField(max_digits=8, decimal_places=1, default=100.0)
    wildcard_used = models.IntegerField(default=0)
    bench_boost_used = models.BooleanField(default=False)
    free_hit_used = models.BooleanField(default=False)
    transfers_available = models.IntegerField(default=1)
    last_transfer_gameweek = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.players.count() > 15:
            raise ValueError("Cannot have more than 15 players in a squad")
        if self.players.values('team').annotate(count=models.Count('team')).filter(count__gt=3).exists():
            raise ValueError("Cannot have more than 3 players from one team in a squad")
        total_price = sum(player.price for player in self.players.all())
        if total_price > 100.0 and not self.free_hit_used:
            raise ValueError("Total squad price cannot exceed 100 million")
        if self.starting_lineup.count() > 11:
            raise ValueError("Cannot have more than 11 players in the starting lineup")
        super().save(*args, **kwargs)

    def calculate_points(self, gameweek):
        points = sum(player.total_points for player in self.starting_lineup.all())
        if self.captain:
            points += self.captain.total_points
        if self.bench_boost_used:
            points += sum(player.total_points for player in self.players.all())
        return points

    def update_transfers(self, current_gameweek):
        if self.last_transfer_gameweek < current_gameweek:
            self.transfers_available = min(2, self.transfers_available + 1)
            self.last_transfer_gameweek = current_gameweek
        self.save()

class Transfer(models.Model):
    squad = models.ForeignKey(Squad, on_delete=models.CASCADE, related_name='transfers')
    player_out = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='transfers_out')
    player_in = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='transfers_in')
    gameweek = models.ForeignKey(Gameweek, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self.squad.transfers_available < 1:
            raise ValueError("No transfers available")
        if self.player_in.price > self.player_out.price + self.squad.budget:
            raise ValueError("Insufficient budget for transfer")
        self.squad.players.remove(self.player_out)
        self.squad.players.add(self.player_in)
        self.squad.budget -= self.player_in.price - self.player_out.price
        self.squad.transfers_available -= 1
        self.squad.save()
        super().save(*args, **kwargs)

class PlayerPerformance(models.Model):
    player = models.ForeignKey('Player', on_delete=models.CASCADE)  # Assuming a Player model exists
    gameweek = models.IntegerField()
    total_points = models.IntegerField(default=0)
    goals_scored = models.IntegerField(default=0)
    assists = models.IntegerField(default=0)
    clean_sheets = models.IntegerField(default=0)
    goals_conceded = models.IntegerField(default=0)
    saves = models.IntegerField(default=0)
    # Add other performance metrics as needed

    class Meta:
        unique_together = ('player', 'gameweek')  # Ensure only one entry per player per gameweek

    def __str__(self):
        return f"{self.player.name} - Gameweek {self.gameweek}"


def calculate_gameweek_points(self, gameweek):
        """
        Calculate total points accumulated by the squad in a given gameweek.
        """
        total_points = 0
        player_performances = PlayerPerformance.objects.filter(player__in=self.players.all(), gameweek=gameweek)
        
        for performance in player_performances:
            total_points += performance.total_points
        
        return total_points


# Identify and possibly delete duplicates
duplicate_players = Player.objects.values('name').annotate(count=Count('id')).filter(count__gt=1)

for player in duplicate_players:
    players_to_delete = Player.objects.filter(name=player['name']).order_by('id')[1:]
    for player_to_delete in players_to_delete:
        player_to_delete.delete()