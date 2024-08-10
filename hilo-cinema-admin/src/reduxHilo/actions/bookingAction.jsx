// CONTROLLERS
export const goto_chooseFoodTab = (data) => ({
    type: "GOTO_CHOOSE_FOOD_TAB",
    payload: data,
  });
  
  export const goto_paymentTab = (data) => ({
    type: "GOTO_PAYMENT_TAB",
    payload:data,
  });
  
  // SET DATA
  
  
  
  // OTHERS TABS
  // Choose Seat Tab
  export const selectSeat = (seat) => ({
    type: "SELECT_SEAT",
    payload: seat,
  });
  
  export const deselectSeat = (seat) => ({
    type: "DESELECT_SEAT",
    payload: seat,
  });
  
  // Choose Food Tab
  export const selectFood = (foodId, quantity) => {
    return {
      type: 'SELECT_FOOD',
      payload: { foodId, quantity },
    };
  };
  
  // Payment Tab
  
  export const SET_VOUCHER = 'SET_VOUCHER';
  export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
  export const SET_STARS = 'SET_STARS';
  
  export const setVoucherAction = (voucher) => ({
    type: "SET_VOUCHER",
    payload: voucher,
  });
  
  export const setPaymentMethodAction = (paymentMethod) => ({
    type: "SET_PAYMENT_METHOD",
    payload: paymentMethod,
  });
  
  export const setStarsAction = (stars) => ({
    type: "SET_STARS",
    payload: stars,
  });