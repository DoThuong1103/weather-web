import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetForecastWeatherQuery } from '../service/weatherAPI'
import useGeoLocation from '../hooks/useGeolocation'
import { setLocation } from '../service/weatherSlice'
import Loader from '../components/Loader'
import { Box, Stack } from '@mui/material'
import MapBox from '../components/MapBox'
import New from '../components/New'
import { fetchNewApi } from '../service/newAPI'

const Map = () => {

  const [news, setNews] = useState('')

  const getGeoLocation = useGeoLocation()
  const isLoadingLocation = getGeoLocation.loaded

  const locationState = useSelector((state) => state.weatherState.location)
  const dispatch = useDispatch()
  const { data, isFetching } = useGetForecastWeatherQuery(locationState)
  const location = data?.location
  const current = data?.current

  useEffect(() => {
    let currentLocation = ''
    if (locationState) {
      currentLocation = locationState
    } else if (getGeoLocation?.loaded) currentLocation = [getGeoLocation?.coordinates.lat, getGeoLocation?.coordinates.lng]

    dispatch(setLocation(currentLocation))
    // eslint-disable-next-line
  }, [getGeoLocation])

  useEffect(() => {
    const newsData = async (location) => {
      const getNews = await fetchNewApi(location); // Replace with your actual API fetch function
      setNews(getNews);
    }
    newsData('Hanoi')

  }, [location?.name])
  if (isFetching || !isLoadingLocation) return <Loader />

  console.log(news);
  return (
    <Box>
      <Stack spacing={2}>
        <MapBox location={location} current={current}></MapBox>
        <New news={news}></New>
      </Stack>
    </Box>
  )
}

export default Map
