/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {typography} from './src/utils/typography';

if (!__DEV__) {
  console.log = () => {};
}

typography();

AppRegistry.registerComponent(appName, () => App);
