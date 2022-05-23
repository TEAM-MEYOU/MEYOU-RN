import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, ListRenderItemInfo, Text, View } from 'react-native';
import { ToJavaLocaleDate } from '@utils/date';
import { useFetchCoinLog, useFetchUser } from '@hooks/queries';
import { CoinGainHash, CoinLog, CoinLogHash } from '@apis/coin';
import styled, { css } from '@emotion/native';
import colors from '@constants/colors';

function CoinScreen() {
  const todayDate = new Date();
  const today = ToJavaLocaleDate(todayDate);
  const monthAgoDate = new Date();
  monthAgoDate.setMonth(monthAgoDate.getMonth() - 1);
  const monthAgo = ToJavaLocaleDate(monthAgoDate);
  const fetchUser = useFetchUser();
  const fetchCoinLog = useFetchCoinLog(fetchUser.data!.coupleId!, monthAgo, today);
  return (
    <SafeAreaView edges={['left', 'right']}>
      <FlatList
        data={fetchCoinLog.data}
        renderItem={({ item }: ListRenderItemInfo<CoinLog>) => <CoinItem coin={item} />}
        keyExtractor={item => String(item.id)}
      />
    </SafeAreaView>
  );
}

export default CoinScreen;

interface Props {
  coin: CoinLog;
}

const CoinItem = memo(({ coin }: Props) => {
  return (
    <View
      style={css`
        margin-bottom: 5px;
        padding: 10px;
        border-bottom-width: 1px;
        border-color: ${colors.grey200};
      `}>
      <Row>
        <SmallText>타입</SmallText>
        <BigText>{CoinLogHash[coin.coinLogType]}</BigText>
      </Row>
      <Row>
        <SmallText>사용/획득처</SmallText>
        <BigText>{CoinGainHash[coin.coinGainType]}</BigText>
      </Row>
      <Row>
        <SmallText>날짜</SmallText>
        <BigText>{new Date(coin.createdDate).toLocaleString()}</BigText>
      </Row>
      <View
        style={css`
          margin-left: auto;
          flex-direction: row;
          align-items: center;
        `}>
        <Image style={{ width: 20, height: 20, marginRight: 5 }} source={require('/assets/icons/coin.png')} />
        <Text
          style={css`
            font-weight: 500;
            font-size: 16px;
          `}>
          {coin.coinQuantity}
        </Text>
      </View>
    </View>
  );
});

const SmallText = styled.Text`
  letter-spacing: -0.5px;
  font-weight: 500;
  font-size: 15px;
  color: ${colors.grey500};
`;

const BigText = styled.Text`
  letter-spacing: -0.5px;
  font-weight: 500;
  font-size: 16px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
