import React, { useEffect, useState } from 'react';
import styled, { css } from '@emotion/native';
import { Image, View } from 'react-native';
import colors from '@constants/colors';
import UserProfileImage from '@components/UserProfileImage';
import Container from '@components/Container';
import { Member } from '@apis/member';

interface Props {
  member: Member;
  value1?: number;
  value2?: number;
}

function CoupleBarChart({ member, value1 = 0, value2 = 0 }: Props) {
  const [whoIsWin, setWhoisWin] = useState(true);

  useEffect(() => {
    setWhoisWin(value1 >= value2);
  }, [value1, value2]);
  return (
    <Container
      style={css`
        flex: 1;
        margin-top: 10px;
      `}>
      <View
        style={css`
          flex: 1;
          flex-direction: row;
          justify-content: space-around;
        `}>
        <View
          style={css`
            flex-direction: column-reverse;
            max-height: 100%;
            overflow: hidden;
            margin-top: auto;
            align-items: center;
          `}>
          <View
            style={css`
              height: 100px;
              align-items: center;
            `}>
            {whoIsWin && <Image style={{ width: 30, height: 30 }} source={require('/assets/icons/win.png')} />}
            <UserProfileImage
              url={member.imageUrl}
              style={{ width: 70, height: 70, borderWidth: 2, borderColor: colors.red300, marginTop: 'auto' }}
            />
          </View>
          <GraphText>{value1}</GraphText>
          <Graph value={value1 * 11 + 'px'} color={colors.red300} />
        </View>
        <View
          style={css`
            flex-direction: column-reverse;
            max-height: 100%;
            overflow: hidden;
            margin-top: auto;
            align-items: center;
          `}>
          <View
            style={css`
              height: 100px;
              align-items: center;
            `}>
            {whoIsWin || <Image style={{ width: 30, height: 30 }} source={require('/assets/icons/win.png')} />}
            <UserProfileImage
              url={member.coupleInfo?.imageUrl}
              style={{ width: 70, height: 70, borderWidth: 2, borderColor: colors.blue300, marginTop: 'auto' }}
            />
          </View>
          <GraphText>{value2}</GraphText>
          <Graph value={value2 * 11 + 'px'} color={colors.blue300} />
        </View>
      </View>
    </Container>
  );
}

const GraphText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const Graph = styled.View<{ value: string; color: string }>`
  width: 12px;
  height: ${props => props.value};
  background-color: ${props => props.color};
`;

export default CoupleBarChart;
