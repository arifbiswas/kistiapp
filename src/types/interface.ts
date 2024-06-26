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
  totalInstallment: number;
  extraCharge: number;
  loanLead: number;
  referName: string;
  referAddress: string;
  referMobile: number;
  isLoss: boolean;
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
export interface IInstallment {
  _id?: Realm.BSON.ObjectId;
  amount: number;
  userId: Realm.BSON.ObjectId;
  day?: number;
  month?: number;
  year?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ITotals {
  _id?: Realm.BSON.ObjectId;
  totalBalance?: number;
  totalLoan?: number;
  totalComes?: number;
}
export interface IPrinter {
  _id?: Realm.BSON.ObjectId;
  device_name?: string;
  inner_mac_address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
