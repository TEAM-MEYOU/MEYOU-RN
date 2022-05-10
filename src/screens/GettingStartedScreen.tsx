import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '@components/Layout';
import IconText from '@components/IconText';
import { Share, Text } from 'react-native';
import { css } from '@emotion/native';
import Container from '@components/Container';
import { useFetchUser } from '@hooks/queries';
import Lottie from '@components/Lottie';
import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

function GettingStartedScreen({ navigation }: NativeStackScreenProps<any>) {
  const fetchUser = useFetchUser();

  const handlePressMakeAuthCode = () => {
    navigation.navigate('AuthCodeMake');
  };

  const handlePressCopy = () => {
    fetchUser.data && Clipboard.setString(fetchUser.data.uniqueCode);
  };

  const handlePressDeepLink = async () => {
    try {
      await Share.share({
        title: '상대방에게 연결신청이 도착했어요!',
        url: `https://meyoudiary.com/connections?id=${fetchUser.data?.uniqueCode}`,
        message: `https://meyoudiary.com/connections?id=${fetchUser.data?.uniqueCode}`,
      });
    } catch (e) {
      console.log(e);
    }
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
        <IconText uri={require('/assets/icons/share.png')} onPress={handlePressDeepLink}>
          링크 공유하기
        </IconText>
        <IconText uri={require('/assets/icons/code.png')} onPress={handlePressMakeAuthCode}>
          인증코드 생성하기
        </IconText>
        <IconText uri={require('/assets/icons/code.png')} onPress={() => navigation.navigate('AuthCodeConnect')}>
          인증코드 입력하기
        </IconText>
        <IconText uri={require('/assets/icons/copy.png')} onPress={handlePressCopy}>
          내ID 복사하기
        </IconText>
      </Layout>
    </SafeAreaView>
  );
}

export default GettingStartedScreen;
