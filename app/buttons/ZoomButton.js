import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';

import {
  blue,
  darkBlue
} from '../utils/Colors';

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 50,
    backgroundColor: 'white',
    height: 35,
    width: 35,
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
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>{ this.props.text }</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
