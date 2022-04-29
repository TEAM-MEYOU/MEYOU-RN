import React, { ReactNode } from 'react';
import { css } from '@emotion/native';
import colors from '@constants/colors';
import { StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

function Container({ children, style }: Props) {
  return (
    <View
      style={[
        css`
          position: relative;
          background-color: ${colors.white};
          width: 95%;
          height: auto;
          padding: 20px;
          border-radius: 12px;
        `,
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

export default Container;
