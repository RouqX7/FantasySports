import requests
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_datetime
from api.models import Gameweek  # Adjust import as per your app's structure

class Command(BaseCommand):
    help = 'Fetch gameweek information from Fantasy Premier League API'

    def handle(self, *args, **kwargs):
        base_url = "https://fantasy.premierleague.com/api/bootstrap-static/"
        response = requests.get(base_url)
        
        if response.status_code == 200:
            try:
                data = response.json()
                events = data['events']
                
                for event_data in events:
                    gameweek_id = event_data['id']
                    deadline_time_str = event_data.get('deadline_time', None)
                    deadline_time = parse_datetime(deadline_time_str) if deadline_time_str else None
                    
                    Gameweek.objects.update_or_create(
                        number=gameweek_id,
                        defaults={
                            'name': event_data.get('name', f"Gameweek {gameweek_id}"),
                            'deadline_time': deadline_time,
                            'average_entry_score': event_data.get('average_entry_score', None),
                            'highest_score': event_data.get('highest_score', None),
                            'is_previous': event_data.get('is_previous', False),
                            'is_current': event_data.get('is_current', False),
                            'is_next': event_data.get('is_next', False),
                        }
                    )
                    self.stdout.write(self.style.SUCCESS(f"Fetched information for Gameweek {gameweek_id}"))
                
            except ValueError as e:
                self.stdout.write(self.style.ERROR(f"Error parsing JSON: {e}"))
        else:
            self.stdout.write(self.style.ERROR(f"Failed to fetch data: {response.status_code}"))
