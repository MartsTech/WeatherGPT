import json
import os

import openai
import requests
from django.core.cache import cache
from django.http import JsonResponse, HttpResponse


def get_forecast(request, lat: str, lon: str) -> HttpResponse:
    try:
        lat = float(lat)
        lon = float(lon)
        if not (-90 <= lat <= 90 and -180 <= lon <= 180):
            return HttpResponse("Invalid latitude or longitude value.", status=400)
    except ValueError:
        return HttpResponse("Invalid latitude or longitude value.", status=400)

    if not (-90 <= lat <= 90):
        return HttpResponse("Latitude must be between -90 and 90", status=400)
    if not (-180 <= lon <= 180):
        return HttpResponse("Longitude must be between -180 and 180", status=400)

    cache_key = f"forecast_{lat}_{lon}"
    cached_data = cache.get(cache_key)

    if cached_data is not None:
        return JsonResponse(cached_data, status=200)

    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=temperature_2m," \
          f"relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers," \
          f"snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky&daily=weathercode,temperature_2m_max," \
          f"temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max," \
          f"uv_index_clear_sky_max&current_weather=true&timezone=Europe%2FLondon"

    response = requests.get(url)

    if response.status_code == 200:
        forecast = response.json()
        cache.set(cache_key, forecast, 60 * 60)
        return JsonResponse(forecast, status=200)

    return HttpResponse("Error retrieving forecast", status=500)


def get_forecast_summary(request, lat: str, lon: str) -> HttpResponse:
    try:
        lat = float(lat)
        lon = float(lon)
        if not (-90 <= lat <= 90 and -180 <= lon <= 180):
            return HttpResponse("Invalid latitude or longitude value.", status=400)
    except ValueError:
        return HttpResponse("Invalid latitude or longitude value.", status=400)

    if not (-90 <= lat <= 90):
        return HttpResponse("Latitude must be between -90 and 90", status=400)
    if not (-180 <= lon <= 180):
        return HttpResponse("Longitude must be between -180 and 180", status=400)

    cache_key = f"forecast_summary_{lat}_{lon}"
    cached_data = cache.get(cache_key)

    if cached_data is not None:
        return JsonResponse(cached_data, status=200)

    response = get_forecast(request, str(lat), str(lon))

    if response.status_code != 200:
        return response

    forecast = json.loads(response.content)

    try:
        openai.api_key = os.getenv('OPENAI_API_KEY')

        compilation = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            temperature=0.8,
            n=1,
            stream=False,
            messages=[
                {
                    "role": "system",
                    "content": "Given the weather forecast, write a summary of the weather in a human readable format with energy and enthusiasm, as if you were a weather reporter."
                },
                {
                    "role": "user",
                    "content": str(forecast['current_weather'])
                }
            ]
        )
        data = dict()
        data['summary'] = compilation['choices'][0]['message']['content']
        cache.set(cache_key, data, 60 * 60)
        return JsonResponse(data, status=200)
    except openai.error.InvalidRequestError as e:
        print(e)
        return HttpResponse("Error retrieving forecast summary", status=500)
