# Generated by Django 5.0.6 on 2024-06-17 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_player_element_type_alter_player_position'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='total_points',
            field=models.IntegerField(default=0),
        ),
    ]