import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const COLORS = {
  primary: '#FFFFFF',
  second: '#9BCEE3',
  third: '#7FDDE7',
  four: '#74EBD9',
};

export const SIZES = {
  width,
  height,
};

const appTheme = {COLORS, SIZES};

export default appTheme;
