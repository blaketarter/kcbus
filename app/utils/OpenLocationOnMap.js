import { Platform, Linking } from 'react-native';

function openLocation(lat, long, name) {
  let url;

  if (Platform.OS === 'ios') {
    url = `http://maps.apple.com/?ll=${lat},${long}&q=${encodeURIComponent(name)}`;
  } else {
    url = `geo:${lat},${long}?q=${encodeURIComponent(name)}`;
  }

  Linking.openURL(url).catch(err => console.error('An error occurred', err));
}

export {
  openLocation,
}
