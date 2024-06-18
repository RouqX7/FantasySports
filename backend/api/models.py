from django.db import models
from django.contrib.auth.models import User


class League(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()


class Team(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Player(models.Model):
    name = models.CharField(max_length=255)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=4, decimal_places=1)
    image = models.URLField(null=True, blank=True)  # Allow null values for existing records
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