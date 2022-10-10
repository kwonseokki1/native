import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Order {
  end: {
    latitude: number;
    longitude: number;
  };
  orderId: string;
  price: number;
  start: {latitude: number; longitude: number};
}

export interface initialState {
  orders: Order[];
  deliveries: Order[];
}

const initialState: initialState = {
  orders: [], // 오더목록
  deliveries: [], // 배달들 저장
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    acceptOrder(state, action: PayloadAction<string>) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      // 찾은경우
      if (index > -1) {
        state.deliveries.push(state.orders[index]);
        state.orders.splice(index, 1);
      }
    },
    rejectOrder(state, action: PayloadAction<string>) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      // 찾은경우
      if (index > -1) {
        state.orders.splice(index, 1);
      }
      const deliveries = state.deliveries.findIndex(
        v => v.orderId === action.payload,
      );
      if (deliveries > -1) {
        state.deliveries.splice(deliveries, 1);
      }
    },
  },
  extraReducers: {},
});
