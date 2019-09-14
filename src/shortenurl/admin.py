from django.contrib import admin

# Register your models here.

from .models import UrlInfo, TWMInfo

admin.site.register(UrlInfo)
admin.site.register(TWMInfo)
