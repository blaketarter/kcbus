// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates-shows-wrong
// This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const rLat1 = toRad(lat1);
  const rLat2 = toRad(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  const d = R * c;

  return d;
}

// Converts numeric degrees to radians
function toRad(val) {
  return val * Math.PI / 180;
}

function getDistance(lat1, lon1, lat2, lon2) {
  let distance = getDistanceKm(lat1, lon1, lat2, lon2);

  return formatDistance(distance);
}

function formatDistance(distance) {
  const formattedDistance = fromKmtoMi(distance);

  if (formattedDistance < 0.5) {
    return nearest50(fromMitoFt(formattedDistance)) + ' ft';
  }

  return formattedDistance.toFixed(1) + ' mi';
}

function fromKmtoMi(km) {
  return km * 0.62137;
}

function fromMitoFt(mi) {
  return mi * 5280;
}

function nearest50(num) {
  return Math.ceil(num / 50) * 50;
}

function nearestPoint5(num) {
  return Math.ceil(num / 0.5) * 0.5;
}

export {
  getDistance,
  getDistanceKm,
  formatDistance,
};
