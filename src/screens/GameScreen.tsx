import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import Layout from '@components/Layout';
import { css } from '@emotion/native';

function GameScreen() {
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <Layout
        style={css`
          justify-content: center;
        `}>
        <Text>현재 준비중인 서비스 입니다</Text>
      </Layout>
    </SafeAreaView>
  );
}

export default GameScreen;
