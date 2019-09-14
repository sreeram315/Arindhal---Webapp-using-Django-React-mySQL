from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField

from accounts.models import AccountInfo
#
from blog.models import BlogInfo
from django.conf.urls.static import static



class BlogCreateSerializer(ModelSerializer):
	class Meta:
		model = BlogInfo
		fields = [
					"headline",
					"preview_points",
					"age_restricted",
					"content",
					"image",
					"genre",
					"slug",
				]


class BlogHomeListSerializer(ModelSerializer):
	author = SerializerMethodField()
	date_created = SerializerMethodField()
	time_created = SerializerMethodField()
	date_updated = SerializerMethodField()
	time_updated = SerializerMethodField()
	image 		 = SerializerMethodField()
	class Meta:
		model = BlogInfo
		queryset = BlogInfo.objects.all().order_by('-date_time')
		fields = [
					"author",
					"headline",
					"preview_points",
					"age_restricted",
					"content",
					"image",
					"genre",

					"date_created",
					"time_created",
					"date_updated",
					"time_updated",

					"slug",
				]
	def get_image(self, obj):
		if obj.image: return obj.image
		return 'https://www.tots100.co.uk/wp-content/uploads/2018/02/Is-Your-Blog-Due-for-an-Update-1-252x167@2x.jpg'

	def get_author(self, obj):
		return AccountInfo.objects.get(owner = obj.owner).basic_info_dict()

	def get_date_created(self, obj):
		return obj.date_time.strftime('%d %B %Y')

	def get_time_created(self, obj):
		return obj.date_time.time().strftime('%I:%M %p')

	def get_date_updated(self, obj):
		return obj.last_updated.strftime('%d %B %Y')

	def get_time_updated(self, obj):
		return obj.last_updated.time().strftime('%I:%M %p')



class BlogDetailSerializer(ModelSerializer):
	author = SerializerMethodField()
	date_created = SerializerMethodField()
	time_created = SerializerMethodField()
	date_updated = SerializerMethodField()
	time_updated = SerializerMethodField()
	
	class Meta:
		model = BlogInfo
		fields = [
					"author",
					"headline",
					"preview_points",
					"age_restricted",
					"content",
					"image",
					"genre",

					"date_created",
					"time_created",
					"date_updated",
					"time_updated",
				]

	

	def get_author(self, obj):
		return AccountInfo.objects.get(owner = obj.owner).basic_info_dict()

	def get_date_created(self, obj):
		return obj.date_time.strftime('%d %B %Y')

	def get_time_created(self, obj):
		return obj.date_time.time().strftime('%I:%M %p')

	def get_date_updated(self, obj):
		return obj.last_updated.strftime('%d %B %Y')

	def get_time_updated(self, obj):
		return obj.last_updated.time().strftime('%I:%M %p')










