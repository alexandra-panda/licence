/**
 * @format
 */
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/routes/AppNavigator';
import AppNavigator from './src/routes/AppNavigator';


AppRegistry.registerComponent(appName, () => App);
