import Realm from 'realm';
export interface ILoner {
  _id?: Realm.BSON.ObjectId;
  name: string;
  fatherName: string;
  motherName: string;
  address: string;
  mobile: number;
  nid: number;
  loanAmount: number;
  profit: number;
  extraCharge: number;
  loanLead: number;
  referName: string;
  referAddress: string;
  referMobile: number;
  day?: number;
  month?: number;
  year?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IBalance {
  _id?: Realm.BSON.ObjectId;
  balance: number;
  day?: number;
  month?: number;
  year?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
