import React from 'react';
import Realm, {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';
import Routes from '../routes/Routes';

// Loaner Modal
class Loaner extends Realm.Object<Loaner> {
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

  day!: number;
  month!: number;
  year!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static schema: ObjectSchema = {
    name: 'Loaner',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      name: 'string',
      fatherName: 'string',
      motherName: 'string',
      address: 'string',
      mobile: 'int',
      nid: 'int',
      loanAmount: 'int',
      profit: 'int',
      extraCharge: 'int',
      loanLead: 'int',
      referName: 'string',
      referAddress: 'string',
      referMobile: 'int',
      loss: 'bool',
      day: 'int',
      month: 'int',
      year: 'int',
      createdAt: 'date',
      updatedAt: 'date',
    },
    primaryKey: '_id',
  };
}
// Blance Modal
class Balance extends Realm.Object<Balance> {
  _id!: Realm.BSON.ObjectId;
  balance!: number;
  day!: number;
  month!: number;
  year!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static schema: ObjectSchema = {
    name: 'Balance',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      balance: 'int',
      day: 'int',
      month: 'int',
      year: 'int',
      createdAt: {
        type: 'date',
        default: () => new Date(),
      },
      updatedAt: {
        type: 'date',
        default: () => new Date(),
      },
    },
    primaryKey: '_id',
  };
}
// Blance Modal
class Totals extends Realm.Object<Totals> {
  _id!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'Totals',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      totalAmount: {
        type: 'int',
        default: () => 0,
      },
      totalBalance: {
        type: 'int',
        default: () => 0,
      },
      totalLoan: {
        type: 'int',
        default: () => 0,
      },
      totalLoaner: {
        type: 'int',
        default: () => 0,
      },
      totalProfit: {
        type: 'int',
        default: () => 0,
      },
      totalLoss: {
        type: 'int',
        default: () => 0,
      },
      totalExtraCharge: {
        type: 'int',
        default: () => 0,
      },
      totalComes: {
        type: 'int',
        default: () => 0,
      },
    },
    primaryKey: '_id',
  };
}

// Create a configuration object
const realmConfig: Realm.Configuration = {
  schema: [Loaner, Balance, Totals],
};

// Create a realm context
export const {RealmProvider, useObject, useQuery, useRealm} =
  createRealmContext(realmConfig);

// Expose a realm
function AppWrapper() {
  return (
    <RealmProvider>
      <Routes />
    </RealmProvider>
  );
}

export default AppWrapper;
