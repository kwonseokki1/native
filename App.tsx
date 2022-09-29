import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Pressable, Text, TouchableHighlight, View} from 'react-native';
import {useCallback} from 'react';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;

function HomeScreen({navigation}: HomeScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'yellow',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={onClick}
          style={{padding: 20, backgroundColor: 'blue'}}>
          <Text style={{color: 'white'}}>Home Screen</Text>
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'orange',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>dd</Text>
      </View>
    </>
  );
}

function DetailsScreen({navigation}: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableHighlight onPress={onClick}>
        <Text>Details Screen</Text>
      </TouchableHighlight>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈화면'}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{title: '상세보기'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// [Style]
// Stylesheet.create 가 여러모로 성능상 좋음(React Native가 id를 부여함)
//dip 는 기기의 dp에 대조되는 비율
// border:1px solid red <- 안됨

// [Component]
// View => div 와 비슷
// <View><Text>무조건 텍스트로 감싸준다.</Text></View>
// SafeAreaView 를 쓰면 노치부분을 제외하고 렌더링한다.
// ScrollView 스크롤이 가능한 컴포넌트 영역 => 성능문제로 추후에 FlatList 사용
// 한개의 파일안에 두개의 컴포넌트 지양
