import React, {useState} from 'react';
import {SafeAreaView, Text, Pressable} from 'react-native';

function Settings() {
  const [count, setCount] = useState(1);
  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          setCount(prev => prev + 1);
        }}>
        <Text>{count}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Settings;
