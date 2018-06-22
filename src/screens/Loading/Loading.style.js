import { StyleSheet } from 'react-native';
import { THEME } from '../../config';

const { COLOR, FONT, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  brandname: {
    marginBottom: UNIT * 3.6,
    height: 100,
    resizeMode: 'contain',
  },
});
