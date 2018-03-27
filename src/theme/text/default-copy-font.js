import { Platform } from 'react-native';

const defaultCopyFont = {
  fontSize: Platform.OS === 'ios' ? 20 : 18,
  fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  lineHeight: 28,
};

export default defaultCopyFont;
