import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import MapView from 'react-native-maps';

import SelectedCard from './cards/SelectedCard';
import NoStops from './cards/NoStops';
import ShowStops from './cards/ShowStops';
import StopsList from './cards/StopsList';
import ZoomButton from './buttons/ZoomButton';

import {
  getStopsWithin,
} from './utils/Stops';
import {
  getDistance,
} from './utils/GetDistance';
import {
  getNextZoomLevel,
  getPrevZoomLevel,
  getInitialZoomLevel,
} from './utils/Zoom';
import {
  blue,
  red,
} from './utils/Colors';

// todo
// 3. 'list of stops' component that shows when there is no selected stop
// 4. top bar with app name and refresh button and then settings button
// 5. maybe integrate stop times

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
  },
  error: {
    position: 'absolute',
    width: '100%',
    height: 25,
    backgroundColor: red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'white',
  },
  actionsContainer: {
    position: 'absolute',
    right: 0,
  },
});

export default class Map extends Component {
  constructor() {
    super();

    this.state = {
      zoom: getInitialZoomLevel(),
      myLocation: {
        latitude: 0,
        longitude: 0,
      },
      region: {
        latitude: 39.0997,
        longitude: -94.5786,
      },
      stops: [],
      selected: null,
      loaded: false,
      showStops: false,
      error: false,
      errorMessage: null,
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onMarkerPress = this.onMarkerPress.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.toggleShowStops = this.toggleShowStops.bind(this);
    this.selectStop = this.selectStop.bind(this);
    this.closeList = this.closeList.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.incrementZoom = this.incrementZoom.bind(this);
    this.decrementZoom = this.decrementZoom.bind(this);
    this.showSelectedCallout = this.showSelectedCallout.bind(this);
    this.hideSelectedCallout = this.hideSelectedCallout.bind(this);
  }
  
  onRegionChangeComplete(region) {
    return; // might not need this

    this.setState((state) => {
      return {
        region,
        stops: getStopsWithin(
          state.region.latitude,
          state.region.longitude,
          state.zoom,
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
            state.zoom,
          ),
          loaded: true,
        };
      })
    }, (error) => {
      this.setState((state) => {
        return {
          loaded: true,
          error: true,
          errorMessage: error.message,
        };
      });
    });
  }

  incrementZoom() {
    this.setState((state) => {
      const nextZoom = getNextZoomLevel(state.zoom);

      return {
        zoom: nextZoom,
        stops: getStopsWithin(
          state.region.latitude,
          state.region.longitude,
          nextZoom,
        ),
      };
    });
  }

  decrementZoom() {
    this.setState((state) => {
      const nextZoom = getPrevZoomLevel(state.zoom);

      return {
        zoom: nextZoom,
        stops: getStopsWithin(
          state.region.latitude,
          state.region.longitude,
          nextZoom,
        ),
      };
    });
  }

  onPress(e) {
    const stop = getStopsWithin(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude,
      0
    )[0];

    if (this.marker) {
      this.hideSelectedCallout();
    }

    if (stop) {
      this.setState({ selected: stop });
    } else {
      this.setState({ selected: null });
    }
  }

  onMarkerPress(e) {
    if (Platform.OS === 'ios') {
      return;
    }
    this.onPress(e);
  }

  toggleShowStops() {
    this.setState((state) => {
      return {
        showStops: !state.showStops,
      };
    });
  }

  selectStop(lat, long, name) {
    const stop = getStopsWithin(
      lat,
      long,
      0
    )[0];

    // todo: show callout

    this.setState((state) => {
      return {
        showStops: false,
        selected: stop,
      };
    });
  }

  closeList() {
    this.setState((state) => {
      return {
        showStops: false,
      };
    });
  }

  renderCards() {
    if (!this.state.loaded) {
      return null;
    }

    if (this.state.showStops) {
      return (
        <StopsList
          stops={this.state.stops}
          myLocation={this.state.myLocation}
          closeList={this.closeList}
          selectStop={this.selectStop} />
      );
    }

    if (!this.state.selected && !this.state.stops.length) {
      return (
        <NoStops />
      );
    }

    if (this.state.selected) {
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

    if (this.state.stops.length) {
      return (
        <ShowStops onPress={this.toggleShowStops} count={this.state.stops.length} />
      );
    }
  }

  renderError() {
    if (this.state.error && this.state.errorMessage && this.state.errorMessage.length) {
      return (
        <View style={styles.error}>
          <Text style={styles.errorText}>{ this.state.errorMessage }</Text>
        </View>
      );
    }
    return null;
  }

  renderActions() {
    return (
      <View style={styles.actionsContainer}>
        <ZoomButton onPress={this.incrementZoom} text='+' />
        <ZoomButton onPress={this.decrementZoom} text='-' />
      </View>
    );
  }

  showSelectedCallout() {
    if (this.state.selected && this.marker) {
      this.marker.showCallout();
    }
  }

  hideSelectedCallout() {
    if (this.state.selected && this.marker) {
      this.marker.hideCallout();
    }
  }

  componentDidUpdate() {
    this.showSelectedCallout();
  }
  
  render() {
    const region = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      latitudeDelta: this.state.zoom,
      longitudeDelta: this.state.zoom,
    };

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          onPress={this.onPress}
          onMarkerPress={this.onMarkerPress}
          loadingEnabled
          zoomEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          pitchEnabled={false}
          moveOnMarkerPress={false}
          showsUserLocation>

        {this.state.stops.map(stop => {
          const coords = {
            latitude: stop.stop_lat,
            longitude: stop.stop_lon,
          };

          if (stop === this.state.selected) {
            return (
              <MapView.Marker
                key={stop.stop_id}
                coordinate={coords}
                pinColor={blue}
                ref={(marker) => { this.marker = marker }}
                title={stop.stop_name} />
            );
          }

          return (
            <MapView.Marker
              key={stop.stop_id}
              coordinate={coords}
              pinColor={red}
              title={stop.stop_name} />
          );
        })}
        </MapView>
        { this.renderActions() }
        <View style={styles.cards}>
          { this.renderCards() }
        </View>
        { this.renderError() }
      </View>
    );
  }
}
