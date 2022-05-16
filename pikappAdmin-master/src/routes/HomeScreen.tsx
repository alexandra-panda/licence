import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import { getPosts } from '~/api/api';
import AnimationView from '~/components/homeComponents/AnimationView';
import ChartView from '~/components/homeComponents/ChartView';
import {setLogged} from '~/redux/Apps/AppStore';
var RNFS = require('react-native-fs');

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
   
    getPosts().then(r=>{
      if (r.status == 200){
        let filtered = []
        r.values.map(e=>{
          if (e.company === 'Evacuator Moldova')
        filtered.push(e)
        })
        setOrders(filtered)
      }else{
        Alert.alert('Err','Orders cannot be loaded')
      }
    })
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          Account >>> {'Evacuator Moldova <<<<<'} 
        </Text>
        <Text style={{fontSize: 25, color: 'black', paddingVertical: 16}}>
          Requests:
        </Text>
{orders.length == 0 && <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
  <Text style={{fontSize:24, fontWeight:'bold'}}>You dont have requests yet !!!</Text>
  </View>}
        <View style={{flex: 1, padding:10}}>
          <ScrollView>

 
          {orders.map(e => {
            return (
              <View
                key={e.phone}
                style={{
                  padding: 16,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: 'gray',
                  justifyContent: 'space-around',
                  margin:5
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Car Model:{' '}
                  </Text>
                  <Text style={{fontSize: 18}}>{e.carModel}</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Problem:{' '}
                  </Text>
                  <Text style={{fontSize: 18}}>{e.description}</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Phone:{' '}
                  </Text>
                  <Text style={{fontSize: 18}}>{e.phone}</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Location:{' '}
                  </Text>
                  <Text numberOfLines={3} style={{fontSize: 14,width:200}}>{e.location.name}</Text>
                </View>
              </View>
            );
          })}
           </ScrollView>
        </View>

        <TouchableOpacity
          onPress={() => {
            dispatch(setLogged(false));
            navigation.replace('LoginScreen');
          }}
          style={{
            width: 200,
            height: 45,
            backgroundColor: 'yellow',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
