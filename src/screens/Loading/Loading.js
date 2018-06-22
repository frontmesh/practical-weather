import React from 'react';
import { Image, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';
import { LinearGradient } from 'expo';

import { ASSET, THEME, STYLE } from '../../config';
import styles from './Loading.style';

export default () => {
  return (
    <LinearGradient colors={THEME.GRADIENT} style={STYLE.SCREEN}>
      <View style={[styles.container]}>
        <Motion  animation="pulse" easing="ease-in-out" iterationCount="infinite">
          <Image style={styles.brandname} source={ASSET.logo} />
        </Motion>
      </View>
    </LinearGradient>
  );
};
