import {orderSlice} from './../slices/order';
import {combineReducers} from '@reduxjs/toolkit';

import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  order: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
