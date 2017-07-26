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
import {
  blue,
} from '../utils/Colors';

// todo: header component is a click to close with x icon
// todo: maybe use onRefresh to close the list
// if > 100 stops  just say 99+ and cut to closest 99/100 stops to render


const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F4F4F4',
  },
  close: {
    padding: 25,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
    // borderColor: '#C0C0C0',
    // borderBottomWidth: 1,
  },
  closeIcon: {
    fontSize: 22,
    color: blue,
  },
  closeText: {
    color: blue,
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
          {/* <Text style={styles.closeIcon}>&times;</Text> */}
           <Text style={styles.closeText}>CLOSE</Text> 
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
        removeClippedSubviews
        data={this.state.stops}
        keyExtractor={this.keyExtractor}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderCard} />
    );
  }
}
