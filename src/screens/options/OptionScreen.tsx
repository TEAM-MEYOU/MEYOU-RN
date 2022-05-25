import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import Layout from '@components/Layout';
import UserProfileImage from '@components/UserProfileImage';
import { useFetchUser } from '@hooks/queries';
import Container from '@components/Container';
import styled, { css } from '@emotion/native';
import colors from '@constants/colors';
import { OptionNavigationProp } from '@navigation/OptionNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';

function OptionScreen() {
  const navigation = useNavigation<OptionNavigationProp>();
  const queryClient = useQueryClient();
  const fetchUser = useFetchUser();

  const handlePressLogOut = () => {
    Alert.alert('안내', '로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃',
        onPress: async () => {
          await AsyncStorage.clear();
          await queryClient.invalidateQueries();
          navigation.navigate('Login');
        },
      },
    ]);
  };
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <Layout>
        <Container>
          <BoldText>내 정보</BoldText>
          <View
            style={css`
              align-items: center;
            `}>
            <UserProfileImage url={fetchUser.data?.imageUrl} style={{ width: 65, height: 65, marginBottom: 5 }} />
            <BoldText
              style={css`
                font-size: 15px;
                padding-bottom: 5px;
              `}>
              {fetchUser.data?.nickname}
            </BoldText>
          </View>
          <Row>
            <BoldText>카카오 계정</BoldText>
            <BoldText>{fetchUser.data?.kakao}</BoldText>
          </Row>
          <Row>
            <BoldText>연결된 상대방</BoldText>
            <BoldText>{fetchUser.data?.coupleInfo?.kakao}</BoldText>
          </Row>
        </Container>
        <OptionMenu title={'커플 정보 변경'} onPress={() => navigation.navigate('CoupleDataChange')} />
        <OptionMenu title={'상대방 프로필 변경'} onPress={() => navigation.navigate('ProfileChange')} />
        <OptionMenu title={'커플 연결 해제'} warn={true} onPress={() => navigation.navigate('CoupleDisconnect')} />
        <OptionMenu title={'탈퇴하기'} warn={true} onPress={() => navigation.navigate('Withdraw')} />
        <OptionMenu title={'로그아웃'} warn={true} onPress={handlePressLogOut} />
      </Layout>
    </SafeAreaView>
  );
}

const BoldText = styled.Text`
  font-weight: 600;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export default OptionScreen;

interface MenuProps {
  title: string;
  warn?: boolean;
  onPress: () => void;
}

function OptionMenu({ title, onPress, warn = false }: MenuProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={css`
        margin-top: 10px;
        width: 100%;
      `}>
      <Container
        style={css`
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `}>
        <Text
          style={css`
            font-size: 16px;
            font-weight: 600;
            color: ${warn ? colors.red400 : 'black'};
          `}>
          {title}
        </Text>
        <Image style={{ width: 20, height: 20, opacity: 0.4 }} source={require('/assets/icons/right.png')} />
      </Container>
    </TouchableOpacity>
  );
}
