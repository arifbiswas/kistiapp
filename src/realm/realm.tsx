import React from 'react';
import Realm, {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';
import Routes from '../routes/Routes';

// Define your object model
class Loaners extends Realm.Object<Loaners> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  fatherName!: string;
  motherName!: string;
  address!: string;
  mobile!: number;
  nid!: number;
  loanAmount!: number;
  profit!: number;
  extraCharge!: number;
  referName!: string;
  referAddress!: string;
  referMobile!: number;

  static schema: ObjectSchema = {
    name: 'Loaner',
    properties: {
      _id: 'objectId',
      name: 'string',
      fatherName: 'string',
      motherName: 'string',
      address: 'string',
      mobile: 'int',
      nid: 'int',
      loanAmount: 'int',
      profit: 'int',
      extraCharge: 'int',
      referName: 'string',
      referAddress: 'string',
      referMobile: 'int',
    },
    primaryKey: '_id',
  };
}

// Create a configuration object
const realmConfig: Realm.Configuration = {
  schema: [Loaners],
};

// Create a realm context
export const realmContext = createRealmContext(realmConfig);

// Expose a realm
function AppWrapper() {
  return (
    <realmContext.RealmProvider>
      <Routes />
    </realmContext.RealmProvider>
  );
}

export default AppWrapper;
