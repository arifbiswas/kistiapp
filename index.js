/**
 * @format
 */
import Realm from 'realm';
Realm.flags.THROW_ON_GLOBAL_REALM = true;
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppWrapper from './src/realm/realm';

AppRegistry.registerComponent(appName, () => AppWrapper);
