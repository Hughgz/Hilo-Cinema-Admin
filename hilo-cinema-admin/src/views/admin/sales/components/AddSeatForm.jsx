import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSeat, deselectSeat } from "../../../../reduxHilo/actions/bookingAction";
import { useColorModeValue, Button, ModalFooter } from "@chakra-ui/react";
import { saveSeats } from "../../../../reduxHilo/actions/seatAction";
import ModalAlert from "components/alert/modalAlert"; // Import ModalAlert

export default function AddSeatForm({ roomId, rowNum, colNum, onClose }) {
    const dispatch = useDispatch();
    const selectedSeats = useSelector((state) => state.booking.selectedSeats);
    const [vipSeats, setVipSeats] = useState([]); // State để lưu các ghế VIP
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const textColor = useColorModeValue("black", "white");
    const seatTextColor = useColorModeValue("black", "white");

    // Hàm xử lý khi nhấp vào ghế
    const handleSeatClick = (seatName) => {
        if (isSelected(seatName)) {
            dispatch(deselectSeat(seatName));
            setVipSeats(vipSeats.filter(seat => seat !== seatName)); // Xóa ghế khỏi danh sách VIP nếu đã chọn trước đó
        } else {
            dispatch(selectSeat(seatName));
        }
    };

    // Kiểm tra xem ghế có đang được chọn không
    const isSelected = (seatName) => selectedSeats.includes(seatName);

    // Hàm xử lý khi nhấn nút "Save"
    const handleSave = () => {
        const seatsData = [];

        // Lặp qua hàng và cột để tạo dữ liệu ghế
        for (let rowIndex = 0; rowIndex < rowNum; rowIndex++) {
            const rowLabel = String.fromCharCode(65 + rowIndex); // Tạo nhãn hàng ghế (A, B, C...)
            for (let colIndex = 0; colIndex < colNum; colIndex++) {
                const seatName = `${rowLabel}${colIndex + 1}`; // Tạo tên ghế (A1, A2,...)
                const seatType = vipSeats.includes(seatName) ? "vip" : "standard"; // Nếu ghế trong danh sách VIP thì lưu với loại "vip"

                // Tạo dữ liệu ghế
                const seatData = {
                    roomId: roomId,
                    colSeat: colIndex + 1,
                    rowSeat: rowIndex + 1,
                    name: seatName,
                    type: seatType,  // Gán loại ghế
                    status: "available"
                };

                seatsData.push(seatData);
            }
        }

        // Gọi action saveSeats để lưu thông tin ghế
        dispatch(saveSeats(seatsData))
            .then(response => {
                setAlertMessage("Seats added successfully!");
                setAlertType("success");
                setIsAlertVisible(true); // Hiển thị thông báo thành công
            })
            .catch(error => {
                setAlertMessage("Error adding seats! " + error.message);
                setAlertType("error");
                setIsAlertVisible(true); // Hiển thị thông báo lỗi
            });
    };

    // Hàm xử lý khi nhấn vào nút chọn ghế VIP
    const handleVipSelect = () => {
        const newVipSeats = selectedSeats.filter(seat => !vipSeats.includes(seat)); // Chọn ghế VIP nếu chưa chọn
        setVipSeats([...vipSeats, ...newVipSeats]); // Cập nhật danh sách ghế VIP
    };

    // Hàm đóng ModalAlert
    const closeAlert = () => {
        setIsAlertVisible(false);
        onClose(); // Đóng form sau khi đóng ModalAlert
    };

    return (
        <>
            <p className="text-s text-center" style={{ color: textColor }}>Màn hình</p>
            <div className="border-2 border-orange-500 mt-3"></div>
            <div className="md:px-6 py-4 px-2 rounded md:mb-8 w-full" style={{ backgroundColor: boxBg }}>
                <div className="md:block flex flex-wrap justify-center w-full h-full overflow-auto">
                    <ul className="seat__layout-rows md:mb-8 w-auto grid grid-cols-1 items-center flex-auto text-o">
                        {[...Array(rowNum)].reverse().map((_, rowIndex) => {
                            const rowLabel = String.fromCharCode(65 + rowIndex); // Tạo nhãn hàng ghế A, B, C...
                            return (
                                <li
                                    key={rowIndex}
                                    className="flex justify-between mb-3 md:gap-0 gap-1 flex-nowrap"
                                >
                                    <div className="text-sm font-semibold flex-none w-5 text-left" style={{ color: textColor }}>
                                        {rowLabel}
                                    </div>
                                    <div className="flex md:gap-2 gap-1 grow justify-center min-w-[398px] flex-1">
                                        {[...Array(colNum)].map((_, colIndex) => {
                                            const seatName = `${rowLabel}${colIndex + 1}`; // Tạo tên ghế (A1, A2,...)
                                            const isDisavailable = false; // Giả định rằng không có ghế nào không khả dụng
                                            const isInvisible = false; // Giả định rằng không có ghế nào vô hình

                                            return (
                                                <button
                                                    key={colIndex}
                                                    className={`md:h-8 h-6 border rounded md:text-s text-[10px] transition duration-300 ease-in-out ${
                                                        isInvisible
                                                            ? "invisible"
                                                            : isDisavailable
                                                            ? "bg-gray-300 border-gray-300"
                                                            : isSelected(seatName)
                                                            ? vipSeats.includes(seatName)
                                                                ? "text-white bg-green-500 border-red-500" // Viền đỏ cho ghế VIP
                                                                : "text-white bg-green-500 border-green-500" // Viền xanh cho ghế chọn
                                                            : "border-gray-400 hover:bg-green-100 hover:border-green-500"
                                                    } md:w-8 w-6 shadow-sm`}
                                                    disabled={isDisavailable}
                                                    onClick={() => handleSeatClick(seatName)}
                                                >
                                                    {!isInvisible && (
                                                        <span
                                                            className={`inline-block md:w-8 w-6 text-center`}
                                                            style={{ color: isSelected(seatName) ? "white" : seatTextColor }}
                                                        >
                                                            {seatName}
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
                <div className="flex justify-end gap-5">
                    <Button
                        variant="outline"
                        colorScheme="red"
                        size="sm"
                        onClick={handleVipSelect} // Chọn ghế VIP
                        leftIcon={<span className="w-5 h-5 bg-red-500 inline-block rounded-full"></span>}
                    >
                        Ghế VIP
                    </Button>
                    <Button
                        variant="outline"
                        colorScheme="blue"
                        size="sm"
                        leftIcon={<span className="w-5 h-5 bg-blue-500 inline-block rounded-full"></span>}
                    >
                        Ghế đôi
                    </Button>
                </div>
            </div>

            <ModalFooter>
                <Button colorScheme="blue" onClick={handleSave}>Save</Button>
                <Button onClick={onClose} marginLeft={2}>Close</Button>
            </ModalFooter>

            {/* ModalAlert để hiển thị thông báo thành công hoặc lỗi */}
            <ModalAlert
                message={alertMessage}
                type={alertType}
                isVisible={isAlertVisible}
                onClose={closeAlert}
            />
        </>
    );
}
