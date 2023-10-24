import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const baseUrl = `https://weatherapi-com.p.rapidapi.com`
const weatherHeaders = {
  'X-RapidAPI-Key': 'b7824db12emsh14e94be5ae17991p1f10dajsn744d68878526',
  'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
}

const requestHeader = (url) => ({ url, headers: weatherHeaders })

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getForecastWeather: builder.query({
      query: (location) => requestHeader(`forecast.json?q=${location}&days=3`)
    }),
    getSearchWeather: builder.query({
      query: (search) => requestHeader(`search.json?q=${search}&days=3`)
    })
  })
})

export const { useGetForecastWeatherQuery, useGetSearchWeatherQuery } = weatherApi
