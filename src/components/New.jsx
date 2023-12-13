import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import Moment from "react-moment";
import { Pagination } from "swiper/modules";
const New = ({ news }) => {
  const shortText = (text, length) => {
    if (text?.length <= length) {
      return text;
    }
    return text?.substr(0, length) + "...";
  };
  return (
    <Box p={4} pb={8}>
      <Typography mb={1} variant="h5">
        News
      </Typography>
      <Swiper
        modules={[Pagination]}
        spaceBetween={10}
        slidesPerView={10}
        slidesOffsetBefore={0}
        pagination={{ clickable: true }}
        breakpoints={{
          1920: {
            slidesPerView: 4,
          },
          1440: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 1,
          },
          320: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
      >
        {news?.news?.map((news, i) => {
          const dateToFormat = news?.datePublished;
          return (
            <SwiperSlide>
              <Card
                variant="outlined"
                sx={{
                  maxWidth: 300,
                  minHeight: 300,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingBottom: "20px",
                }}
              >
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2">
                      {shortText(news?.title, 40)}
                    </Typography>
                    <Typography variant="caption">
                      {news?.source}
                    </Typography>
                    <Typography variant="caption">
                      <Moment
                        format="LL"
                        date={{ dateToFormat }}
                      ></Moment>
                    </Typography>
                    <Divider light />
                    <Typography variant="body">
                      {" "}
                      {shortText(news?.body, 80)}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Link
                    href={news?.url}
                    target="_blank"
                    underline="none"
                  >
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default New;
