import { exampleCinemaSeat } from "../../views/admin/sales/variables/dataSeat"

const initialState = {
  cinemaData: exampleCinemaSeat,
  movieBooking: {
    title: 'Example Movie',
    type: '2D',
    theater: 'Galaxy Phú Thọ',
    room: 'Room 3',
    time: '18:00',
    date: '2024-06-30',
  },
  selectedSeats: [],
  totalAmount: 0,
  foodList: [
    { id: 1, title: 'Popcorn', description: 'Large popcorn', price: 50000, quantity: 0, image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG' },
    { id: 2, title: 'Coke', description: 'Large coke', price: 30000, quantity: 0, image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG' },
  ],
  voucher: '',
  paymentMethod: '',
  stars: 0,
  paymentMethods: [
    // Example data; replace with your actual data
    { value: 'creditCard', label: 'Credit Card', image: 'creditCard.jpg', checked: false },
    { value: 'paypal', label: 'PayPal', image: 'paypal.jpg', checked: false },
    // Add more payment methods as needed
  ],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_SEAT": {
      const seat = action.payload;
      const seatPrice = seat.type === 'VIP' ? 100000 : seat.type === 'Double' ? 150000 : 75000;
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, seat],
        totalAmount: state.totalAmount + seatPrice,
      };
    }
    case "DESELECT_SEAT": {
      const seat = action.payload;
      const seatPrice = seat.type === 'VIP' ? 100000 : seat.type === 'Double' ? 150000 : 75000;
      return {
        ...state,
        selectedSeats: state.selectedSeats.filter(selectedSeat => selectedSeat.name !== seat.name),
        totalAmount: state.totalAmount - seatPrice,
      };
    }
    case 'SELECT_FOOD':
      return {
        ...state,
        foodList: state.foodList.map((foodItem) =>
          foodItem.id === action.payload.foodId
            ? { ...foodItem, quantity: action.payload.quantity }
            : foodItem
        ),
      };
    case "SET_VOUCHER":
      return {
        ...state,
        voucher: action.payload,
      };
    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
        paymentMethods: state.paymentMethods.map((method) =>
          method.value === action.payload
            ? { ...method, checked: true }
            : { ...method, checked: false }
        ),
      };
    case "SET_STARS":
      return {
        ...state,
        stars: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;


