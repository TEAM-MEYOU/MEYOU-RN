import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import { useState } from 'react';

interface Props {
  url: string | undefined;
  style: StyleProp<ImageStyle>;
}

function UserProfileImage({ url, style }: Props) {
  const [source, setSource] = useState<ImageSourcePropType>(() => {
    if (url === '/icons/user.jpeg') {
      return require('/assets/icons/user.jpeg');
    } else {
      return { uri: url };
    }
  });
  return <Image style={[{ borderRadius: 50, resizeMode: 'cover' }, style]} source={source} />;
}

export default UserProfileImage;
