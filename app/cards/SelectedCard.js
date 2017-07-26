import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  openLocation,
} from '../utils/OpenLocationOnMap';

import {
  blue,
  darkBlue
} from '../utils/Colors';

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 0,
    backgroundColor: blue,
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
    color: 'white',
    fontWeight: 'bold'
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  distance: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },
  top: {
    flexDirection: 'row',
    padding: 25,
  },
  bottom: {
    backgroundColor: darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
  }
});

export default class SelectedCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {/*<Image resizeMode='contain' style={styles.icon} source={require('./images/bus.png')} />*/}
          <Text style={styles.text}>{this.props.name}</Text>
        </View>
        <View style={styles.bottom}>
          <TouchableWithoutFeedback onPress={() => {
            openLocation(this.props.lat, this.props.long, this.props.name)
          }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{('Open In Maps').toUpperCase()}</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.distance}>{ this.props.distance }</Text>
        </View>
      </View>
    );
  }
}
