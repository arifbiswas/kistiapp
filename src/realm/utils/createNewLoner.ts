import {ILoner} from '../../types/interface';
import {realmContext} from '../realm';
import Realm from 'realm';
const {useRealm} = realmContext;

export const createNewLoaner = ({
  address,
  extraCharge,
  fatherName,
  loanAmount,
  mobile,
  motherName,
  name,
  nid,
  profit,
  referAddress,
  referMobile,
  referName,
}: ILoner) => {
  const realm = useRealm();
  realm.write(() => {
    _id: new Realm.BSON.ObjectId(),
      address,
      extraCharge,
      fatherName,
      loanAmount,
      mobile,
      motherName,
      name,
      nid,
      profit,
      referAddress,
      referMobile,
      referName;
  });
};
