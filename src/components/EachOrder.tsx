import axios, {AxiosError} from 'axios';
import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Pressable, Text, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Order, orderSlice} from '../slices/order';
import {useAppDispatch} from '../store';
import {RootState} from '../store/reducer';
import Config from 'react-native-config';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

function EachOrder({item}: {item: Order}) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const dispatch = useAppDispatch();
  const [detail, setDetail] = useState<boolean>(false); //false
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const toggleDetail = useCallback(() => {
    setDetail(!detail); //true
  }, [detail]);

  const onAccept = useCallback(async () => {
    try {
      await axios.post(
        `${Config.API_URL}/accept`,
        {
          orderId: item.orderId,
        },
        {
          headers: {authorization: `Bearer ${accessToken}`},
        },
      );
    } catch (e) {
      let errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        Alert.alert('알림', errorResponse.data.message);
      }
    }
    dispatch(orderSlice.actions.acceptOrder(item.orderId));
  }, [accessToken, navigation, item.orderId]);

  const onReject = useCallback(() => {
    dispatch(orderSlice.actions.rejectOrder(item.orderId));
  }, []);
  return (
    <View key={item.orderId} style={styles.orderContainer}>
      <Pressable onPress={toggleDetail} style={styles.info}>
        <Text>{item.price}원</Text>

        <Text>왕십리동</Text>
        {detail && (
          <View>
            <View>
              <Text>네이버맵이 들어갈 장소</Text>
            </View>
            <View style={styles.buttonWrapper}>
              <Pressable onPress={onAccept} style={styles.acceptButton}>
                <Text style={styles.buttonText}>수락</Text>
              </Pressable>
              <Pressable onPress={onReject} style={styles.rejectButton}>
                <Text style={styles.buttonText}>거절</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  eachInfo: {},
  buttonWrapper: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1,
  },
  rejectButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EachOrder;
