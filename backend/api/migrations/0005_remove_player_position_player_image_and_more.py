# Generated by Django 5.0.6 on 2024-06-12 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_team_league_player_price_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='position',
        ),
        migrations.AddField(
            model_name='player',
            name='image',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='price',
            field=models.DecimalField(decimal_places=1, max_digits=5),
        ),
        migrations.AlterField(
            model_name='player',
            name='team',
            field=models.CharField(max_length=100),
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
