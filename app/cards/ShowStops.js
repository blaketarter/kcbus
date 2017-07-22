import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 0,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    padding: 25,
  },
  text: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

export default class ShowStops extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>{(`List ${ this.props.count } bus stops near me`).toUpperCase()}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
