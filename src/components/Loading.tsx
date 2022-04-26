import React from 'react';
import { css } from '@emotion/native';
import { ActivityIndicator, View } from 'react-native';
import colors from '@constants/colors';

function Loading() {
  return (
    <View
      style={css`
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: ${colors.whiteOpacity400};
        opacity: 1;
      `}>
      <ActivityIndicator size={'large'} color={colors.blue800} />
    </View>
  );
}

export default Loading;
