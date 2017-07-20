import React, { Component } from 'react';
import { View, StyleSheet, Metrics, StatusBar } from 'react-native';
import Map from './Map';
import TopBar from './TopBar';
import { blue } from './utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class KCBus extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={blue}
          barStyle="light-content" />
        <TopBar />
        <Map />
      </View>
    );
  }
}
