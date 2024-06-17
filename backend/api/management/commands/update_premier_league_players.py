import requests
from django.core.management.base import BaseCommand
from api.models import Player, Team

class Command(BaseCommand):
    help = 'Fetch Premier League player data from FPL and update the database'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Fetching Premier League player data...'))

        url = "https://fantasy.premierleague.com/api/bootstrap-static/"
        response = requests.get(url)
        if response.status_code != 200:
            self.stdout.write(self.style.ERROR('Failed to fetch data from FPL API'))
            return

        data = response.json()
        players = data.get('elements', [])
        teams = data.get('teams', [])

        team_map = {team['id']: team['name'] for team in teams}

        for player in players:
            team_name = team_map.get(player['team'], 'Unknown')
            team, _ = Team.objects.get_or_create(name=team_name, defaults={'description': ''})

            player_name = player['web_name']
            price = player['now_cost'] / 10.0
            image_url = f"https://resources.premierleague.com/premierleague/photos/players/110x140/p{player['code']}.png"
            element_type = player['element_type']

            self.stdout.write(self.style.SUCCESS(f'Player: {player_name}, Element Type: {element_type}')) # Debugging line

            player_obj, created = Player.objects.update_or_create(
                name=player_name,
                defaults={
                    'team': team,
                    'price': price,
                    'image': image_url,
                    'element_type': element_type
                }
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'Added new player: {player_name}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Updated player: {player_name}'))

        self.stdout.write(self.style.SUCCESS('Successfully updated Premier League players'))
