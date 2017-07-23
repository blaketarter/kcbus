import {
  Platform,
  StatusBar,
} from 'react-native';

const topBarHeight = (Platform.OS === 'ios') ? 44 : 48;
const iosStatusBarHeight = 20;

function statusBarHeight() {
  if (Platform.OS === 'ios') {
    return iosStatusBarHeight;
  }

  // return StatusBar.currentHeight;
  return 0;
}

export {
  topBarHeight,
  statusBarHeight,
  iosStatusBarHeight
}
