# leagues/management/commands/fetch_teams.py
from django.core.management.base import BaseCommand
import requests
from api.models import Team

class Command(BaseCommand):
    help = 'Fetch football teams data from The Sports DB'

    def handle(self, *args, **kwargs):
        api_url = 'https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=English_Premier_League'
        response = requests.get(api_url)
        data = response.json()
        
        for team_data in data['teams']:
            Team.objects.get_or_create(
                name=team_data['strTeam'],
                league=team_data['strLeague'],
                description=team_data['strDescriptionEN']
            )

        self.stdout.write(self.style.SUCCESS('Successfully fetched and saved teams data'))
