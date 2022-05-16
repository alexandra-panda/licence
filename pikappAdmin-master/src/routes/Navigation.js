import React from 'react';
import {Image, Text, View} from 'react-native';
// Redux
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {persistor, store} from '~/redux/store';
// Navigator
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './auth/RegisterScreen';
import LoginScreen from './auth/LoginScreen';
import HomeScreen from './HomeScreen';

// ====Create Auth
const AuthStack = createStackNavigator();

function AuthStackScreen() {
  const isLogged = useSelector(state => state.AppStore.isLogged);
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      initialRouteName={isLogged ? 'HomeScreen' : 'LoginScreen'}>
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{gestureEnabled: false}}
      />
    </AuthStack.Navigator>
  );
}

const RootStackNav = createStackNavigator();
function RootStack() {
  return (
    <RootStackNav.Navigator screenOptions={{headerShown: false}}>
      <RootStackNav.Screen name="Root" component={AuthStackScreen} />
    </RootStackNav.Navigator>
  );
}

export default function Navigation() {
  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootStack />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </>
  );
}
