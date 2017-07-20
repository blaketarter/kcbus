import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';
import StopCard from './StopCard';

const styles = StyleSheet.create({
  container: {
    paddingTop: '90%',
  },
});

export default class StopsList extends Component {
  constructor() {
    super();

    this.renderCard = this.renderCard.bind(this);
  }

  renderCard(item) {
    console.log(item);
    return (<StopCard name={item.stop_name} lat={item.stop_lat} long={item.stop_lon} />);
  }

  render() {
    console.log('here');
    console.log(this.props.stops);

    return (
      <FlatList
        style={styles.container}  
        data={this.props.stops}
        renderItem={this.renderCard} />
    );
  }
}
