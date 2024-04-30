from django.contrib import admin
from .models import Match, deletedMatches

# Register your models here.
admin.site.register(Match) 
admin.site.register(deletedMatches)

