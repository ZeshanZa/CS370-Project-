from django.core.management.base import BaseCommand
from skills.models import Skills, default_skills

class Command(BaseCommand):
    help = 'Reset all skills entries for all users to default values'

    def handle(self, *args, **options):
        # Fetch all skills entries
        skills_entries = Skills.objects.all()
        count = 0

        for skills in skills_entries:
            # Reset to default skills
            # skills.acquired = default_skills()
            # skills.search = default_skills()
            skills.reset_skills()
            skills.save()
            count += 1
        
        self.stdout.write(self.style.SUCCESS(f'Successfully reset skills for {count} users.'))