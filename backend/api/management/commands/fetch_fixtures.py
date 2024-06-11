import requests
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Fetch football fixtures from RapidAPI'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Fetching fixtures data...'))

        url = "https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2021-01-29"
        headers = {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': '7387d60937msh860f03c3709aa0ep1cda1bjsn44dfd131680e'
        }

        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            self.stdout.write(self.style.ERROR('Failed to fetch data from RapidAPI'))
            return

        fixtures = response.json()
        self.stdout.write(self.style.SUCCESS(f'Successfully fetched fixtures: {fixtures}'))
        # Process the fixtures data as needed
