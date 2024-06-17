# Generated by Django 5.0.6 on 2024-06-12 17:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_player_position_player_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='position',
            field=models.CharField(default='Unknown', max_length=50),
        ),
        migrations.AlterField(
            model_name='player',
            name='team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.team'),
        ),
        migrations.AlterField(
            model_name='team',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]