import React from 'react';
import Realm, {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';
import Routes from '../routes/Routes';

// Loaner Modal
class Loaner extends Realm.Object<Loaner> {
  _id!: Realm.BSON.ObjectId | string;
  name!: string;
  fatherName!: string;
  motherName!: string;
  address!: string;
  mobile!: number;
  nid!: number;
  loanAmount!: number;
  profit!: number;
  totalComes!: number;
  extraCharge!: number;
  referName!: string;
  referAddress!: string;
  referMobile!: number;

  static schema: ObjectSchema = {
    name: 'Loaner',
    embedded: false,
    asymmetric: false,
    properties: {
      _id: {
        type: 'objectId' || 'string',
        default: () => new Realm.BSON.ObjectId(),
      },
      name: 'string',
      fatherName: 'string',
      motherName: 'string',
      address: 'string',
      mobile: 'int',
      nid: 'int',
      loanAmount: 'int',
      profit: 'int',
      totalInstallment: 'int',
      extraCharge: 'int',
      loanLead: 'int',
      referName: 'string',
      referAddress: 'string',
      referMobile: 'int',
      isLoss: 'mixed',
      day: {
        type: 'int',
        default: () => Number(new Date().toLocaleDateString().split('/')[1]),
      },
      month: {
        type: 'int',
        default: () => Number(new Date().toLocaleDateString().split('/')[0]),
      },
      year: {
        type: 'int',
        default: () => Number(new Date().toLocaleDateString().split('/')[2]),
      },
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
class Balance extends Realm.Object<Balance> {
  _id!: Realm.BSON.ObjectId | string;
  balance!: number;

  static schema: ObjectSchema = {
    name: 'Balance',
    properties: {
      _id: {
        type: 'objectId' || 'string',
        default: () => new Realm.BSON.ObjectId(),
      },
      balance: 'int',
      day: {
        type: 'int',
        default: () => Number(new Date().toLocaleDateString().split('/')[1]),
      },
      month: {
        type: 'int',
        default: () => Number(new Date().toLocaleDateString().split('/')[0]),
      },
      year: {
        type: 'int',
        default: () => Number(new Date().toLocaleDateString().split('/')[2]),
      },
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

// Weekly Installments Modal
class Installments extends Realm.Object<Installments> {
  _id!: Realm.BSON.ObjectId | string;
  amount!: number;
  userId!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'Installments',
    properties: {
      _id: {
        type: 'objectId' || 'string',
        default: () => new Realm.BSON.ObjectId(),
      },
      userId: 'objectId',
      amount: 'int',
      day: {
        type: 'int',
        default: () => Number(new Date().toLocaleDateString().split('/')[1]),
      },
      month: {
        type: 'int',
        default: () => Number(new Date().toLocaleDateString().split('/')[0]),
      },
      year: {
        type: 'int',
        default: () => Number(new Date().toLocaleDateString().split('/')[2]),
      },
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
// Totals Modal
class Totals extends Realm.Object<Totals> {
  _id!: Realm.BSON.ObjectId | string;

  static schema: ObjectSchema = {
    name: 'Totals',
    properties: {
      _id: {
        type: 'objectId' || 'string',
        default: () => new Realm.BSON.ObjectId(),
      },
      totalBalance: {
        type: 'int',
        default: () => 0,
      },
      totalLoan: {
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
  schema: [Loaner, Balance, Installments, Totals],
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
