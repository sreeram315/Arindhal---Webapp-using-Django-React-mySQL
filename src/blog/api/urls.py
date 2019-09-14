from django.conf.urls import url
from django.contrib import admin
from .views import BlogCreateAPIView, BlogHomeListSerializer, BlogDetailAPIView, BlogNewBlogAPIView



urlpatterns = [
    url(r'^blog/create/$', BlogCreateAPIView.as_view(), name = 'blog-create-api'),
    url(r'^blog/list/$', BlogHomeListSerializer.as_view(), name = 'blog-home-list'),
    url(r'^blog/detail/(?P<slug>[\w-]+)/$', BlogDetailAPIView.as_view(), name = 'blog-detail'),
    url(r'^blog/new-blog/$', BlogNewBlogAPIView.as_view(), name = 'blog-new'),
    
    


]
