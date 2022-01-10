from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext, gettext_lazy as _


class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
        (_('Additional info'), {
            'fields': ('tag', 'bill_to1', 'bill_to2', 'bill_to3', 'bill_to4', 'phone', 'fax', 'role', 'unique_no')
        }),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2'),
        }),
        (_('Additional info'), {
            'classes': ('wide',),
            'fields': ('tag', 'bill_to1', 'bill_to2', 'bill_to3', 'bill_to4', 'phone', 'fax', 'role', 'unique_no')
        }),
    )
    ordering = ('unique_no',)

class CurrentAdmin(admin.ModelAdmin):
    search_fields = ['date']

admin.site.register(Current, CurrentAdmin)
admin.site.register(Historical)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Setting)
