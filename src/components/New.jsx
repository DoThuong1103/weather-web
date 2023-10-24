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
    if (text.length <= length) {
      return text;
    }
    return text.substr(0, length) + "...";
  };
  console.log(news);
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
        {news?.value?.map((news, i) => {
          const dateToFormat = news?.datePublished;
          console.log(news);
          return (
            <SwiperSlide>
              <Card
                variant="outlined"
                sx={{ maxWidth: 300, minHeight: 300 }}
              >
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2">
                      {shortText(news?.name, 50)}
                    </Typography>
                    <Typography variant="caption">
                      {news?.provider?.[0]?.name}
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
                      {shortText(news?.description, 100)}
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
