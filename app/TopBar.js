import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import {
  blue,
  darkBlue
} from './utils/Colors';
import {
  topBarHeight,
  iosStatusBarHeight,
} from './utils/Metrics';

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
  },
  statusBar: {
    height: (Platform.OS === 'ios') ? iosStatusBarHeight : 0,
    width: '100%',
    backgroundColor: (Platform.OS === 'ios') ? blue : darkBlue,
  },
  navBar: {
    height: topBarHeight,
    width: '100%',
    justifyContent: 'center',
    // alignItems: (Platform.OS === 'ios') ? 'center' : 'flex-start',
    alignItems: 'center',
    backgroundColor: blue,
  },
  text: {
    color: 'white',
  }
});

export default class TopBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          <Text style={styles.text}>{ ('KCMO Bus Stops').toUpperCase() }</Text>
        </View>
      </View>
    );
  }
}
