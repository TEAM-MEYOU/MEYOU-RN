import { useQueryClient } from 'react-query';
import { useFetchUser } from '@hooks/queries';
import React, { useState } from 'react';
import { Alert, Keyboard, Text, TextInput } from 'react-native';
import OptionView from '@components/OptionView';
import { GreyTitle } from '@components/Text/GreyTitle';
import { BigTitle } from '@components/Text/BigTitle';
import { css } from '@emotion/native';
import colors from '@constants/colors';
import BottomCTA from '@components/BottomCTA';
import { disconnectMember } from '@apis/member';
import { OptionNavigationProp } from '@navigation/OptionNavigation';
import { useNavigation } from '@react-navigation/native';
import KeyboardHide from '@components/KeyboardHide';

function WithdrawScreen() {
  const navigation = useNavigation<OptionNavigationProp>();
  const queryClient = useQueryClient();
  const fetchUser = useFetchUser();
  const [input, setInput] = useState('');

  const handlePressWithdraw = async () => {
    if (fetchUser.data?.coupleId) {
      Alert.alert('커플연결 해제후 회원탈퇴 가능합니다.');
      return;
    }
    try {
      if (input === '회원탈퇴' && fetchUser.data) {
        await disconnectMember(fetchUser.data.id);
        await queryClient.invalidateQueries();
        navigation.navigate('Login');
      } else {
        Alert.alert('정확히 입력해주세요');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <OptionView>
      <KeyboardHide>
        <GreyTitle>회원탈퇴</GreyTitle>
        <BigTitle>{`미유 서비스를\n탈퇴 하시겠습니까?`}</BigTitle>
        <TextInput
          style={css`
            margin-top: 15px;
            padding: 5px;
            font-size: 18px;
            font-weight: 500;
            border-bottom-width: 1px;
          `}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={Keyboard.dismiss}
        />
        <Text
          style={css`
            margin-top: 3px;
            letter-spacing: -0.5px;
            font-weight: 500;
            color: ${colors.content300};
          `}>
          연결해제를 위해 '회원탈퇴'를 입력해주세요
        </Text>
        <BottomCTA onPress={handlePressWithdraw}>확인</BottomCTA>
      </KeyboardHide>
    </OptionView>
  );
}

export default WithdrawScreen;
