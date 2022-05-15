import React, { ReactNode } from 'react';
import Container from '@components/Container';
import { ImageURISource, StyleProp, Text, TouchableHighlight, ViewStyle } from 'react-native';
import styled, { css } from '@emotion/native';
import colors from '@constants/colors';

interface Props {
  uri: ImageURISource;
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

function IconText({ uri, children, onPress, style }: Props) {
  return (
    <TouchableHighlight
      style={[
        css`
          background-color: ${colors.white};
          border-radius: 12px;
          width: 100%;
          margin-top: 15px;
        `,
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        },
        style,
      ]}
      underlayColor={colors.grey100}
      onPress={onPress}>
      <Container
        style={css`
          width: 100%;
          flex-direction: row;
          align-items: center;
          background-color: transparent;
        `}>
        <Image source={uri} />
        <Text
          style={css`
            font-size: 16px;
            font-weight: 600;
          `}>
          {children}
        </Text>
      </Container>
    </TouchableHighlight>
  );
}

const Image = styled.Image`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export default IconText;
