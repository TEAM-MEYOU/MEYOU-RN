import React, { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from '@emotion/native';
import colors from '@constants/colors';
import BottomCTA from '@components/BottomCTA';
import { Alert, Keyboard, TextInput, View } from 'react-native';
import { checkAuthCode } from '@apis/couple';
import { useFetchUser } from '@hooks/queries';
import { useQueryClient } from 'react-query';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackNavigator } from '@navigation/RootNavigation';
import KeyboardHide from '@components/KeyboardHide';

function AuthCodeConnectScreen({ navigation }: NativeStackScreenProps<RootStackNavigator, 'AuthCodeConnect'>) {
  const fetchUser = useFetchUser();
  const queryClient = useQueryClient();
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const input2Ref = useRef<TextInput>(null);
  const input3Ref = useRef<TextInput>(null);
  const input4Ref = useRef<TextInput>(null);

  const handleChangeText = (
    text: string,
    setText: Dispatch<SetStateAction<string>>,
    nextRef?: RefObject<TextInput>
  ) => {
    setText(text);
    text && nextRef && nextRef.current?.focus();
  };

  const handlePressConnect = async () => {
    try {
      const authCode = input1 + input2 + input3 + input4;
      fetchUser.data && (await checkAuthCode(fetchUser.data?.uniqueCode, authCode));
      await queryClient.invalidateQueries('user');
      navigation.navigate('Main');
    } catch (e) {
      Alert.alert('인증코드가 일치하지 않습니다.');
    }
  };

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={css`
        flex: 1;
        padding: 15px;
      `}>
      <KeyboardHide>
        <View
          style={css`
            flex: 1;
          `}>
          <TitleText>연결할 인증코드를 입력해주세요</TitleText>
          <SubText>인증코드를 통해 커플이 연결됩니다</SubText>
          <View
            style={css`
              flex-direction: row;
              justify-content: space-between;
              width: 100%;
              padding: 30px 50px;
            `}>
            <CodeInput
              keyboardType={'numeric'}
              maxLength={1}
              autoFocus={true}
              returnKeyType={'next'}
              blurOnSubmit={false}
              value={input1}
              onChangeText={text => handleChangeText(text, setInput1, input2Ref)}
            />
            <CodeInput
              value={input2}
              onChangeText={text => handleChangeText(text, setInput2, input3Ref)}
              ref={input2Ref}
              keyboardType={'numeric'}
              maxLength={1}
              returnKeyType={'next'}
              blurOnSubmit={false}
            />
            <CodeInput
              value={input3}
              onChangeText={text => handleChangeText(text, setInput3, input4Ref)}
              ref={input3Ref}
              keyboardType={'numeric'}
              maxLength={1}
              returnKeyType={'next'}
              blurOnSubmit={false}
            />
            <CodeInput
              value={input4}
              onChangeText={setInput4}
              ref={input4Ref}
              keyboardType={'numeric'}
              maxLength={1}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <BottomCTA onPress={handlePressConnect}>연결하기</BottomCTA>
        </View>
      </KeyboardHide>
    </SafeAreaView>
  );
}

const TitleText = styled.Text`
  font-size: 21px;
  font-weight: 700;
  width: 100%;
`;

const SubText = styled.Text`
  width: 100%;
  margin-top: 5px;
  color: ${colors.grey600};
`;

const CodeInput = styled.TextInput`
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 50px;
  height: 50px;
  border-bottom-width: 2px;
  font-size: 25px;
  font-weight: 600;
  border-bottom-color: ${colors.content200};
`;

export default AuthCodeConnectScreen;
