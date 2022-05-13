import React from 'react';
import Container from '@components/Container';
import { Image, Text, View } from 'react-native';
import { css } from '@emotion/native';
import { useFetchCouple, useFetchUser } from '@hooks/queries';
import colors from '@constants/colors';
import UserProfileImage from '@components/UserProfileImage';
import { ConvertMeYouDateString, DiffCoupleTime } from '@utils/date';

function CoupleInfo() {
  const fetchUser = useFetchUser();
  const fetchCouple = useFetchCouple(fetchUser.data?.coupleId);
  return (
    <Container>
      <View
        style={css`
          flex-direction: row;
          justify-content: space-between;
        `}>
        <View
          style={css`
            align-items: center;
          `}>
          <UserProfileImage url={fetchUser.data?.imageUrl} style={{ width: 50, height: 50 }} />
          <Text
            style={css`
              margin-top: 5px;
              font-weight: 600;
            `}>
            {fetchUser.data?.nickname}
          </Text>
        </View>
        <View
          style={css`
            align-items: center;
          `}>
          {fetchCouple.data?.coupleStart && (
            <>
              <Text
                style={css`
                  font-weight: 500;
                  font-size: 18px;
                `}>
                {ConvertMeYouDateString(new Date(fetchCouple.data.coupleStart))} ~
              </Text>
              <Text
                style={css`
                  font-size: 18px;
                  color: ${colors.content300};
                  font-weight: 600;
                  margin-top: 5px;
                `}>
                D+ {DiffCoupleTime(new Date(fetchCouple.data.coupleStart))}
              </Text>
            </>
          )}
          <Text
            style={css`
              font-size: 16px;
              letter-spacing: -0.5px;
              color: ${colors.content100};
              font-weight: 600;
              margin-top: 5px;
            `}>
            오늘의 감정을 남겨보세요!
          </Text>
        </View>
        <View
          style={css`
            align-items: center;
          `}>
          <UserProfileImage url={fetchUser.data?.coupleInfo?.imageUrl} style={{ width: 50, height: 50 }} />
          <Text
            style={css`
              margin-top: 5px;
              font-weight: 600;
            `}>
            {fetchUser.data?.coupleInfo?.nickname}
          </Text>
        </View>
      </View>
      <View
        style={css`
          flex-direction: row;
          align-items: center;
          margin-top: 15px;
          margin-left: auto;
        `}>
        <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require('/assets/icons/coin.png')} />
        <Text
          style={css`
            font-weight: 600;
          `}>
          {fetchCouple.data?.coin}
        </Text>
      </View>
    </Container>
  );
}

export default CoupleInfo;
