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

const styles = StyleSheet.create({
  container: {
  },
  statusBar: {
    height: (Platform.OS === 'ios') ? 20 : 0,
    width: '100%',
    backgroundColor: (Platform.OS === 'ios') ? blue : darkBlue,
  },
  navBar: {
    height: (Platform.OS === 'ios') ? 44 : 48,
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
