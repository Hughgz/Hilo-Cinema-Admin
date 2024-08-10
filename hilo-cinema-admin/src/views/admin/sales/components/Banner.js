import { useSelector, useDispatch } from "react-redux";
import { selectSeat, deselectSeat } from "../../../../reduxHilo/actions/bookingAction";
import { useColorModeValue } from "@chakra-ui/system";

export default function Banner() {
  const dispatch = useDispatch();
  const cinemaData = useSelector((state) => state.booking.cinemaData);
  const selectedSeats = useSelector((state) => state.booking.selectedSeats);

  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("black", "white");
  const seatTextColor = useColorModeValue("black", "white");
  const handleSeatClick = (seat) => {
    if (isSelected(seat)) {
      dispatch(deselectSeat(seat));
    } else {
      dispatch(selectSeat(seat));
    }
  };

  const isSelected = (seat) => {
    return selectedSeats.some(
      (selectedSeat) => selectedSeat.name === seat?.name
    );
  };

  return (
    <>
      <p className="text-s text-center" style={{ color: textColor }}>Màn hình</p>
      <div className="border-2 border-orange-500 mt-3"></div>
      <div className="md:px-6 py-4 px-2 rounded md:mb-8 w-full" style={{ backgroundColor: boxBg }}>
        <div className="md:block flex flex-wrap justify-center w-full h-full overflow-auto">
          <ul className="seat__layout-rows md:mb-8 w-auto grid grid-cols-1 items-center flex-auto text-o">
            {[...Array(cinemaData.row)].reverse().map((_, i) => { // Đảo ngược thứ tự hàng
              const rowLabel = String.fromCharCode(65 + i); // A là 65 trong mã ASCII
              return (
                <li
                  key={i}
                  className="flex justify-between mb-3 md:gap-0 gap-1 flex-nowrap"
                >
                  <div className="text-sm font-semibold flex-none w-5 text-left" style={{ color: textColor }}>
                    {rowLabel}
                  </div>
                  <div className="flex md:gap-2 gap-1 grow justify-center min-w-[398px] flex-1">
                    {[...Array(cinemaData.col)].map((_, colIndex) => {
                      const seat = (cinemaData.seats || []).find(
                        (seat) =>
                          seat.row === rowLabel && seat.col === colIndex + 1
                      );

                      const isInvisible = seat?.status === "invisible";
                      const isDisavailable = seat?.status === "disavailable";
                      const isSelected = selectedSeats.some(
                        (selectedSeat) => selectedSeat.name === seat?.name
                      );

                      return (
                        <button
                          key={colIndex}
                          className={`md:h-8 h-6 border rounded md:text-s text-[10px] transition duration-300 ease-in-out ${isInvisible
                              ? "invisible"
                              : isDisavailable
                                ? "bg-gray-300 border-gray-300"
                                : isSelected
                                  ? "text-white bg-green-500 border-green-500"
                                  : "border-gray-400 hover:bg-green-100 hover:border-green-500"
                            } md:w-8 w-6 shadow-sm`}
                          disabled={isDisavailable}
                          onClick={() => handleSeatClick(seat)}
                        >
                          {!isInvisible && (
                            <span
                              className={`inline-block md:w-8 w-6 text-center`}
                              style={{ color: isSelected ? "white" : seatTextColor }} // Apply seat text color here
                            >
                              {seat?.name}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-sm font-semibold flex-none w-5 text-right" style={{ color: textColor }}>
                    {rowLabel}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="seat__layout-screen mt-4">
          <div className="text-sm flex md:flex-row flex-col-reverse justify-between items-center py-9 gap-2">
            <div className="flex gap-5">
              <div>
                <span className="w-5 h-5 rounded bg-gray-300 inline-block align-middle"></span>
                <span className="ml-2" style={{ color: textColor }}>Ghế đã bán</span>
              </div>
              <div>
                <span className="w-5 h-5 rounded bg-green-500 inline-block align-middle"></span>
                <span className="ml-2" style={{ color: textColor }}>Ghế đang chọn</span>
              </div>
            </div>
            <div className="flex gap-5">
              <div>
                <span className="w-5 h-5 rounded border border-yellow-500 inline-block align-middle"></span>
                <span className="ml-2" style={{ color: textColor }}>Ghế VIP</span>
              </div>
              <div>
                <span className="w-5 h-5 rounded border border-gray-500 inline-block align-middle"></span>
                <span className="ml-2" style={{ color: textColor }}>Ghế đơn</span>
              </div>
              <div>
                <span className="w-[46px] h-5 rounded border border-blue-500 inline-block align-middle"></span>
                <span className="ml-2" style={{ color: textColor }}>Ghế đôi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
