import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import RequestScreen from '../screens/RequestScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import {persistor, store} from '../redux/store';
import {PersistGate} from 'redux-persist/es/integration/react';
import RegisterScreen from './auth/RegisterScreen';
import LoginScreen from './auth/LoginScreen';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

// ====Create Auth
const AuthStack = createStackNavigator();

function AuthStackScreen() {
  const isLogged = useSelector(state => state.AppStore.isLogged);
  return (
    <AuthStack.Navigator
      screenOptions={{gestureEnabled: false}}
      initialRouteName={isLogged ? 'Home' : 'LoginScreen'}>
      <AuthStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Pik App',
        }}
      />
      <AuthStack.Screen
        name="RequestScreen"
        component={RequestScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

const RootStackNav = createStackNavigator();
function RootStack() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RootStackNav.Navigator screenOptions={{headerShown: false}}>
      <RootStackNav.Screen name="Root" component={AuthStackScreen} />
    </RootStackNav.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootStack />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};
export default AppNavigator;
