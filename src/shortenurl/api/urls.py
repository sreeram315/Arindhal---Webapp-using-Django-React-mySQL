from django.conf.urls import url
from django.contrib import admin
from .views import CreateAPI, GetRedirectionLinkAPI, GetCustomLinkAvailability, TwmGetTempAPIView, TwmPutTempAPIView



urlpatterns = [
    url(r'shortenurl/create/$', CreateAPI.as_view(), name = 'shortenurl-create-api'),
    url(r'shortenurl/get-redirection-link/', GetRedirectionLinkAPI.as_view(), name = 'shortenurl-get-redirection-link'),
    url(r'shortenurl/custom-link-availability/', GetCustomLinkAvailability.as_view(), name = 'shortenurl-get-custon-url-availability'),
    url(r'twm/current-temperature', TwmGetTempAPIView.as_view(), name = 'twm-current-temperature'),
    url(r'twm/put-temperature', TwmPutTempAPIView.as_view(), name = 'twm-put-temperature'),

]

