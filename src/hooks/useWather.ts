import axios from "axios";
// import { z } from 'zod';
import * as v from "valibot";
import type { FormData, Weather } from "../types";
import { useState } from "react";


// Funcion type guard para validar el resultado de la API
// function isWeatherResult(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === 'object' &&
//     typeof (weather as Weather).name === 'string' &&
//     typeof (weather as Weather).main.temp === 'number' &&
//     typeof (weather as Weather).main.temp_min === 'number' &&
//     typeof (weather as Weather).main.temp_max === 'number'
//   )
// }

// Schema para validar el resultado de la API usando ZOD
// const weatherSchema: z.ZodType<Weather> = z.object({
//   name: z.string(),
//   main: z.object({
//     temp: z.number(),
//     temp_min: z.number(),
//     temp_max: z.number(),
//   }),
// })
 
// Schema para validar el resultado de la API usando Valibot
const WeatherSchema = v.object({
  name: v.string(),
  main: v.object({
    temp: v.number(),
    temp_min: v.number(),
    temp_max: v.number(),
  }),
})

export default function useWeather() {

  const[weather, setWeather] = useState<Weather>({
    name: '',
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
    }
  })
  const [loading, setLoading] = useState(false)

  const fetchWeather = async (formData: FormData): Promise<void> => {
    try {
      setLoading(true)
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
      if (!apiKey) {
        throw new Error('Falta la API Key de OpenWeather (OPEN_WEATHER_API_KEY)')
      }

      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${formData.city},${formData.country}&appid=${apiKey}`
      const geoData = await axios.get(geoUrl)
      const { lat, lon } = geoData.data[0]

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

      // Castear el resultado a type Weather
      // const weatherData = await axios.get<Weather>(weatherUrl)
      // const { data: weather } = weatherData

      // Usando type Guard para validar el resultado
      // const weatherData = await axios.get(weatherUrl)
      // const { data: weather } = weatherData
      // const result = isWeatherResult(weather)

      // const weatherData = await axios.get(weatherUrl)
      // const weather = weatherSchema.parse(weatherData.data)

      const weatherData = await axios.get(weatherUrl)
      const weatherResponse = v.parse(WeatherSchema, weatherData.data)

      if (weatherData.status === 200) {
        setWeather(weatherResponse)
      }

    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    weather,
    loading,
    fetchWeather,
  }
}
