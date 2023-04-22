export interface IForecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: IForecastCurrentWeather;
  hourly_units: IForecastHourlyUnits;
  hourly: IForecastHourly;
  daily_units: IForecastDailyUnits;
  daily: IForecastDaily;
}

export interface IForecastCurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface IForecastHourlyUnits {
  time: string;
  temperature_2m: string;
  relativehumidity_2m: string;
  apparent_temperature: string;
  precipitation_probability: string;
  precipitation: string;
  rain: string;
  showers: string;
  snowfall: string;
  snow_depth: string;
  windgusts_10m: string;
  uv_index: string;
  uv_index_clear_sky: string;
}

export interface IForecastHourly {
  time?: string[] | null;
  temperature_2m?: number[] | null;
  relativehumidity_2m?: number[] | null;
  apparent_temperature?: number[] | null;
  precipitation_probability?: number[] | null;
  precipitation?: number[] | null;
  rain?: number[] | null;
  showers?: number[] | null;
  snowfall?: number[] | null;
  snow_depth?: number[] | null;
  windgusts_10m?: number[] | null;
  uv_index?: number[] | null;
  uv_index_clear_sky?: number[] | null;
}

export interface IForecastDailyUnits {
  time: string;
  weathercode: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  sunrise: string;
  sunset: string;
  uv_index_max: string;
  uv_index_clear_sky_max: string;
}

export interface IForecastDaily {
  time?: string[] | null;
  weathercode?: number[] | null;
  temperature_2m_max?: number[] | null;
  temperature_2m_min?: number[] | null;
  apparent_temperature_max?: number[] | null;
  apparent_temperature_min?: number[] | null;
  sunrise?: string[] | null;
  sunset?: string[] | null;
  uv_index_max?: number[] | null;
  uv_index_clear_sky_max?: number[] | null;
}
