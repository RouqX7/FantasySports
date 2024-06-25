from celery import shared_task
from django.core.management  import call_command

@shared_task
def fetch_player_performance():
    call_command('fetch_player_performance')  # Replace with your command name
