from django.core.management.base import BaseCommand
from skills.models import Master_Skills
import csv
import os

class Command(BaseCommand):
    help = 'Import skills from CSV files into the database'

    def handle(self, *args, **options):
        Master_Skills.objects.all().delete()  # Optionally clear the table first
        
        # change to local absolute paths if you need to update
        csv_files = {
            'Exp': 'C:\\Users\\mkebe\\Downloads\\Education\\CS370\\CS370-Project--3\\backend\\skills\\expertise.csv',
            'DB': 'C:\\Users\\mkebe\\Downloads\\Education\\CS370\\CS370-Project--3\\backend\\skills\\db.csv',
            'Lang': 'C:\\Users\\mkebe\\Downloads\\Education\\CS370\\CS370-Project--3\\backend\\skills\\languages.csv',
            'Pers': 'C:\\Users\\mkebe\\Downloads\\Education\\CS370\\CS370-Project--3\\backend\\skills\\soft-skills.csv'
        }
        
        skills_dict = {
            'Exp': [],
            'DB': [],
            'Lang': [],
            'Pers': []
        }
        
        for category, file_name in csv_files.items():
            file_path = file_name
            with open(file_path, newline='', encoding='utf-8') as csvfile:
                reader = csv.reader(csvfile)
                # next(reader)  # Skip the header
                for row in reader:
                    skills_dict[category].append(row[0])

        Master_Skills.objects.create(**skills_dict)
        self.stdout.write(self.style.SUCCESS('Successfully imported skills'))