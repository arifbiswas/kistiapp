import React, {useEffect} from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Routes from '../routes/Routes';
import {Balance, Installments, Loaner, Totals} from './modals/modals';
import SplashScreen from 'react-native-splash-screen';

// Loaner Modal

// Create a configuration object
const realmConfig: Realm.Configuration = {
  schema: [Loaner, Balance, Installments, Totals],
};

// Create a realm context
export const {RealmProvider, useObject, useQuery, useRealm} =
  createRealmContext(realmConfig);

// Expose a realm
function AppWrapper() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <RealmProvider>
      <Routes />
    </RealmProvider>
  );
}

export default AppWrapper;
