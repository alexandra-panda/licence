import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {getUserLocation, handleLocationPermission} from '../utils';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/Feather';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {setLogged} from '../redux/Apps/AppStore';

const initialLocation = {
  latitude: 47.02575387685229,
  longitude: 28.830955282954115,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Home = ({navigation}) => {
  const [location, setLocation] = useState({
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [formatedAddress, setformatedAddress] = useState(
    'Loading your location',
  );
  const ref = useRef<MapView>(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.AppStore.user);

  const logOut = () => {
    dispatch(setLogged(false));
    navigation.replace('LoginScreen');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Text style={{paddingRight: 15}}>User: {user.email}</Text>
          <TouchableOpacity
            style={{alignItems: 'center', paddingRight: 15}}
            onPress={() => {
              dispatch(setLogged(false));
              navigation.replace('LoginScreen');
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'red',
                borderRadius: 15,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
              }}>
              <Text style={{color: 'white', paddingRight: 5}}>Log out</Text>
              <Icon name="log-out" size={15} color="black" />
            </View>
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    Geocoder.init('AIzaSyAsjvS2uULdH0XxXyM5EvOB0UbRAngx9RU', {
      language: 'en',
    });
    async function getPermission() {
      const location = await handleLocationPermission();
      console.log('>>', location);
      if (location == 'granted') {
        console.log('>>location granted');
        getUserLocation(callback => {
          console.log('>', callback, callback.latitude, callback.longitude);
          const {latitude, longitude, formatted_address} = callback;
          setLocation({latitude, longitude});
          setformatedAddress(formatted_address);
          ref.current.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            300,
          );
        });
      }
    }
    getPermission();
  }, [handleLocationPermission]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        testID="map"
        style={{flex: 1}}
        ref={ref}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialLocation}
        // onRegionChangeComplete={onRegionChange}
        showsUserLocation={true}
        // customMapStyle={customStyleMap}
        paddingAdjustmentBehavior="automatic"
        showsMyLocationButton={true}
        showsBuildings={true}
        maxZoomLevel={17.5}
        loadingIndicatorColor="#fcb103"
        loadingBackgroundColor="#242f3e"
        showsUserLocation={true}
      />
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 22,
          zIndex: 999,
          position: 'absolute',
          top: 100,
          color: 'black',
          textAlign: 'center',
          fontWeight: '600',
        }}>
        {formatedAddress}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('RequestScreen', {locationName: formatedAddress});
        }}
        style={{
          backgroundColor: 'yellow',
          width: 200,
          height: 40,
          position: 'absolute',
          bottom: 25,
          alignSelf: 'center',
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: 'black',
            paddingRight: 15,
          }}>
          Send Request
        </Text>
        <Icon name="chevron-right" size={30} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
