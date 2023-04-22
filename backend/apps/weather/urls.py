from django.urls import path

from apps.weather.views import get_forecast

urlpatterns = [
    path('forecast/<str:lat>/<str:lon>/', get_forecast),
]