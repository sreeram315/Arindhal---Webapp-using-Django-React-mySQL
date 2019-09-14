from django.conf.urls import url
from django.contrib import admin
from .views import ( TweetCreateAPIView, TweetListAPIView, TweetLikeCommmentAPIView, TweetDeleteAPIView )



urlpatterns = [
    
     #########################  T W I T T E R    A P I         U R L S     #################
    url(r'^twitter/create/$', TweetCreateAPIView.as_view(), name = 'twitter-create-tweet'),
    url(r'^twitter/list/$', TweetListAPIView.as_view(), name = 'twitter-create-tweet'),
    url(r'^twitter/like/comment/$', TweetLikeCommmentAPIView.as_view(), name = 'twitter-like-comment'),
    url(r'^twitter/delete/$', TweetDeleteAPIView.as_view(), name = 'twitter-delete'),


    


]
