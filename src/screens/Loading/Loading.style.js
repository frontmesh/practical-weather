import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FONT, UNIT } = THEME;

export default StyleSheet.create({
  brandname: {
    marginBottom: UNIT * 3.6,
    tintColor: COLOR.WHITE,
    height: FONT.SIZE.EXTRA_LARGE,
    resizeMode: 'contain',
  },
});
