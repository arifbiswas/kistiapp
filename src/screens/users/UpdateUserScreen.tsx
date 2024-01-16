import {ToastAndroid, TouchableOpacity} from 'react-native';
import React from 'react';
import {ILoner} from '../../types/interface';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import HeaderPlusBack from '../../components/HeaderPlusBack';
import {
  Box,
  Center,
  CloseIcon,
  HStack,
  Icon,
  Input,
  ScrollView,
  Text,
  VStack,
  InputField,
  Image,
} from '@gluestack-ui/themed';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useRealm} from '../../realm/realm';

const UpdateUserScreen = ({route, navigation}: any) => {
  const item: ILoner = route?.params?.item;
  const realm = useRealm();
  const [data, setData] = React.useState({
    address: item.address,
    extraCharge: item.extraCharge,
    fatherName: item.fatherName,
    loanAmount: item.loanAmount,
    mobile: item.mobile,
    motherName: item.motherName,
    name: item.name,
    nid: item.nid,
    profit: item.profit,
    loanLead: item.loanLead,
    isLoss: item.isLoss,
    referAddress: item.referAddress,
    referMobile: item.referMobile,
    referName: item.referName,
  });

  const updateHandler = React.useCallback(
    (value: ILoner) => {
      try {
        const findItem = realm.objectForPrimaryKey('Loaner', item._id);
        if (findItem?.isValid()) {
          realm.write(() => {
            findItem.address = value.address;
            findItem.extraCharge = value.extraCharge;
            findItem.fatherName = value.fatherName;
            findItem.loanAmount = value.loanAmount;
            findItem.mobile = value.mobile;
            findItem.motherName = value.motherName;
            findItem.name = value.name;
            findItem.nid = value.nid;
            findItem.profit = value.profit;
            findItem.loanLead = value.loanLead;
            findItem.isLoss = value.isLoss;
            findItem.referAddress = value.referAddress;
            findItem.referMobile = value.referMobile;
            findItem.referName = value.referName;
          });
          ToastAndroid.showWithGravity(
            `${findItem.name} ইউজার আপডেট করা হয়েছে`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          navigation.goBack();
        } else {
          ToastAndroid.showWithGravity(
            `ইউজার পাওয়া যাইনি`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    [data],
  );

  return (
    <GlueStackProvider height="100%">
      <HeaderPlusBack>
        <TouchableOpacity onPress={() => updateHandler(data)}>
          <Box
            borderColor="$white"
            borderWidth="$1"
            py="$2"
            px="$5"
            rounded="$md">
            <Text color="$white" fontWeight="bold">
              Update
            </Text>
          </Box>
        </TouchableOpacity>
      </HeaderPlusBack>

      {/* <Box>
        <Center>
          <Image
            source={require('../../../assets/adduser.png')}
            alt="picture"
            w="$16"
            h="$16"
          />
        </Center>
      </Box> */}
      <ScrollView my="$2" showsVerticalScrollIndicator={false}>
        <Box mx="$4" pb="$5">
          <Text
            color="$coolGray500"
            pb="$1"
            fontWeight="bold"
            fontSize="$xs"
            textAlign="center">
            (ঋণ গ্রহনকারী)
          </Text>
          <VStack gap="$3">
            <Input size="lg">
              <InputField
                placeholder="নাম"
                keyboardType="default"
                textContentType="name"
                size="sm"
                onChangeText={text => setData({...data, name: text})}
                value={data.name}
              />
            </Input>
            <Input size="lg">
              <InputField
                placeholder="পিতার নাম"
                textContentType="name"
                size="sm"
                onChangeText={text => setData({...data, fatherName: text})}
                value={data.fatherName}
              />
            </Input>
            <Input size="lg">
              <InputField
                placeholder="মাতার নাম"
                textContentType="name"
                size="sm"
                onChangeText={text => setData({...data, motherName: text})}
                value={data.motherName}
              />
            </Input>
            <Input size="lg">
              <InputField
                placeholder="ঠিকানা"
                textContentType="fullStreetAddress"
                size="sm"
                onChangeText={text => setData({...data, address: text})}
                value={data.address}
              />
            </Input>
            <Input size="lg">
              <InputField
                placeholder="মোবাইল"
                size="sm"
                keyboardType="number-pad"
                textContentType="telephoneNumber"
                onChangeText={text => setData({...data, mobile: Number(text)})}
                value={`${data.mobile}`}
              />
            </Input>
            <Input size="lg">
              <InputField
                placeholder="এন আইডি"
                size="sm"
                keyboardType="numeric"
                textContentType="sublocality"
                onChangeText={text => setData({...data, nid: Number(text)})}
                value={`${data.nid}`}
              />
            </Input>
            <Input size="lg">
              <InputField
                placeholder="ঋনের পরিমান"
                size="sm"
                keyboardType="numeric"
                textContentType="none"
                onChangeText={text =>
                  setData({...data, loanAmount: Number(text)})
                }
                value={`${data.loanAmount}`}
              />
            </Input>
            <Input size="lg">
              <InputField
                placeholder="লাভ"
                size="sm"
                textContentType="none"
                keyboardType="numeric"
                onChangeText={text => setData({...data, profit: Number(text)})}
                value={`${data.profit}`}
              />
            </Input>
            <Input size="lg">
              <InputField
                placeholder="বই জমা"
                size="sm"
                textContentType="none"
                keyboardType="numeric"
                onChangeText={text =>
                  setData({...data, extraCharge: Number(text)})
                }
                value={`${data.extraCharge}`}
              />
            </Input>
            <Input size="lg">
              <InputField
                placeholder="কত কিস্তিতে?"
                size="sm"
                keyboardType="numeric"
                onChangeText={text =>
                  setData({...data, loanLead: Number(text)})
                }
                value={`${data.loanLead}`}
              />
            </Input>
            <Text
              color="$coolGray500"
              pb="$1"
              fontWeight="bold"
              fontSize="$xs"
              textAlign="center">
              (রেফারেন্স)
            </Text>
            <Input size="lg">
              <InputField
                placeholder="নাম"
                size="sm"
                keyboardType="numeric"
                textContentType="name"
                onChangeText={text => setData({...data, referName: text})}
                value={`${data.referName}`}
              />
            </Input>
            <Input size="lg">
              <InputField
                placeholder="ঠিকানা"
                size="sm"
                textContentType="fullStreetAddress"
                keyboardType="numeric"
                onChangeText={text => setData({...data, referAddress: text})}
                value={`${data.referAddress}`}
              />
            </Input>
            <Input size="lg">
              <InputField
                placeholder="মোবাইল"
                size="sm"
                textContentType="telephoneNumber"
                keyboardType="numeric"
                onChangeText={text =>
                  setData({...data, referMobile: Number(text)})
                }
                value={`${data.referMobile}`}
              />
            </Input>
          </VStack>
        </Box>
      </ScrollView>
    </GlueStackProvider>
  );
};

export default UpdateUserScreen;
