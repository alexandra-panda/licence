import {
  Image,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAw from 'react-native-vector-icons/FontAwesome';

import React, {useEffect, useState} from 'react';
import TextInputView from '../components/TextInputView';
import Spacer from '../components/Spacer';
import ModalView from '../components/ModalView';
import Evacuators from '../components/Evacuators';
import FinishView from '../components/FinishView';
import {writeData} from '../utils';
import {PERMISSIONS, request} from 'react-native-permissions';
import {addPost} from '~/api/api';

const RequestScreen = ({navigation, route}) => {
  const [isVisible, setisVisible] = useState(false);
  const [info, setInfo] = useState({carModel: '', description: '', phone: ''});
  const [hauler, setHauler] = useState('');

  const err = Object.values(info).includes('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', padding: 16}}>
      <View style={{width: '100%', height: 100}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="caret-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
          Request Details
        </Text>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'gray',
            marginTop: 5,
            opacity: 0.3,
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <TextInputView
          placeholder="Enter your car model"
          icon={'car-sport-outline'}
          onChange={txt => {
            setInfo({...info, carModel: txt});
          }}
        />
        <Spacer />
        <TextInputView
          placeholder="Describe your problem"
          icon={'information-circle-outline'}
          multiline
          onChange={txt => {
            setInfo({...info, description: txt});
          }}
        />
        <Spacer />
        <TextInputView
          placeholder="Enter your phone"
          icon={'call-outline'}
          keyboardType={'phone-pad'}
          onChange={txt => {
            setInfo({...info, phone: txt});
          }}
        />
        {err && (
          <Text style={{color: 'red', padding: 10, paddingVertical: 15}}>
            Complete all fields
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (!err) {
            setisVisible(!isVisible);
          }
        }}>
        <Text style={styles.txt}>Send Request</Text>
        <IconAw name="send-o" size={20} color="black" />
      </TouchableOpacity>

      <ModalView
        isVisible={isVisible}
        bgColor={'white'}
        onClose={() => setisVisible(false)}>
        {hauler ? (
          <FinishView
            onPress={() => {
              setisVisible(!isVisible);
              setTimeout(() => {
                navigation.goBack();
              }, 500);
            }}
          />
        ) : (
          <Evacuators
            onPres={e => {
              let order = {
                carModel: info.carModel,
                description: info.description,
                phone: info.phone,
                location: {name: route.params.locationName},
                company: e,
              };

              // writeData(order);
              addPost(order).then(r => {
                if (r.status == 200) {
                  setHauler(e);
                }
              });
            }}
          />
        )}
      </ModalView>
    </SafeAreaView>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  txt: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    paddingRight: 15,
  },
  btn: {
    backgroundColor: 'yellow',
    width: 250,
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
  },
});
