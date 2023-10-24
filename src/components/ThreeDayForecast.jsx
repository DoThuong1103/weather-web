import { Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const ThreeDayForecast = ({ forecast }) => {
  const fahrenheit = useSelector(
    (state) => state.weatherState.fahrenheit
  );
  console.log(forecast);
  return (
    <Grid
      sx={{ paddingTop: 2, paddingBottom: 2 }}
      container
      columns={{ xs: 1, sm: 2, md: 12 }}
    >
      {forecast?.map((day, i) => (
        <Grid item xs={1} sm={4} key={day[i]}>
          <Paper
            elevation={2}
            sx={{
              padding: 1,
              height: "100%",
            }}
          >
            <Stack justifyContent="center" alignItems="center">
              <Typography variant="subtitle2">
                <Moment format="dddd" date={day.date}></Moment>
              </Typography>
              <Typography variant="caption">
                {day.day.condition.text}
              </Typography>
              <img src={day.day.condition?.icon} alt="weather icon" />
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={1}
              >
                <Typography variant="body2" color="secondary.dark">
                  High:{" "}
                  {fahrenheit
                    ? `${day.day.maxtemp_f}°F`
                    : `${day.day.maxtemp_c}°C`}
                </Typography>
                <Typography variant="body2" color="secondary.dark">
                  Low:{" "}
                  {fahrenheit
                    ? `${day.day.maxtemp_f}°F`
                    : `${day.day.maxtemp_c}°C`}
                </Typography>
              </Stack>
              <Typography variant="subtitle2" color="secondary.dark">
                Rain: {day.day?.daily_chance_of_rain}%
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ThreeDayForecast;
