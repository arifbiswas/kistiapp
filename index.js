/**
 * @format
 */
import Realm from 'realm';
import 'react-native-get-random-values';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'BSON: For React Native please polyfill crypto.getRandomValues, e.g. using: https://www.npmjs.com/package/react-native-get-random-values',
]);

Realm.flags.THROW_ON_GLOBAL_REALM = true;
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppWrapper from './src/realm/realm';

AppRegistry.registerComponent(appName, () => AppWrapper);
