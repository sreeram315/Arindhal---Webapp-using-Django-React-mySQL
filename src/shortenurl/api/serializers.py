from rest_framework.serializers import ModelSerializer

#
from shortenurl.models import UrlInfo


class ShortenUrlSerializer(ModelSerializer):
	class Meta:
		model = UrlInfo
		fields = [
				'original_link',
				'redirection_link'
		]

'''
data = {
	'name' : 'Poolane',
	'original_link': 'https://en.wikipedia.org/wiki/Zero_(2018_film)'
}

obj = PostSerializer(data = data)

if obj.is_valid():
	obj.save()
else:
	print(obj.errors)
'''