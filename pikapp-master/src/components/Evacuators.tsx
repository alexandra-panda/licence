import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

/**
 * {
    lat: 48.16254,
    lng: 28.2710783,
    gpsTime: '2022-03-04 08:16:04',
    speed: '0.00',
    dir: '279',
    u_nume: 'Dumitru',
    u_marca: 'Iveco Daily',
    u_nr: 'BAC 092',
    u_tel: '+37360911721',
    u_info: '2500',
  },
  {
    lat: 46.9494316,
    lng: 28.7733566,
    gpsTime: '2022-03-04 08:18:15',
    speed: '0.00',
    dir: '280',
    u_nume: 'Vasilii',
    u_marca: 'Ford Transit',
    u_nr: 'IDA 947',
    u_tel: '+37360411114',
    u_info: '2000',
  },
  {
    lat: 47.0659483,
    lng: 28.835405,
    gpsTime: '2022-03-04 08:17:45',
    speed: '0.00',
    dir: '0',
    u_nume: 'Alexandru',
    u_marca: 'Mercedes Sprinter',
    u_nr: 'NPL 218',
    u_tel: '+37360911107',
    u_info: '2200',
  },
  {
    lat: 47.0540833,
    lng: 28.8059416,
    gpsTime: '2022-03-04 08:16:29',
    speed: '0.00',
    dir: '247',
    u_nume: 'Sergent',
    u_marca: 'Mercedes Sprinter',
    u_nr: 'BAC 270',
    u_tel: '+37360911155',
    u_info: '3000',
  },
  {
    lat: 47.7894433,
    lng: 27.892235,
    gpsTime: '2022-03-04 08:16:32',
    speed: '0.00',
    dir: '54',
    u_nume: 'Denis',
    u_marca: 'Ford Transit',
    u_nr: 'XKX 858 ',
    u_tel: '+37360611113',
    u_info: '2000',
  },
 */
var markers = [
  'Evacuator Moldova',
  'Auto Club Asist',
  'AutoEvacuator',
  'EvacuatorChisinau',
  'Evacuator24',
  'Brat MD',
];

const Evacuators = ({onPres}) => {
  return (
    <View style={{padding: 30}}>
      <Text style={{fontSize: 22, color: 'black', paddingBottom: 16}}>
        Choose hauler from list :
      </Text>

      {markers.map(e => {
        return (
          <TouchableOpacity
            onPress={() => onPres(e)}
            key={e}
            style={{
              padding: 10,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: 'gray',
              margin: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="user-tie" size={20} color="black" />
              <View style={{paddingHorizontal: 10}}>
                <Text>{e}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Evacuators;

const styles = StyleSheet.create({});
