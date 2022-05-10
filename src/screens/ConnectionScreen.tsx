import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomCTA from '@components/BottomCTA';
import Container from '@components/Container';
import Layout from '@components/Layout';
import { RootStackNavigator } from '@navigation/RootNavigation';
import Lottie from '@components/Lottie';
import { css } from '@emotion/native';
import { useQueryClient } from 'react-query';
import { connectCouple } from '@apis/couple';
import { getMemberByUniqueCode, Member } from '@apis/member';
import { useFetchUser } from '@hooks/queries';

function ConnectionScreen({ navigation, route }: NativeStackScreenProps<RootStackNavigator, 'Connection'>) {
  const { uniqueCode } = route.params;
  const fetchUser = useFetchUser();
  const [kakao, setKakao] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleClickConnect = async () => {
    setLoading(true);
    fetchUser.data && (await connectCouple(uniqueCode, fetchUser.data?.uniqueCode));
    await queryClient.invalidateQueries('user');
    setTimeout(() => {
      navigation.navigate('Main');
    }, 3000);
  };

  const fetchValidUser = async () => {
    try {
      const member: Member = await getMemberByUniqueCode(uniqueCode);
      setKakao(member.kakao);
    } catch (e) {
      Alert.alert('유효하지 않은 페이지입니다.');
      navigation.navigate('Splash');
    }
  };

  useEffect(() => {
    fetchValidUser();
  }, []);

  if (loading)
    return (
      <SafeAreaView>
        <Layout>
          <Container
            style={css`
              flex: 1;
            `}>
            <Lottie
              style={css`
                height: 300px;
              `}
              uri={'https://assets4.lottiefiles.com/packages/lf20_x62chJ.json'}
              loop={true}
              autoPlay={true}
            />
            <View
              style={css`
                flex: 1;
                flex-direction: row;
                align-items: center;
                justify-content: center;
              `}>
              <Text
                style={css`
                  width: 100%;
                  text-align: center;
                  font-weight: 600;
                  font-size: 20px;
                `}>{`연결중이에요! \n\n잠시만 기다려주세요..!`}</Text>
            </View>
          </Container>
        </Layout>
      </SafeAreaView>
    );
  else
    return (
      <SafeAreaView>
        <Layout>
          <Container
            style={css`
              flex: 1;
            `}>
            <Text
              style={css`
                font-size: 22px;
                font-weight: 700;
              `}>
              초대메세지가 도착했어요!
            </Text>
            <Lottie
              style={css`
                height: 300px;
              `}
              uri={'https://assets8.lottiefiles.com/private_files/lf30_n5n2u73t.json'}
              loop={true}
              autoPlay={true}
            />
            <View
              style={css`
                flex-direction: row;
                align-items: center;
                margin: 50px 0 5px 0;
              `}>
              <Image style={{ width: 35, height: 35, marginRight: 10 }} source={require('assets/icons/bulb.png')} />
              <Text
                style={css`
                  font-size: 16px;
                  font-weight: 600;
                  letter-spacing: -0.5px;
                `}>
                {uniqueCode}님의 정보를 확인하세요!
              </Text>
            </View>
            <Text
              style={css`
                font-size: 20px;
                font-weight: 700;
                letter-spacing: -0.5px;
                margin-bottom: 10px;
              `}>
              카카오 아이디: {kakao}
            </Text>
            <BottomCTA onPress={handleClickConnect}>연결</BottomCTA>
          </Container>
        </Layout>
      </SafeAreaView>
    );
}

export default ConnectionScreen;
