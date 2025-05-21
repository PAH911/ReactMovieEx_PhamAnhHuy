import { createSlice } from "@reduxjs/toolkit";
import danhSachGhe from "../../data/danhSachGhe.json";

const seatData = danhSachGhe.filter((row) => row.hang !== "");

const getInitialBookedSeats = () => {
  let booked = [];
  seatData.forEach((row) => {
    row.danhSachGhe.forEach((seat) => {
      if (seat.daDat) booked.push(seat.soGhe);
    });
  });
  return booked;
};

const initialState = {
  selectedSeats: [],
  bookedSeats: getInitialBookedSeats(),
  showSuccess: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    selectSeat: (state, action) => {
      const soGhe = action.payload;
      if (state.bookedSeats.includes(soGhe)) return;
      if (state.selectedSeats.includes(soGhe)) {
        state.selectedSeats = state.selectedSeats.filter((s) => s !== soGhe);
      } else {
        state.selectedSeats.push(soGhe);
      }
    },
    bookSeats: (state) => {
      state.bookedSeats = [...state.bookedSeats, ...state.selectedSeats];
      state.selectedSeats = [];
      state.showSuccess = true;
    },
    hideSuccess: (state) => {
      state.showSuccess = false;
    },
  },
});

export const { selectSeat, bookSeats, hideSuccess } = bookingSlice.actions;
export default bookingSlice.reducer;
