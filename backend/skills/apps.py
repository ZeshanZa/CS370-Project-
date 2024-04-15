from django.apps import AppConfig


class SkillsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'skills'

    def ready(self):
        from django.contrib.auth.models import User
        from .models import Skills
        from django.db import models
        import skills.signals