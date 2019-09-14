from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination


class BlogHomeListPaginator(LimitOffsetPagination):
	default_limit = 100
	max_limit = 9999999999999