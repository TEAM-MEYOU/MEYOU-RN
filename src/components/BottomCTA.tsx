import { css } from '@emotion/native';
import colors from '@constants/colors';
import { Text, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';

interface Props {
  onPress: () => void;
  children: ReactNode;
}

function BottomCTA({ onPress, children }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={css`
        width: 100%;
        height: 50px;
        background-color: ${colors.content200};
        border-radius: 12px;
        padding: 10px;
        margin-top: auto;
        justify-content: center;
      `}>
      <Text
        style={css`
          color: white;
          font-weight: 700;
          font-size: 18px;
          text-align: center;
        `}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default BottomCTA;
