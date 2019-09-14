from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField

from django.http import JsonResponse
from twitter.models import TweetInfo
from accounts.models import AccountInfo
from django.conf.urls.static import static
from django.core import serializers

class NewTweetSerializer(ModelSerializer):
	class Meta:
		model = TweetInfo
		fields = [
				"content",
				"image",
			]

class TweetListSerializer(ModelSerializer):
	user_username = SerializerMethodField()
	user_name = SerializerMethodField()
	user_slug = SerializerMethodField()
	likes = SerializerMethodField()
	liked = SerializerMethodField()
	children = SerializerMethodField()
	date = SerializerMethodField()
	class Meta:
		model = TweetInfo
		fields = [
				"content",
				"slug",
				"user_username",
				"user_name",
				"user_slug",
				"likes",
				"liked",
				"children",
				"date"
		]

	def get_date(self, obj):
		date = obj.added
		return date

	def get_children(self, obj):
		children = [obj.as_dict(user = self.context['request'].user) for obj in TweetInfo.objects.filter(parent = obj)]
		return children

	def get_user_name(self, obj):
		return obj.owner.name

	def get_user_username(self, obj):
		return obj.owner.username

	def get_user_slug(self, obj):
		return obj.owner.slug

	def get_likes(self, obj):
		return [a.basic_info_dict() for a in obj.likes.all()]

	def get_liked(self, obj):
		request = getattr(self.context, 'request', None)
		print(request)
		print(f"""

			{self.context['request'].user}

			{[a.owner for a in obj.likes.all()]}


			""")
		return self.context['request'].user in [a.owner for a in obj.likes.all()]








