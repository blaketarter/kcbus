import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import {
  getStopsWithin,
} from './utils/Stops';

const styles = StyleSheet.create({
  map: {
    height: '100%',
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
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.onMarkerPress = this.onMarkerPress.bind(this);
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
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

    // console.log(stop);
  }
  
  render() {
    const stops = getStopsWithin(
      this.state.region.latitude,
      this.state.region.longitude,
      this.state.region.latitudeDelta
    );
    
    return (
      <MapView
        style={styles.map}
        region={this.state.region}
        onRegionChangeComplete={this.onRegionChangeComplete}
        onMarkerPress={this.onMarkerPress}
        showsUserLocation>

        {stops.map(stop => {
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
    );
  }
}
