from django.contrib import admin
from .models import Match, DeclinedMatch

# Register your models here.
admin.site.register(Match) 
admin.site.register(DeclinedMatch)