import React, {useCallback} from 'react';
import {FlatList, View, StyleSheet, Pressable, Text} from 'react-native';
import {Order} from '../slices/order';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import EachOrder from '../components/EachOrder';

function Orders() {
  const orders = useSelector((state: RootState) => state.order.orders);

  const renderItem = useCallback(({item}: {item: Order}) => {
    return <EachOrder item={item} />;
  }, []);

  return (
    <View>
      <FlatList
        data={orders} // 자체적인 반복문이 있음
        keyExtractor={item => item.orderId} // key 역할
        renderItem={renderItem}
      />
    </View>
  );
}

export default Orders;
