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
  referName: string;
  referAddress: string;
  referMobile: number;
}
