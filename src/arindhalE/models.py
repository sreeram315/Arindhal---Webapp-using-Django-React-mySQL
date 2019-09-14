from django.db import models
from django.db.models.signals import pre_save, post_save
from django.conf import settings
from django.db.models import Q


from .utils import unique_slug_generator






class ArindhalContributerInfo(models.Model):
	added			=	models.DateTimeField(auto_now_add = True, null = True, blank = True)
	updated			=	models.DateTimeField(auto_now = True, null = True, blank = True)
	slug			=	models.SlugField(null = True, blank  = True)

	name 			=	models.CharField(max_length = 300, blank = True, null = True)
	email 			=	models.CharField(max_length = 500, blank = True, null = True)
	content 		=	models.CharField(max_length = 10000, blank = True, null = True)
	dob 			=	models.DateField(blank = True, null = True)





	def __str__(self):
		return self.name

	@property
	def title(self):
		return self.content




def stu_info_pre_save(sender, instance, *args, **kwargs):
	if not instance.slug:
		instance.slug = unique_slug_generator(instance)
		

pre_save.connect(stu_info_pre_save, sender = ArindhalContributerInfo)
	

