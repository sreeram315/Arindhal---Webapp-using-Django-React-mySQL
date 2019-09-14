from rest_framework.generics import ( ListAPIView, RetrieveAPIView, DestroyAPIView,
										 UpdateAPIView, CreateAPIView)
from rest_framework.views import APIView
from rest_framework.permissions import ( AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly,
	)
from rest_framework.response import Response

from time import sleep
from django.db.models import Q
from accounts.models import AccountInfo
from blog.models import BlogInfo
from .paginators import BlogHomeListPaginator
from .serializers import BlogCreateSerializer, BlogHomeListSerializer, BlogDetailSerializer



class BlogCreateAPIView(CreateAPIView):
	queryset = BlogInfo.objects.all()
	serializer_class = BlogCreateSerializer

	def perform_create(self, serializer):
		serializer.save(owner = self.request.user)


class BlogHomeListSerializer(ListAPIView):
	serializer_class = BlogHomeListSerializer
	#queryset = BlogInfo.objects.all().order_by("-date_time")
	pagination_class = BlogHomeListPaginator

	def get_queryset(self):
		print(f'''


			q = {self.request.GET.get('q')},
			genre = {self.request.GET.get('genre')}.
			author = {self.request.GET.get('author')},



			''')

		qs = BlogInfo.objects.all()

		# FILTERING ACCORDING TO GENRE
		genre = self.request.GET.get('genre')
		if genre and genre!='null': qs = qs =  BlogInfo.objects.filter(genre__icontains=genre.lower())


		## FILTERING BY USER
		author = self.request.GET.get('author')
		if author!='null' and (author):
			author = AccountInfo.objects.filter(owner__username = author)
			print(f'''

					{qs.filter(owner = author.first().owner)}


				''')
			if author.exists():
				qs = qs.filter(owner = author.first().owner)


		# FILTERING BY QUERY
		q = self.request.GET.get('q')
		
		
		if q=='null' or (not q) or (q=='all'): q = ''
		qs = qs.filter(headline__icontains = q)
		


		# RETURN ORDERED BY DATE_TIME CREATED
		return qs.order_by("-date_time")



class BlogDetailAPIView(RetrieveAPIView):
	serializer_class = BlogDetailSerializer
	lookup_field = 'slug'

	def get_queryset(self):
		return BlogInfo.objects.all()


class BlogNewBlogAPIView(APIView):
	def get(self, request):
		choices = BlogInfo._meta.get_field('genre').choices
		choices = [i[1] for i in choices]
		data = {
			'genres': choices
		}
		return Response(data)

