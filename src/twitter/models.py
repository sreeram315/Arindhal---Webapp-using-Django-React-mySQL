from django.db import models
from django.db.models.signals import pre_save, post_save
from django.conf import settings
from django.db.models import Q


from .utils import unique_slug_generator

from accounts.models import AccountInfo
User = settings.AUTH_USER_MODEL

def get_location(instance, filename):
	return f'twitter_images/{instance.owner.username}/{instance.content}.jpeg'


class TweetInfo(models.Model):
	owner			=	models.ForeignKey(AccountInfo, on_delete = models.CASCADE)
	parent			=	models.ForeignKey('self', blank = True, null = True, on_delete = models.CASCADE)
	likes			=	models.ManyToManyField(AccountInfo, blank = True, related_name = 'liking')

	added			=	models.DateTimeField(auto_now_add = True, null = True, blank = True)
	updated			=	models.DateTimeField(auto_now = True, null = True, blank = True)
	slug			=	models.SlugField(null = True, blank  = True)
	content			=	models.TextField(default="-")

	image			=	models.ImageField(			upload_to = get_location,  
													null = True,
													blank = True, 
													width_field="width_field", 
           										 	height_field="height_field",
           										)
	height_field 	= 	models.IntegerField(default=0)
	width_field 	= 	models.IntegerField(default=0)


	def __str__(self):
		return str(f'{self.owner.username} -- {self.content[:10]}')

	@property
	def title(self):
		return self.content

	def as_dict(self, user = None):
		likes = self.likes
		liked = user in [a.owner for a in likes.all()]
		return {
					"id": self.id,
					"content":self.content,
					"slug":self.slug,
					"user_username":self.owner.username,
					"user_name":self.owner.name,
					"user_slug":self.owner.slug,
					"liked": liked,
					"likes": [a.basic_info_dict() for a in likes.all()],
					"date": self.added,
					"children": [obj.as_dict(user = user) for obj in TweetInfo.objects.filter(parent = self)]
			}



def stu_info_pre_save(sender, instance, *args, **kwargs):
	if not instance.slug:
		instance.slug = unique_slug_generator(instance)
		

pre_save.connect(stu_info_pre_save, sender = TweetInfo)
	

