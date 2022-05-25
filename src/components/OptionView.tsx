import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReactNode } from 'react';
import { css } from '@emotion/native';

interface Props {
  children: ReactNode;
}

function OptionView({ children }: Props) {
  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={css`
        flex: 1;
        padding: 10px;
      `}>
      {children}
    </SafeAreaView>
  );
}

export default OptionView;
