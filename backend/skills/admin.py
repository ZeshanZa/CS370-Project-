from django.contrib import admin
from .models import  UserProfile #, Skills, UserSkills,

# class SkillAdmin(admin.ModelAdmin):
#     list_display = ('name', )
#     search_fields = ('name', )
    
# class UserSkillADmin(admin.ModelAdmin):
#     list_display = ('user', 'skill', 'acquiring', 'searching')
#     search_fields = ('user__username', 'skill__name')
#     list_filter = ('acquiring', 'searching')



# admin.site.register(Skills, SkillAdmin)
# admin.site.register(UserSkills, UserSkillADmin)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'display_have', 'display_searching')
    search_fields = ('user__username',)

    def display_have(self, obj):
        return ", ".join(obj.have)
    display_have.short_description = 'Have Skills'

    def display_searching(self, obj):
        return ", ".join(obj.searching)
    display_searching.short_description = 'Searching Skills'
    
    def clear_skills(modeladmin, request, queryset):
        for profile in queryset:
            profile.have = []
            profile.searching = []
            profile.save()
    clear_skills.short_description = "Clear all skills of selected users"