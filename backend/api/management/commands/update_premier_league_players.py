import requests
from django.core.management.base import BaseCommand
from api.models import Player, Team

class Command(BaseCommand):
    help = 'Fetch Premier League player data from FPL and update the database'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Fetching Premier League player data...'))

        # FPL API URL for player data
        url = "https://fantasy.premierleague.com/api/bootstrap-static/"

        response = requests.get(url)
        if response.status_code != 200:
            self.stdout.write(self.style.ERROR('Failed to fetch data from FPL API'))
            return

        data = response.json()
        players = data.get('elements', [])
        teams = data.get('teams', [])

        # Create a dictionary of team IDs to team names
        team_map = {team['id']: team['name'] for team in teams}

        # Position mapping
        position_map = {
            1: 'GK',
            2: 'DEF',
            3: 'MID',
            4: 'FWD'
        }

        for player in players:
            team_name = team_map.get(player['team'], 'Unknown')
            team, _ = Team.objects.get_or_create(name=team_name, defaults={'description': ''})

            player_name = player['web_name']
            position = position_map.get(player['element_type'], 'Unknown')
            price = player['now_cost'] / 10.0  # FPL prices are in tenths of a million
            image_url = f"https://resources.premierleague.com/premierleague/photos/players/110x140/p{player['code']}.png"

            player_obj, created = Player.objects.update_or_create(
                name=player_name,
                defaults={
                    'position': position,
                    'team': team,
                    'price': price,
                    'image': image_url
                }
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f'Added new player: {player_name}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Updated player: {player_name}'))

        self.stdout.write(self.style.SUCCESS('Successfully updated Premier League players'))
