import React from "react";
import { Colors } from "../helper/colors";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Paper, Stack, Typography, Grid } from "@mui/material";
const TodaysOverView = ({ current, forecast }) => {
  const fahrenheit = useSelector(
    (state) => state?.weatherState?.fahrenheit
  );
  const date = new Date();
  const currentHour = date.getHours();

  const dayOneHours = forecast?.[0]?.hour;
  const dayTwoHours = forecast?.[1]?.hour;
  // const dayThreeHours = forecast?.[2]?.hour;

  const hours48Length = dayOneHours?.concat(dayTwoHours);
  const todaysOverviewItems = [
    {
      item: "High",
      value: fahrenheit
        ? `${forecast?.[0]?.day.maxtemp_f}°F`
        : `${forecast?.[0]?.day.maxtemp_c}°C`,
    },
    {
      item: "Low",
      value: fahrenheit
        ? `${forecast?.[0]?.day.mintemp_f}°F`
        : `${forecast?.[0]?.day.mintemp_c}°C`,
    },
    { item: "Wind", value: `${current?.wind_mph}mph` },
    {
      item: "Rain",
      value: `${forecast?.[0]?.day?.daily_chance_of_rain}%`,
    },
    { item: "Pressure", value: `${current?.pressure_in}in` },
    { item: "Humidity", value: current?.uv },
  ];
  return (
    <Box sx={{ marginTop: "2rem" }}>
      <Typography
        sx={{ marginBottom: "1rem" }}
        color="primary"
        variant="h6"
      >
        Today Overview
      </Typography>
      <Swiper
        spaceBetween={10}
        slidesPerView={10}
        slidesOffsetBefore={0}
        breakpoints={{
          1920: {
            slidesPerView: 6,
          },
          1440: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 6,
          },
          768: {
            slidesPerView: 6,
          },
          640: {
            slidesPerView: 4,
          },
          320: {
            slidesPerView: 3,
          },
          0: {
            slidesPerView: 2,
          },
        }}
      >
        {hours48Length?.slice(currentHour)?.map((hour) => {
          const dateToFormatHour = hour?.time;
          return (
            <SwiperSlide>
              <Box key={hour.time}>
                <Paper
                  sx={{
                    backgroundImage: Colors.backgroundImage,
                    width: "5rem",
                    padding: "8px 12px",
                  }}
                >
                  <Stack justifyContent="center" alignItems="center">
                    <Typography variant="subtitle2" color="secondary">
                      <Moment
                        format="hh A"
                        date={dateToFormatHour}
                      ></Moment>
                    </Typography>
                    <img
                      src={hour?.condition?.icon}
                      alt="weather icon"
                    />
                    <Typography variant="subtitle2" color="secondary">
                      {fahrenheit
                        ? `${hour?.temp_f}°F`
                        : `${hour?.temp_c}°C`}
                    </Typography>
                    <Typography variant="subtitle2" color="secondary">
                      {hour.chance_of_rain}%
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            </SwiperSlide>
          );
        })}
        <Grid
          sx={{ paddingTop: 2 }}
          container
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
          alignItems="center"
        >
          {todaysOverviewItems.map(({ item, value }) => (
            <Grid item key={item} sx={{ padding: "0 8px" }}>
              <Paper
                sx={{
                  backgroundColor: Colors.grey,
                  padding: "2rem",
                  width: 40,
                  height: 40,
                }}
                elevation={0}
              >
                <Stack>
                  <Typography
                    variant="subtitle2"
                    color="secondary.dark"
                  >
                    {item}
                  </Typography>
                  <Typography variant="subtitle2">{value}</Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Swiper>
    </Box>
  );
};

export default TodaysOverView;
