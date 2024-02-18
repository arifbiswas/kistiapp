import Realm, {ObjectSchema} from 'realm';

export class Printer extends Realm.Object<Printer> {
  _id!: Realm.BSON.ObjectId | string;
  name!: string;

  static schema: ObjectSchema = {
    name: 'Printer',
    properties: {
      _id: {
        type: 'objectId' || 'string',
        default: () => new Realm.BSON.ObjectId(),
      },
      device_name: 'string',
      inner_mac_address: 'string',

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

export class Loaner extends Realm.Object<Loaner> {
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
export class Balance extends Realm.Object<Balance> {
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
export class Installments extends Realm.Object<Installments> {
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
export class Totals extends Realm.Object<Totals> {
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
