import React, { Component } from 'react';
import { View, StyleSheet, Metrics } from 'react-native';
import Map from './Map';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default class KCBus extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Map />
      </View>
    );
  }
}
