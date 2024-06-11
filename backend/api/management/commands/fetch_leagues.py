# leagues/management/commands/fetch_leagues.py
from django.core.management.base import BaseCommand
import requests
from api.models import League

class Command(BaseCommand):
    help = 'Fetch football leagues data from The Sports DB'

    def handle(self, *args, **kwargs):
        api_url = 'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php'
        response = requests.get(api_url)
        
        try:
            data = response.json()
        except ValueError as e:
            self.stdout.write(self.style.ERROR(f'Failed to decode JSON response: {e}'))
            return
        
        if 'leagues' not in data:
            self.stdout.write(self.style.ERROR('No leagues data found in response'))
            return
        
        for league_data in data['leagues']:
            description = league_data.get('strDescriptionEN', '')
            League.objects.get_or_create(
                name=league_data['strLeague'],
                description=description
            )

        self.stdout.write(self.style.SUCCESS('Successfully fetched and saved leagues data'))
