from django.contrib import admin
from .models import Skills, UserSkills

class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', )
    search_fields = ('name', )
    
class UserSkillADmin(admin.ModelAdmin):
    list_display = ('user', 'skill', 'acquiring', 'searching')
    search_fields = ('user__username', 'skill__name')
    list_filter = ('acquiring', 'searching')



admin.site.register(Skills, SkillAdmin)
admin.site.register(UserSkills, UserSkillADmin)