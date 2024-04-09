from django.apps import AppConfig


class SkillsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'skills'

    def ready(self):
        from django.contrib.auth.models import User
        from .models import UserProfile #, Skills, UserSkills
        from django.db import models
        # User.add_to_class('skills', models.ManyToManyField(Skills, through=UserSkills))