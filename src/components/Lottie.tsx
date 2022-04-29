import React, { useEffect, useState } from 'react';
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native';
import axios from 'axios';

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
  return <>{uri ? <LottieView {...props} source={uri} /> : <></>}</>;
}

export default Lottie;
