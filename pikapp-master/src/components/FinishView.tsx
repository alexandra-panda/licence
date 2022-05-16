import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const FinishView = ({onPress}) => {
  return (
    <View
      style={{
        width: 350,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <Text style={{fontWeight: '600', fontSize: 22}}>Success !!!</Text>
      <Icon name="ios-checkmark-done-circle-outline" size={60} color="black" />
      <Text style={{fontSize: 18, padding: 15}}>Your request was sended</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          backgroundColor: 'yellow',
          width: 180,
          height: 45,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'black',

            fontWeight: '600',
          }}>
          Go Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinishView;

const styles = StyleSheet.create({});
