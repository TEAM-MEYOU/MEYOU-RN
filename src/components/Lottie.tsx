import React, { useEffect, useState } from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';
import axios from 'axios';
import { View } from 'react-native';
import { css } from '@emotion/native';

interface CustomLottieViewProps extends AnimatedLottieViewProps {
  uri: string;
}

type Props = Omit<CustomLottieViewProps, 'source'>;

function Lottie(props: Props) {
  const [uri, setUri] = useState('');

  useEffect(() => {
    axios.get(props.uri).then(response => {
      setUri(response.data);
    });
  }, [props.uri]);
  return (
    <View
      style={css`
        width: 100%;
        align-items: center;
      `}>
      {uri ? <LottieView {...props} source={uri} /> : <></>}
    </View>
  );
}

export default Lottie;
