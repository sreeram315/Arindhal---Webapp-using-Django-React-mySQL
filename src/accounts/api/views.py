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
from blog.models import BlogInfo
UserModel = get_user_model()

from .serializers import AccountDetailsSerializer, AccountUpdateSerializer


##############################  U S E R    A C C O U N T S     A P I  ##############################


class AccountBasicInfo(APIView):
	permission_classes = [IsAuthenticated]
	def get(self, request):
		user = (AccountInfo.objects.filter(owner = request.user)).first()
		username = user.owner.username
		name     = user.name
		following = user.is_following_usernames()
		data = {
			'username'	: username,
			'name'	  	: name,
			'following'	: following
		}

		return Response(data)

class RegisterUser(APIView):
	## API to create user
	def post(self, request):
		username_ = request.data.get('username')
		password_ =  request.data.get('password')
		name_	  =  request.data.get('name')	
		user = UserModel.objects.create(username=username_)
		user.set_password(password_)
		user.save()
		acc = AccountInfo.objects.get(owner = user)
		acc.name = name_
		acc.save()
		return Response("POST DONE")

class CheckUsernameAvailability(APIView):
	def get(self, request):
		return Response("GET REQUEST NOT AVAILABLE")

	def post(self, request):
		try:
			username = request.data.get('username')
			usernames_all = UserModel.objects.filter(username = username)
			if usernames_all.exists():
				return Response('NOT_OK')
			else:
				return Response("OK")
		except:
			return Response("ERROR")

class AccountDetailView(RetrieveAPIView):
	lookup_field = 'slug'
	serializer_class = AccountDetailsSerializer
	queryset = AccountInfo.objects.all()

class ProfileDetails(RetrieveAPIView):
	serializer_class = AccountDetailsSerializer
	permission_classes = [IsAuthenticated]

	def get_object(self):
		obj = AccountInfo.objects.get(owner = self.request.user)
		return obj

class ProfileUpdateView(UpdateAPIView):
	serializer_class = AccountUpdateSerializer
	permission_classes = [IsAuthenticated]

	def get_object(self):
		obj = AccountInfo.objects.get(owner = self.request.user)
		return obj

class ToggleFollow(APIView):
	permission_classes = [IsAuthenticated]
	def post(self, request):
		# try:
		following   		= request.data.get("username")
		follower			= self.request.user
		action 				= request.data.get("action")

		follower			= AccountInfo.objects.get(owner = follower).owner
		following 			= AccountInfo.objects.get(owner__username = following)
		
		if action=="toggle":
			if follower not in following.followers.all():
				following.followers.add(follower)
			elif follower in following.followers.all():
				following.followers.remove(follower)
			return Response("Action performed")
		else:
			return Response("Action failed")

			
		# except:
		# 	return Response('Action failed')




##############################  C A M P E R    A P I  ##############################


class KaalaSearchResults(APIView):

	def get(self, request):
		q = self.request.GET.get("q")
		if not q or len(q)==0: return Response("NaN")
		data={}

		def get_users(q, retuner = []):
			# users with query q
			users = AccountInfo.objects.filter(Q(name__icontains = q) | Q(owner__username__icontains = q))\
										.annotate(num_followers=Count('followers')) \
										.order_by('-num_followers')[:3]
			
			for user in users:
				followers = user.followers.count()
				following = user.owner.is_following.count()

				retuner.append({
								'name': user.name,
								'username': user.owner.username,
								'email': user.email,
								'slug': user.slug,
								'followers': followers,
								'following': following
							})
			return retuner

		def get_blogs(q, retuner = []):
			blogs = BlogInfo.objects.filter(Q(headline__icontains = q) | Q(owner__username__icontains = q))[:3]

			for blog in blogs:
				retuner.append({
						'headline': blog.headline,
						'author': AccountInfo.objects.get(owner = blog.owner).name,
						'slug': blog.slug,
						'content': blog.content
					})
			return retuner
		

		data['users'] = get_users(q)
		data['blogs'] = get_blogs(q)

		if len(data['users'])!=0 or len(data['blogs'])!=0:
			return Response(data)

		return Response("NaN")
























