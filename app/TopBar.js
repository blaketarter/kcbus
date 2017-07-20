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
    // backgroundColor: darkBlue,
    backgroundColor: blue,
  },
  navBar: {
    height: 44,
    width: '100%',
    justifyContent: 'center',
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
