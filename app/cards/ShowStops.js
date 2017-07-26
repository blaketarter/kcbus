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
  blue
} from '../utils/Colors';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

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
  },
  text: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold'
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: blue,
    fontSize: 16,
    alignSelf: 'center',
  },
  top: {
    flexDirection: 'row',
    padding: 25,
    paddingBottom: 0,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
  }
});

export default class ShowStops extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.text}>{(`${this.props.count} bus stops near you`).toUpperCase()}</Text>
        </View>
        <View style={styles.bottom}>
          <Touchable onPress={this.props.showStops}>
            <View>
              <Text style={styles.buttonText}>{('View all stops near you').toUpperCase()}</Text>
            </View>
          </Touchable>
          <Touchable onPress={this.props.refresh}>
            <View>
              <Text style={styles.buttonText}>{('Refresh').toUpperCase()}</Text>
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}
