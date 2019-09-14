from rest_framework.generics import ( ListAPIView, RetrieveAPIView, DestroyAPIView,
										 UpdateAPIView, CreateAPIView)
from rest_framework.views import APIView
from rest_framework.permissions import ( AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly,
	)


from rest_framework.response import Response
from django.db.models import Count

from django.db.models import Q
from django.contrib.auth import login, authenticate
import json

from django.contrib.auth import get_user_model 
from accounts.models import AccountInfo
from twitter.models import TweetInfo
UserModel = get_user_model()

from .serializers import NewTweetSerializer, TweetListSerializer

from .paginators import TweetInfoLimitPagination



##############################  T W I T T E R      A P I  ##############################



# class TweetCreateAPIView(CreateAPIView):
# 	queryset 			= TweetInfo.objects.all()
# 	serializer_class 	= NewTweetSerializer

# 	def perform_create(self, serializer):
# 		user_account = AccountInfo.objects.get(owner = self.request.user)
# 		serializer.save(owner = user_account)



class TweetListAPIView(ListAPIView):
	serializer_class = TweetListSerializer
	pagination_class = TweetInfoLimitPagination
	permission_classes = [AllowAny]
	queryset = TweetInfo.objects.filter(parent = None).order_by('updated').reverse()


class TweetCreateAPIView(APIView):
	def post(self, request):
		# try:
		data = request.data.get('data')
		if data:
			parent_slug = data.get('parent')
			content = data.get('content')
			user_account = AccountInfo.objects.get(owner = self.request.user)
			parent = None
			if parent_slug: parent = TweetInfo.objects.get(slug = parent_slug)
			TweetInfo.objects.create(
										content = content,
										parent = parent,
										owner = user_account
								)

			return Response("OK")
		else:
			return Response("NO DATA RECEIVED")


class TweetLikeCommmentAPIView(APIView):
	def post(self, request):
		parent_slug = request.data.get('parent')
		if self.request.user.is_authenticated:
			obj = TweetInfo.objects.get(slug = parent_slug)
			user_account = AccountInfo.objects.get(owner = self.request.user)
			if user_account in obj.likes.all():
				obj.likes.remove(user_account)
			else:
				obj.likes.add(user_account)
		return Response("OK")

class TweetDeleteAPIView(DestroyAPIView):
	def post(self, request):
		slug = request.data.get('slug')
		if slug:
			obj = TweetInfo.objects.get(slug= slug)
			obj.delete()
			return Response("deleted")
		return Response("NO SLUG RECEIVED")




























