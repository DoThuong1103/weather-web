import React from "react";
import useGeoLocation from "../hooks/useGeolocation";
import { useDispatch, useSelector } from "react-redux";
import { useGetForecastWeatherQuery } from "../service/weatherAPI";
import {
  SpaceAroundPaper,
  StyledLinearProgress,
  WeatherContainer,
} from "../themes/styled";
import { Box, Button, Stack, Typography } from "@mui/material";
import Moment from "react-moment";
import { set } from "lodash";
import { setFahrenheit } from "../service/weatherSlice";
import { Colors } from "../helper/colors";
import dayImg from "../img/day.webp";
import nightImg from "../img/night.webp";
const WeatherDisplay = () => {
  const getGeoLocation = useGeoLocation();
  const isLoadingLocation = getGeoLocation.loaded;
  const locationState = useSelector(
    (state) => state.weatherState.location
  );
  const { data, isFetching } =
    useGetForecastWeatherQuery(locationState);
  const dispatch = useDispatch();

  const current = data?.current;
  const forecast = data?.forecast?.forecastday;
  const location = data?.location;
  const astro = data?.forecast?.forecastday?.[0].astro;
  const dateToFormat = location?.localtime;
  const fahrenheit = useSelector(
    (state) => state.weatherState.fahrenheit
  );
  const date = new Date();
  const currentHour = date.getHours();

  const dayOneHours = forecast?.[0].hour;
  const dayTwoHours = forecast?.[1].hour;

  const hours48Length = dayOneHours?.concat(dayTwoHours);

  if (isFetching || !isLoadingLocation) return "";
  return (
    <WeatherContainer>
      <Box p={4}>
        <Box pb={4} sx={{ borderBottom: "1px solid lightgrey" }}>
          <Typography variant="h5" color="secondary">
            {location?.name}
          </Typography>
          <Typography variant="subtitle2" pb="1rem" color="secondary">
            <Moment format="LT" date={dateToFormat}></Moment>
          </Typography>
          <img src={current?.condition?.icon} alt="" />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2" color="secondary">
              {fahrenheit
                ? `${current?.temp_f}°F`
                : `${current?.temp_c}°C`}
            </Typography>
            <Typography variant="subtitle2" color="secondary">
              {current?.condition?.text}
            </Typography>
          </Stack>
          <Button
            onClick={() => dispatch(setFahrenheit(!fahrenheit))}
            variant="contained"
          >
            {" "}
            {!fahrenheit ? "Fahrenheit" : "Celsius"}
          </Button>
        </Box>
        <Stack mt="1rem">
          <Typography pb="1rem" variant="h6" color="secondary">
            Chance of rain
          </Typography>
          {hours48Length
            ?.slice(currentHour, currentHour + 4)
            .map((hour, i) => {
              const dateToFormatHour = hour.time;
              return (
                <Box
                  key={hour[i]}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <Typography variant="subtitle2" color="secondary">
                    {fahrenheit
                      ? `${Math.round(hour.temp_f)}°F`
                      : `${Math.round(hour.temp_c)}°C`}
                  </Typography>
                  <Typography variant="subtitle2" color="secondary">
                    <Moment
                      format="hh A"
                      date={dateToFormatHour}
                    ></Moment>
                  </Typography>
                  <StyledLinearProgress
                    variant="determinate"
                    value={hour.chance_of_rain}
                  />
                  <Typography variant="subtitle2" color="secondary">
                    {hour.chance_of_rain}%
                  </Typography>
                </Box>
              );
            })}
        </Stack>
        <Typography pb="1rem" variant="h5" color="secondary">
          Sunrise & Sunset
        </Typography>
        <Stack spacing={2}>
          <SpaceAroundPaper
            sx={{ backgroundImage: Colors.backgroundImage }}
          >
            <img src={dayImg} alt="day_image" />
            <Typography variant="subtitle2" color="secondary">
              Sunrise
            </Typography>
            <Typography variant="subtitle2" color="secondary">
              {astro?.sunrise}
            </Typography>
          </SpaceAroundPaper>
          <SpaceAroundPaper
            sx={{ backgroundImage: Colors.backgroundImage }}
          >
            <img src={nightImg} alt="day_image" />
            <Typography variant="subtitle2" color="secondary">
              Sunrise
            </Typography>
            <Typography variant="subtitle2" color="secondary">
              {astro?.sunset}
            </Typography>
          </SpaceAroundPaper>
        </Stack>
      </Box>
    </WeatherContainer>
  );
};

export default WeatherDisplay;
