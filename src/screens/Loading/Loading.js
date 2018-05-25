import React from 'react';
import { Image, View } from 'react-native';
import { View as Motion } from 'react-native-animatable';

import { ASSET } from '../../config';
import styles from './Loading.style';

export default () => {
  return (
    <View style={[styles.container]}>
      <Motion animation="bounceIn" duration={1000}>
        <Image style={styles.brandname} source={ASSET.logo} />
      </Motion>
    </View>
  );
};
