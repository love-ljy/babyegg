// components/LottieAnimation.tsx

import React from 'react';
import Lottie from 'react-lottie';

interface LottieAnimationProps {
  height?: number;
  width?: number;
  anmitJson?: any;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ height = 250, width = 250,anmitJson }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: anmitJson,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LottieAnimation;
