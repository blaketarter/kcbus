import stops from '../data/stops.json';

function within(num, targetMin, targetMax) {
  return (num >= targetMin && num <= targetMax);
}

function getStopsWithin(lat, long, delta) {
  // console.log(lat, long, delta);
  // console.log(stops[0].stop_lat, stops[0].stop_lon);

  // console.log(
  //   within(stops[0].stop_lat, lat - delta, lat + delta) &&
  //   within(stops[0].stop_lon, long - delta, long + delta)
  // );

  return stops.filter((stop) => {
    return (
      within(stop.stop_lat, lat - (delta / 2), lat + (delta / 2)) &&
      within(stop.stop_lon, long - (delta / 2), long + (delta / 2))
    );
  });
};

export {
  getStopsWithin,
}
