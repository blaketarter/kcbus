import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  blue,
  darkBlue
} from '../utils/Colors';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 50,
    margin: 5,
  },
  container: {
    borderRadius: 50,
    backgroundColor: 'white',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.25,
  },
  text: {
    color: blue,
  }
});

export default class ZoomButton extends Component {
  render() {
    return (
      <View style={styles.touchable}>
        <Touchable
          background={Platform.OS === 'ios' ? null : TouchableNativeFeedback.Ripple(blue, true)}
          onPress={this.props.onPress}>
          <View style={styles.container}>
            <Text style={styles.text}>{ this.props.text }</Text>
          </View>
        </Touchable>
      </View>
    );
  }
}
