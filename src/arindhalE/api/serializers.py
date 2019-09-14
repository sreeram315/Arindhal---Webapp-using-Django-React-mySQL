from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField

from django.http import JsonResponse
from twitter.models import TweetInfo
from accounts.models import AccountInfo
from django.conf.urls.static import static
from django.core import serializers

from arindhalE.models import ArindhalContributerInfo



class ArindhalContributerCreateSerializer(ModelSerializer):
	class Meta:
		model = ArindhalContributerInfo
		fields = [
				"name",
				"email",
				"dob",
				"content",

		]






