import stops from '../data/stops.json';

function within(num, targetMin, targetMax) {
  return (num >= targetMin && num <= targetMax);
}

function getStopsWithin(lat, long, delta) {
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
