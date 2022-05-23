import React, { Dispatch, SetStateAction } from 'react';
import { css } from '@emotion/native';
import ImageButton from '@components/ImageButton';
import { Text } from 'react-native';
import { ToJavaLocaleDate, ToStatDateString } from '@utils/date';
import Container from '@components/Container';

interface Props {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
}

function DateChange({ date, setDate }: Props) {
  const handlePressArrow = (change: number) => {
    const _date = new Date(date);
    _date.setMonth(_date.getMonth() + change);
    setDate(ToJavaLocaleDate(_date));
  };
  return (
    <Container
      style={css`
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      `}>
      <ImageButton
        style={{ width: 25, height: 25 }}
        uri={require('/assets/icons/left.png')}
        onPress={() => handlePressArrow(-1)}
      />
      <Text
        style={css`
          font-weight: 500;
          font-size: 16px;
        `}>
        {ToStatDateString(date)}
      </Text>
      <ImageButton
        style={{ width: 25, height: 25 }}
        uri={require('/assets/icons/right.png')}
        onPress={() => handlePressArrow(1)}
      />
    </Container>
  );
}

export default DateChange;
