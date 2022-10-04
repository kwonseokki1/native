import {createSlice} from '@reduxjs/toolkit';

// store -> Root reducer(state) -> user slice, order slice
// state.user
// state.order

// action: state를 바꾸는 동작 또는 행위
// dispatch: action을 실제로 실행하는 함수
// reducer: action이 실제로 실행되면 state를 바꾸는 로직


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
