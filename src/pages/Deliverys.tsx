import React from 'react';
import {View, Text} from 'react-native';
import Ing from './Ing';
import Complete from './Complete';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
function Deliverys() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ing"
        component={Ing}
        options={{headerShown: false}}></Stack.Screen>

      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default Deliverys;
