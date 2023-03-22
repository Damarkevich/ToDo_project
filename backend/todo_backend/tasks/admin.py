from django.contrib import admin
from .models import Task


class TaskAdmin(admin.ModelAdmin):
    list = ('title', 'description', 'completed')


admin.site.register(Task, TaskAdmin)
