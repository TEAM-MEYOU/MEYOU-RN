import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import Layout from '@components/Layout';

function OptionScreen() {
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <Layout>
        <Text>Option</Text>
      </Layout>
    </SafeAreaView>
  );
}

export default OptionScreen;
