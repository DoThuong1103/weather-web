import Reactm, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLocation } from "../service/weatherSlice"
import { Box, Typography, Stack, Divider } from '@mui/material'
import { useGetForecastWeatherQuery } from "../service/weatherAPI"
import Moment from 'react-moment'
import useGeoLocation from "../hooks/useGeolocation"
import WeatherChart from "../components/Chart"
import TodaysOverView from "../components/TodaysOverView"
import SearchBar from "../components/SearchBar"
import ThreeDayForecast from "../components/ThreeDayForecast"
import Loader from "../components/Loader"
import { DotSpinner, Orbit } from '@uiball/loaders'

const Dashboard = () => {
  const getGeoLocation = useGeoLocation()
  const isLoadingLocation = getGeoLocation.loaded
  const locationState = useSelector((state) => state.weatherState.location)
  const { data, isFetching } = useGetForecastWeatherQuery(locationState)
  const dispatch = useDispatch()
  const current = data?.current
  const forecast = data?.forecast?.forecastday
  const location = data?.location
  const dateToFormat = location?.localtime
  useEffect(() => {
    let currentLocation = ''
    if (locationState) {
      currentLocation = locationState
    }
    else if (getGeoLocation?.loaded) {
      currentLocation = [getGeoLocation?.coordinates?.lat, getGeoLocation?.coordinates?.lng]
    }
    dispatch(setLocation(currentLocation))
  }, [dispatch, getGeoLocation?.coordinates?.lat, getGeoLocation?.coordinates?.lng, getGeoLocation?.loaded, locationState])

  if (isFetching || !isLoadingLocation) return (
    <Loader />
  )
  return (
    <Box p={1}>
      <Stack direction={{ sm: 'column', md: 'row' }} justifyContent='space-between' sx={{ paddingBottom: 2 }}>
        <Stack>
          <Typography variant='h5'>{location?.name}</Typography>
          <Typography variant='subtitle2'>{location?.region}</Typography>
          <Typography variant='subtitle2'><Moment format='LLL' date={dateToFormat}></Moment></Typography>
        </Stack>
        <SearchBar location={location}></SearchBar>
      </Stack>
      <Divider></Divider>
      <TodaysOverView current={current} forecast={forecast}></TodaysOverView>
      <ThreeDayForecast forecast={forecast}></ThreeDayForecast>
      <WeatherChart forecast={forecast}></WeatherChart>
    </Box>
  )
}

export default Dashboard;
