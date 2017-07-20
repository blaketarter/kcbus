import React, { Component } from 'react';
import { View, StyleSheet, Metrics } from 'react-native';
import Map from './Map';
import TopBar from './TopBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class KCBus extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopBar />
        <Map />
      </View>
    );
  }
}
