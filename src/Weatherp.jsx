import React, { useState } from 'react'

const Key = import.meta.env.VITE_WEATHER_API_KEY

export const Weather = () => {
  const [city,setCity] = useState("")
  const [weather,setWeather] = useState(null)

  const show = async () => {
    if (city === "") return
    const details = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Key}&units=metric`
    const response = await fetch(details)
    const newResponse = await response.json()
    setWeather(newResponse)
    
  }

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-5">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-7">
        <h1 className="text-3xl font-bold text-center text-blue-700">Weather App</h1>

        <div className="flex gap-3 mt-5">
          <input type="text" placeholder="Enter the city" value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-lg px-4 py-2" />
          <button onClick={show}
            className="bg-blue-600 text-white px-6 rounded-lg">
            Search
          </button>
        </div>

        {weather && (
          <div className="mt-5 bg-blue-50 rounded-xl p-5 text-center">
            <h2 className="text-3xl font-bold text-blue-700">{weather.name}</h2>
            <h1 className="text-5xl font-bold mt-3">{weather.main.temp}°C</h1>
            <p className="mt-2">{weather.weather[0].description}</p>
            <p className="mt-2">Humidity: {weather.main.humidity}%</p>
            <p className="mt-2">Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  )
}