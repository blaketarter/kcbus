import stops from '../data/stops.json';
import { levels } from './Zoom';

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

function getZoomLevelWithStop(lat, long) {
  let zoomLevel = null;
  let foundStops = [];

  for (let level of levels) {
    let stopsWithin = getStopsWithin(lat, long, level);

    if (stopsWithin.length) {
      zoomLevel = level;
      foundStops = stopsWithin;
      break;
    }
  }

  if (!zoomLevel) {
    zoomLevel = getInitialZoomLevel();
  }

  return { zoomLevel, foundStops };
}

export {
  getStopsWithin,
  getZoomLevelWithStop,
}
