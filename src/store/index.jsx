import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../Page/BookingPage/slice";

const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});

export default store;
