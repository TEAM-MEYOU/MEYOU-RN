import React from 'react';
import { Image, ImageStyle, ImageURISource, StyleProp, TouchableOpacity } from 'react-native';

interface Props {
  uri: ImageURISource;
  opacity?: number;
  onPress: () => void;
  style?: StyleProp<ImageStyle>;
}

function ImageButton({ uri, opacity, onPress, style }: Props) {
  return (
    <TouchableOpacity activeOpacity={opacity} onPress={onPress}>
      <Image style={style} source={uri} />
    </TouchableOpacity>
  );
}

export default ImageButton;
