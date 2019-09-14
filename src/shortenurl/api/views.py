from rest_framework.generics import ( ListAPIView, RetrieveAPIView, DestroyAPIView,
										 UpdateAPIView, CreateAPIView)
from rest_framework.views import APIView
from rest_framework.permissions import ( AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly,
	)
from rest_framework.response import Response

from shortenurl.models import UrlInfo, TWMInfo
from .serializers import ShortenUrlSerializer




class CreateAPI(CreateAPIView):
	queryset = UrlInfo.objects.all()
	serializer_class = ShortenUrlSerializer

class GetRedirectionLinkAPI(APIView):
	def get(self, request):
		slug = self.request.GET.get("slug")
		print(f'''

				{slug}

			''')
		if slug:
			print("""

				GOT


				""")
			obj = UrlInfo.objects.get(redirection_link= slug)
			print(obj)
			redirection_link = obj.original_link
			return Response({'redirection_link': redirection_link})
		return Response("NO SLUG OR BAD RECIVED OR SOMETHING ELSE")

class GetCustomLinkAvailability(APIView):
	def get(self, request):
		link = self.request.GET.get("link")
		obj = UrlInfo.objects.filter(redirection_link = link)
		if obj.exists():
			return Response(False)
		return Response(True)


class TwmGetTempAPIView(APIView):
	def get(self, request):
		obj = TWMInfo.objects.all().order_by('-date_time')
		obj = obj.first()
		data = {
			'temperature': obj.temperature,
			'date'		 : obj.date_time.strftime('%d %B %Y'),
			'time'		 : obj.date_time.time().strftime('%I:%M %p')
		}
		return Response(data)


class TwmPutTempAPIView(APIView):
	def get(self, request):
		try:
			temperature = self.request.GET.get("temperature")
			if not temperature:
				return Response("No temperature provided")

				
			obj = TWMInfo.objects.create(temperature = temperature)
			obj.save()

			return Response(f"sucessfully updated the temperature, new temperature = {temperature}")

		except:
			return Response("SORRY! SOME ERROR OCCURED")

		
















