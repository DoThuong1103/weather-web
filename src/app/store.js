import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "../service/weatherAPI";
import weatherSlice from "../service/weatherSlice"
export default configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    weatherState: weatherSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
})
