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

class Player(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=10)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=5, decimal_places=1)
    image = models.URLField(null=True, blank=True)  # Allow null values for existing records
    element_type = models.IntegerField(default=0)  # Add this field with a default valuee

    def __str__(self):
        return self.name
