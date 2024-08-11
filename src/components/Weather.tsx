import React, { useState } from "react";
import { fetchWeather } from "../services/WeatherService";

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };

  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };

  visibility: number;

  wind: {
    speed: number;
    deg: number;
  };

  sys: {
    sunrise: number;
    sunset: number;
  };

  timezone: number;

  name: string;
}

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getWeather = async () => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center italic">weatherapp</h1>
      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="enter city"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={getWeather}
        className="w-full bg-blue-900 text-white p-2 rounded"
      >
        get weather
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weather && (
        <div className="mt-4 border shadow shadow-black p-4 text-center">
          <h2 className="text-2xl font-semibold italic">{weather.name}</h2>
          <p className="text-5xl font-semibold">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="capitalize -mb-7">{weather.weather[0].description}</p>
          <div className="flex justify-center items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </div>

          <p>Feels Like: {Math.round(weather.main.feels_like)}°C</p>
          <p>Min Temp: {Math.round(weather.main.temp_min)}°C</p>
          <p>Max Temp: {Math.round(weather.main.temp_max)}°C</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Humidity: {weather.main.humidity}%</p>
          {weather.main.sea_level && (
            <p>Sea Level: {weather.main.sea_level} hPa</p>
          )}
          {weather.main.grnd_level && (
            <p>Ground Level: {weather.main.grnd_level} hPa</p>
          )}
          <p>Visibility: {weather.visibility} m</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Wind Direction: {weather.wind.deg}°</p>
          <p>
            Sunrise:{" "}
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>
            Sunset:{" "}
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p>
            Timezone: UTC {weather.timezone / 3600 >= 0 ? "+" : ""}
            {weather.timezone / 3600}
          </p>
          <p>
            Coordinates: [{weather.coord.lat}, {weather.coord.lon}]
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
