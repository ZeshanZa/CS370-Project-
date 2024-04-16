from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from skills.models import Skills

class Command(BaseCommand):
    help = 'Populates Skills table for users who dont have an entry'

    def handle(self, *args, **options):
        users = User.objects.all()
        for user in users:
            # Assuming a OneToOne relationship between User and Skills
            if not hasattr(user, 'skills'):
                Skills.objects.create(user=user)
                self.stdout.write(self.style.SUCCESS(f'Created Skills entry for {user.username}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'{user.username} already has Skills entry'))

        self.stdout.write(self.style.SUCCESS('Finished populating Skills table for all users'))