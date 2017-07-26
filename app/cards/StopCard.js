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
    marginBottom: 0,
    backgroundColor: 'white',
    // borderColor: '#C0C0C0',
    // borderBottomWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    margin: 10,
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 5,
    paddingTop: 5,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: blue,
    fontSize: 14,
    alignSelf: 'center',
  },
  distance: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'black',
  },
  top: {
    flexDirection: 'row',
    padding: 25,
    paddingBottom: 0,
  },
  bottom: {
    // backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
  }
});

export default class StopCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {/*<Image resizeMode='contain' style={styles.icon} source={require('./images/bus.png')} />*/}
          <Text style={styles.text}>{this.props.name}</Text>
        </View>
        <View style={styles.bottom}>
          <TouchableWithoutFeedback onPress={() => {
            this.props.selectStop(this.props.lat, this.props.long, this.props.name)
          }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{('Show On Map').toUpperCase()}</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.distance}>{ this.props.distance }</Text>
        </View>
      </View>
    );
  }
}
