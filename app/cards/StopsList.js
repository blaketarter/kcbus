import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import StopCard from './StopCard';
import {
  getDistanceKm,
  formatDistance,
} from '../utils/GetDistance';

// todo: header component is a click to close with x icon
// todo: maybe use onRefresh to close the list
// if > 100 stops  just say 99+ and cut to closest 99/100 stops to render


const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  close: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#C0C0C0',
    borderBottomWidth: 1,
  }
});

export default class StopsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stops: props.stops
        .map((stop) => {
          return {
            ...stop,
            stop_distance: getDistanceKm(
              stop.stop_lat, stop.stop_lon,
              props.myLocation.latitude, props.myLocation.longitude,
            ),
          }
        }).sort((a, b) => a.stop_distance - b.stop_distance),
    };

    this.renderCard = this.renderCard.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  renderCard({ item }) {
    return (
      <StopCard
        name={item.stop_name}
        lat={item.stop_lat}
        long={item.stop_lon}
        selectStop={this.props.selectStop}
        distance={formatDistance(item.stop_distance)}
      />
    );
  }

  renderHeader() {
    return (
      <TouchableWithoutFeedback onPress={this.props.closeList}>
        <View style={styles.close}>
          <Text>Close</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  keyExtractor(item) {
    return item.stop_id;
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.stops}
        keyExtractor={this.keyExtractor}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderCard} />
    );
  }
}
