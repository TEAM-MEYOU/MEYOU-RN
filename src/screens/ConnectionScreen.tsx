import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '@components/Layout';
import IconText from '@components/IconText';
import { Alert, Text } from 'react-native';
import { css } from '@emotion/native';
import Container from '@components/Container';
import { useFetchUser } from '@hooks/queries';
import Lottie from '@components/Lottie';
import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

function ConnectionScreen({ navigation }: NativeStackScreenProps<any>) {
  const fetchUser = useFetchUser();

  const handlePressMakeAuthCode = () => {
    navigation.navigate('AuthCodeMake');
  };

  const handlePressCopy = () => {
    fetchUser.data && Clipboard.setString(fetchUser.data.uniqueCode);
  };

  return (
    <SafeAreaView>
      <Layout>
        <Container
          style={css`
            align-items: center;
            justify-content: center;
            flex: 1;
          `}>
          <Lottie
            style={css`
              width: 200px;
              height: 200px;
            `}
            uri={'https://assets7.lottiefiles.com/packages/lf20_dpohsucu.json'}
            autoPlay={true}
            loop={true}
          />
          <Text
            style={css`
              text-align: center;
              font-size: 18px;
              font-weight: 600;
              line-height: 30px;
            `}>{`안녕하세요! ${fetchUser.data?.uniqueCode}님 \n아직 상대방과 연결되지 않았어요!`}</Text>
        </Container>
        <IconText uri={require('/assets/icons/share.png')} onPress={() => Alert.alert('hi')}>
          링크 공유하기
        </IconText>
        <IconText uri={require('/assets/icons/code.png')} onPress={handlePressMakeAuthCode}>
          인증코드 생성하기
        </IconText>
        <IconText uri={require('/assets/icons/code.png')} onPress={() => Alert.alert('hi')}>
          인증코드 입력하기
        </IconText>
        <IconText uri={require('/assets/icons/copy.png')} onPress={handlePressCopy}>
          내ID 복사하기
        </IconText>
      </Layout>
    </SafeAreaView>
  );
}

export default ConnectionScreen;
