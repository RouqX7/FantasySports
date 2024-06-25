# Generated by Django 5.0.6 on 2024-06-25 18:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_gameweek_squad_transfer'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlayerPerformance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gameweek', models.IntegerField()),
                ('total_points', models.IntegerField(default=0)),
                ('goals_scored', models.IntegerField(default=0)),
                ('assists', models.IntegerField(default=0)),
                ('clean_sheets', models.IntegerField(default=0)),
                ('goals_conceded', models.IntegerField(default=0)),
                ('saves', models.IntegerField(default=0)),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.player')),
            ],
            options={
                'unique_together': {('player', 'gameweek')},
            },
        ),
    ]
