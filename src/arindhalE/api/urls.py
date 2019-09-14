from django.conf.urls import url
from django.contrib import admin
from .views import ArindhalContributerCreateView 



urlpatterns = [
    
     #########################  T W I T T E R    A P I         U R L S     #################
    url(r'^arindhal/contributers/create/$', ArindhalContributerCreateView.as_view(), name = 'arindhal-contributer-create'),


    


]
