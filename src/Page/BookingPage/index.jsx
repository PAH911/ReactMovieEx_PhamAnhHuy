import React from "react";
import { useSelector, useDispatch } from "react-redux";
import danhSachGhe from "../../data/danhSachGhe.json";
import { selectSeat, bookSeats, hideSuccess } from "./slice";

const seatData = danhSachGhe.filter((row) => row.hang !== "");

const BookingPage = () => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);
  const bookedSeats = useSelector((state) => state.booking.bookedSeats);
  const showSuccess = useSelector((state) => state.booking.showSuccess);

  const handleSelect = (soGhe, daDat) => {
    if (daDat || bookedSeats.includes(soGhe)) return;
    dispatch(selectSeat(soGhe));
  };

  const handleBook = () => {
    if (selectedSeats.length === 0) return;
    dispatch(bookSeats());
    setTimeout(() => dispatch(hideSuccess()), 2000);
  };

  const getSeatPrice = (soGhe) => {
    for (let row of seatData) {
      for (let seat of row.danhSachGhe) {
        if (seat.soGhe === soGhe) return seat.gia;
      }
    }
    return 0;
  };

  const total = selectedSeats.reduce(
    (sum, soGhe) => sum + getSeatPrice(soGhe),
    0
  );

  return (
    <div style={{ minHeight: "100vh", width: "100%", position: "relative" }}>
      <div className="bg-overlay"></div>
      <div className="booking-container">
        <div className="booking-content">
          {/* Sơ đồ ghế */}
          <div className="seat-map">
            <h2 className="title">ĐẶT VÉ XEM PHIM CYBERLEARN.VN</h2>
            <div className="screen-label">
              <div className="screen-bar"></div>
              Màn hình
            </div>
            <div className="seat-rows">
              {seatData.map((row) => (
                <div key={row.hang} className="seat-row">
                  <span className="seat-row-label">{row.hang}</span>
                  {row.danhSachGhe.map((seat) => {
                    const isSelected = selectedSeats.includes(seat.soGhe);
                    const isBooked = bookedSeats.includes(seat.soGhe);
                    return (
                      <button
                        key={seat.soGhe}
                        className={
                          "seat-btn" +
                          (isBooked
                            ? " booked"
                            : isSelected
                            ? " selected"
                            : seat.daDat
                            ? " unavailable"
                            : "")
                        }
                        disabled={seat.daDat || isBooked}
                        onClick={() => handleSelect(seat.soGhe, seat.daDat)}
                      >
                        {seat.soGhe.replace(/^[A-Z]/, "")}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Bảng thông tin */}
          <div className="info-panel">
            <div>
              <h3>Danh sách ghế bạn chọn</h3>
              <div className="selected-seats-list">
                {selectedSeats.length === 0 ? (
                  <span style={{ color: "#64748b", fontStyle: "italic" }}>
                    Chưa có ghế nào
                  </span>
                ) : (
                  selectedSeats.map((soGhe) => (
                    <span key={soGhe} className="selected-seat-item">
                      {soGhe}
                    </span>
                  ))
                )}
              </div>
              <div className="total">
                Tổng tiền: {total.toLocaleString()} VND
              </div>
              <div className="legend">
                <span className="legend-box legend-available"></span> Ghế trống
                <span className="legend-box legend-selected"></span> Ghế bạn
                chọn
                <span className="legend-box legend-booked"></span> Ghế đã đặt
                <span className="legend-box legend-unavailable"></span> Ghế
                không khả dụng
              </div>
            </div>
            <div>
              <button
                onClick={handleBook}
                disabled={selectedSeats.length === 0}
              >
                Thanh toán
              </button>
              {showSuccess && (
                <div className="success-message">Thanh toán thành công!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
