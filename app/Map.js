import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import {
  getStopsWithin,
} from './utils/Stops';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default class Map extends Component {
  constructor() {
    super();

    this.state = {
      region: {
        latitude: 39.0997,
        longitude: -94.5786,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      stops: [],
      selected: null,
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.onMarkerPress = this.onMarkerPress.bind(this);
  }

  onRegionChangeComplete(region) {
    this.setState((state) => {
      return {
        region,
        stops: getStopsWithin(
          state.region.latitude,
          state.region.longitude,
          state.region.latitudeDelta
        ),
      };
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((data) => {
      this.setState((state) => {
        return {
          region: {
            ...state.region,
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          },
          stops: getStopsWithin(
            state.region.latitude,
            state.region.longitude,
            state.region.latitudeDelta
          ),
        };
      })
    }, (error) => {
      console.log(error);
    });
  }

  onMarkerPress(e) {
    const stop = getStopsWithin(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
      0
    )[0];

    this.setState({ selected: stop });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
        region={this.state.region}
        onRegionChangeComplete={this.onRegionChangeComplete}
        onMarkerPress={this.onMarkerPress}
        showsUserLocation>

        {this.state.stops.map(stop => {
          const coords = {
            latitude: stop.stop_lat,
            longitude: stop.stop_lon,
          };

          return (
            <MapView.Marker
              key={stop.stop_id}
              coordinate={coords}
              title={stop.stop_name} />
          );
        })}
        </MapView>
        {(this.state.selected) ? <Text>{this.state.selected.stop_name}</Text> : null}
      </View>
    );
  }
}
