import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const canGoNext = email && password;
  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, []);

  const onSubmit = useCallback(() => {
    if (!email) {
      return Alert.alert('오류', '이메일을 입력해주세요');
    }
    if (!password) {
      return Alert.alert('오류', '비밀번호를 입력해주세요');
    }
    Alert.alert('성공', '로그인성공');
  }, [email, password]);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, []);

  return (
    <View style={styles.inputWrapper}>
      <View>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="이메일을 입력해주세요."
          onChange={onChangeEmail}
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          ref={emailRef}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          keyboardType="email-address"
          blurOnSubmit={false}
          clearButtonMode="while-editing"
        />
      </View>
      <View>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력해주세요."
          onChange={onChangePassword}
          secureTextEntry
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            !canGoNext
              ? styles.loginButton
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          onPress={onSubmit}
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable style={styles.loginButton} onPress={toSignUp}>
          <Text style={styles.loginButtonText}>회원가입하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {},
  buttonZone: {alignItems: 'center'},
  inputWrapper: {padding: 20},
  label: {fontWeight: 'bold', fontSize: 16, marginBottom: 20},
  input: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
});

export default SignIn;
