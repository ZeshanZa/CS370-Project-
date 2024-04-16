
from django.contrib import admin
from django.contrib.postgres.fields import JSONField
from django.forms.widgets import Textarea
from .models import Skills, Master_Skills

class SkillsAdmin(admin.ModelAdmin):
    list_display = ['user']

    formfield_overrides = {
        JSONField: {'widget': Textarea(attrs={'size':'20'})},  # Using a simple Textarea widget
    }


class MasterSkillsAdmin(admin.ModelAdmin):
    list_display = ['Exp', 'DB', 'Lang', 'Pers']
    
admin.site.register(Master_Skills, MasterSkillsAdmin)
admin.site.register(Skills, SkillsAdmin)