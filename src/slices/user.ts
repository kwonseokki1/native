import {createSlice} from '@reduxjs/toolkit';

// store -> Root reducer(state) -> user slice, order slice
// state.user
// state.order

const initialState = {
  name: '',
  email: '',
  accessToken: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: builder => {}, // 비동기액션 만들떄
});

export default userSlice;
