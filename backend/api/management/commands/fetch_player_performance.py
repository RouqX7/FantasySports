import requests
from django.core.management.base import BaseCommand
from api.models import Player, PlayerPerformance, Team

class Command(BaseCommand):
    help = 'Fetch player performance data from Fantasy Premier League API'

    def handle(self, *args, **kwargs):
        base_url = "https://fantasy.premierleague.com/api/bootstrap-static/"
        response = requests.get(base_url)
        
        if response.status_code == 200:
            try:
                data = response.json()
                players = data['elements']

                for player_data in players:
                    player_id = player_data['id']
                    player_name = player_data['web_name']
                    team_id = player_data['team']

                    # Fetch team details based on team_id
                    team_data = next((team for team in data['teams'] if team['id'] == team_id), None)
                    if team_data:
                        team_name = team_data['name']
                        team, _ = Team.objects.get_or_create(name=team_name)
                    else:
                        self.stdout.write(self.style.ERROR(f"Team details not found for Team ID {team_id}"))
                        continue

                    # Prepare player fields
                    player_defaults = {
                        'name': player_name,
                        'team': team,
                        'price': player_data.get('now_cost', 0),  # Default price to 0 if not provided
                        'element_type': player_data['element_type'],  # Ensure element_type is provided
                        # Add other fields as needed
                    }

                    # Create or update Player instance
                    player, _ = Player.objects.update_or_create(
                        id=player_id,
                        defaults=player_defaults
                    )

                    self.stdout.write(self.style.SUCCESS(f"Updated player details for Player ID {player_id}"))

                    # Fetch performance details for each player
                    player_performance_url = f"https://fantasy.premierleague.com/api/element-summary/{player_id}/"
                    performance_response = requests.get(player_performance_url)

                    if performance_response.status_code == 200:
                        performance_data = performance_response.json()
                        history = performance_data['history']

                        for performance in history:
                            gameweek = performance['round']
                            total_points = performance['total_points']
                            goals_scored = performance['goals_scored']
                            assists = performance['assists']
                            clean_sheets = performance['clean_sheets']
                            goals_conceded = performance['goals_conceded']
                            saves = performance['saves']
                            # Add other performance metrics as needed

                            # Create or update PlayerPerformance instance
                            player_performance, _ = PlayerPerformance.objects.update_or_create(
                                player=player,
                                gameweek=gameweek,
                                defaults={
                                    'total_points': total_points,
                                    'goals_scored': goals_scored,
                                    'assists': assists,
                                    'clean_sheets': clean_sheets,
                                    'goals_conceded': goals_conceded,
                                    'saves': saves,
                                    # Add other fields here
                                }
                            )

                            self.stdout.write(self.style.SUCCESS(f"Updated player performance for Player ID {player_id}, Gameweek {gameweek}"))

                    else:
                        self.stdout.write(self.style.ERROR(f"Failed to fetch player performance data for Player ID {player_id}: {performance_response.status_code}"))
                        self.stdout.write(self.style.ERROR(f"Response content: {performance_response.content}"))

            except ValueError as e:
                self.stdout.write(self.style.ERROR(f"Error parsing JSON: {e}"))
        
        else:
            self.stdout.write(self.style.ERROR(f"Failed to fetch data from FPL API: {response.status_code}"))
            self.stdout.write(self.style.ERROR(f"Response content: {response.content}"))
