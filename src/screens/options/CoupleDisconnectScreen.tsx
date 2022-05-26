import React, { useState } from 'react';
import OptionView from '@components/OptionView';
import { GreyTitle } from '@components/Text/GreyTitle';
import { BigTitle } from '@components/Text/BigTitle';
import BottomCTA from '@components/BottomCTA';
import { useFetchUser } from '@hooks/queries';
import { disconnectCouple } from '@apis/couple';
import { useQueryClient } from 'react-query';
import { Alert, Keyboard, Text, TextInput, View } from 'react-native';
import { css } from '@emotion/native';
import colors from '@constants/colors';
import { OptionNavigationProp } from '@navigation/OptionNavigation';
import { useNavigation } from '@react-navigation/native';
import KeyboardHide from '@components/KeyboardHide';

function CoupleDisconnectScreen() {
  const navigation = useNavigation<OptionNavigationProp>();
  const queryClient = useQueryClient();
  const fetchUser = useFetchUser();
  const [input, setInput] = useState('');

  const handlePressDisconnect = async () => {
    try {
      if (input === '연결해제' && fetchUser.data) {
        await disconnectCouple(fetchUser.data.coupleId);
        await queryClient.invalidateQueries();
        navigation.navigate('GettingStarted');
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
        <View
          style={css`
            flex: 1;
          `}>
          <GreyTitle>연결해제</GreyTitle>
          <BigTitle>{`상대방과 연결을\n해제 하시겠습니까?`}</BigTitle>
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
            연결해제를 위해 '연결해제'를 입력해주세요
          </Text>
          <BottomCTA onPress={handlePressDisconnect}>확인</BottomCTA>
        </View>
      </KeyboardHide>
    </OptionView>
  );
}

export default CoupleDisconnectScreen;
