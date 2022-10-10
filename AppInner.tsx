import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './src/pages/Settings'; //
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Deliverys';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import useSocket from './src/hooks/useSocket';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import userSlice from './src/slices/user';
import {orderSlice} from './src/slices/order';
// 로그인 했을떄
export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

// 로그인 안했을떄
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const [socket, disconnect] = useSocket();
  const dispatch = useDispatch();

  // axios interceptor
  React.useEffect(() => {
    // 성공했을떄는 첫번째 함수
    axios.interceptors.response.use(
      response => {
        console.log(response);
        return response;
      },
      // 에러가 발생했을때 두번째 에러함수 실행
      async error => {
        const {
          config, // 원래 요청을 가지고있음
          response: {status},
        } = error;
        if (status === 419) {
          if (error.response.data.code === 'expired') {
            const originRequest = config;
            const refreshToken = await EncryptedStorage.getItem('refreshToken');

            const {data} = await axios.post(
              `${Config.API_URL}/refreshToken`,
              {},
              {headers: {authorization: `Bearer ${refreshToken}`}},
            );

            dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
            originRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
          }
        }
        return Promise.reject(error);
      },
    );
  }, []);

  React.useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          return;
        }
        const response = await axios.post(
          `${Config.API_URL}/refreshToken`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(
          userSlice.actions.setUser({
            name: response.data.data.name,
            email: response.data.data.email,
            accessToken: response.data.data.accessToken,
          }),
        );
      } catch (error) {
        console.error(error);
        if ((error as AxiosError).response?.data.code === 'expired') {
          Alert.alert('알림', '다시 로그인 해주세요.');
        }
      } finally {
      }
      // TODO: 스플래시 스크린 없애기
    };

    getTokenAndRefresh();
  }, [dispatch]);

  React.useEffect(() => {
    const callback = (data: any) => {
      console.log('helloCallback', data);
      dispatch(orderSlice.actions.addOrder(data));
    };

    if (socket && isLoggedIn) {
      // 주문을 받겠다고 선언
      socket.emit('acceptOrder', 'hello');
      // 데이터 전달받음
      socket.on('order', callback);
    }

    return () => {
      if (socket) {
        socket.off('order', callback);
      }
    };
  }, [isLoggedIn, socket]);

  React.useEffect(() => {
    if (!isLoggedIn) {
      console.log('!isLoggedIn', !isLoggedIn);
      disconnect();
    }
  }, [isLoggedIn, disconnect]);
  // const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{title: '오더 목록'}}
          />
          <Tab.Screen
            name="Delivery"
            component={Delivery}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{title: '내 정보'}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;
