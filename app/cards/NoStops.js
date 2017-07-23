import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
    shadowOpacity: 0.25,
    padding: 25,
  },
  text: {
    fontSize: 18,
    color: '#666666',
    fontWeight: 'bold'
  },
});

export default class NoStops extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sorry, there doesn't seem to be any bus stops near you. :(</Text>
      </View>
    );
  }
}
