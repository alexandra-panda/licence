import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {addPost} from './api/api';
var RNFS = require('react-native-fs');

export const handleLocationPermission = async () => {
  let permissionCheck = '';

  if (Platform.OS === 'android') {
    permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (permissionCheck === RESULTS.DENIED) {
      const permissionRequest = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      permissionCheck = 'granted';
      permissionRequest === RESULTS.GRANTED
        ? console.warn('Location permission granted.')
        : console.warn('Location perrmission denied.');
    }
  }
  return permissionCheck;
};

export function getUserLocation(callback) {
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      Geocoder.from({
        latitude: latitude,
        longitude: longitude,
      }).then(res => {
        const {
          formatted_address,
          place_id,
          geometry: {
            location: {lat, lng},
          },
        } = res.results[0];
        callback({
          formatted_address: formatted_address,
          latitude: latitude,
          longitude: longitude,
        });
      });
    },
    error => {
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
}

export function writeData(order) {
  addPost(order);
  // var path = RNFS.ExternalStorageDirectoryPath + '/requests.txt';
  // console.log('pat', path, JSON.stringify([order]));
  // var path1 = '/storage/emulated/0/requests.txt';
  // RNFS.readFile(path1, 'utf8')
  //   .then(r => {
  //     const parsed = JSON.parse(r);
  //     parsed.push(order);
  //     console.log('parsed', parsed);
  //     RNFS.writeFile(path1, JSON.stringify(parsed), 'utf8')
  //       .then(success => {
  //         console.log('FILE WRITTEN!', success);
  //       })
  //       .catch(err => {
  //         console.log(err.message);
  //       });
  //   })
  //   .catch(err => {
  //     console.log(err.message, err.code);
  //     RNFS.writeFile(path, JSON.stringify([order]), 'utf8')
  //       .then(success => {
  //         console.log('FILE WRITTEN!', success);
  //       })
  //       .catch(err => {
  //         console.log(err.message);
  //       });
  //   });
}
