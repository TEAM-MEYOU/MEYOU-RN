import React, { useState } from 'react';
import BottomCTA from '@components/BottomCTA';
import { Alert, Text, TextInput } from 'react-native';
import OptionView from '@components/OptionView';
import { useFetchCouple, useFetchUser } from '@hooks/queries';
import { ConvertMeYouDateString } from '@utils/date';
import { css } from '@emotion/native';
import colors from '@constants/colors';
import { updateCouple } from '@apis/couple';
import { useQueryClient } from 'react-query';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OptionStackNavigator } from '@navigation/OptionNavigation';

function CoupleDataChangeScreen({ navigation }: NativeStackScreenProps<OptionStackNavigator, 'CoupleDataChange'>) {
  const queryClient = useQueryClient();
  const fetchUser = useFetchUser();
  const fetchCouple = useFetchCouple(fetchUser.data?.coupleId);
  const [date, setDate] = useState(() =>
    fetchCouple.data ? ConvertMeYouDateString(new Date(fetchCouple.data?.coupleStart)) : ''
  );

  const handleChangeText = (text: string) => {
    setDate(text.replace(/[^0-9]/g, ''));
    if (text.length === 8) {
      setDate(text.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3'));
    }
  };
  const handlePressChange = async () => {
    try {
      const [year, month, day] = date.split('.');
      const saveDate = new Date(Number(year), Number(month) - 1, Number(day) + 1);
      if (isNaN(saveDate.valueOf())) {
        Alert.alert('올바르지 않은 입력입니다.');
      }
      await updateCouple({ ...fetchCouple.data!, coupleStart: saveDate });
      await queryClient.invalidateQueries('couple');
      navigation.navigate('Option');
    } catch (e) {
      Alert.alert('올바르지 않은 입력입니다.');
    }
  };
  return (
    <OptionView>
      <Text
        style={css`
          font-weight: 500;
          font-size: 16px;
          color: ${colors.grey500};
        `}>
        우리의 시작일
      </Text>
      <Text
        style={css`
          margin-top: 10px;
          font-weight: 600;
          font-size: 22px;
        `}>
        {`우리가 시작한 날짜를\n입력해보세요`}
      </Text>
      <TextInput
        style={css`
          margin-top: 20px;
          font-size: 20px;
          font-weight: 500;
          padding: 5px;
          border-bottom-width: 1px;
        `}
        value={date}
        onChangeText={handleChangeText}
        placeholder={'시작한 날짜를 입력하세요'}
        keyboardType={'numeric'}
        maxLength={10}
      />
      <Text
        style={css`
          margin-top: 5px;
          margin-left: auto;
          letter-spacing: -0.5px;
          font-weight: 500;
          color: ${colors.content300};
        `}>
        *yyyy.mm.dd형식
      </Text>
      <BottomCTA onPress={handlePressChange}>변경</BottomCTA>
    </OptionView>
  );
}

export default CoupleDataChangeScreen;
