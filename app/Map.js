import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import SelectedCard from './SelectedCard';
import {
  getStopsWithin,
} from './utils/Stops';
import {
  getDistance,
} from './utils/GetDistance';

// todo
// 1. 'selected stop' component
// 2. when user clicks on map that isnt a stop deselect a stop
// 3. 'list of stops' component that shows when there is no selected stop
// 4. top bar with app name and refresh button and then settings button

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  map: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  cards: {
    zIndex: 5,
    flex: 1,
    alignSelf: 'flex-end'
  }
});

export default class Map extends Component {
  constructor() {
    super();

    this.state = {
      myLocation: {
        latitude: 0,
        longitude: 0,
      },
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
    this.onPress = this.onPress.bind(this);
    this.renderCards = this.renderCards.bind(this);
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
          myLocation: {
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

  onPress(e) {
    const stop = getStopsWithin(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
      0
    )[0];
    
    if (stop) {
      this.setState({ selected: stop });
    } else {
      this.setState({ selected: null });
    }
  }

  renderCards() {
    if (this.state.selected) {
      console.log(this.state.selected);
      return (
        <SelectedCard
          name={this.state.selected.stop_name}
          lat={this.state.selected.stop_lat}
          long={this.state.selected.stop_lon}
          distance={getDistance(
            this.state.selected.stop_lat, this.state.selected.stop_lon,
            this.state.myLocation.latitude, this.state.myLocation.longitude,
          )}
        />
      );
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
        region={this.state.region}
        onRegionChangeComplete={this.onRegionChangeComplete}
        onPress={this.onPress}  
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
        <View style={styles.cards}>
          { this.renderCards() }
        </View>
      </View>
    );
  }
}
