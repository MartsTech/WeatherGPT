from django.urls import path

from apps.weather.views import get_forecast, get_forecast_summary

urlpatterns = [
    path('forecast/<str:lat>/<str:lon>/', get_forecast),
    path('forecast/<str:lat>/<str:lon>/summary/', get_forecast_summary)
]
