import React from 'react';
import {TouchableOpacity, ToastAndroid, Linking} from 'react-native';

import {
  Avatar,
  AvatarFallbackText,
  Box,
  HStack,
  Text,
  AvatarImage,
  VStack,
  Image,
  Center,
  CloseIcon,
  Icon,
  InputField,
  ScrollView,
  Menu,
  MenuItem,
  MenuItemLabel,
  View,
} from '@gluestack-ui/themed';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import HeaderPlusBack from '../../components/HeaderPlusBack';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomModal from '../../components/customModal/CustomModal';
import {Input} from '@gluestack-ui/themed';
import {IBalance, ILoner, ITotals} from '../../types/interface';
import {useObject, useQuery, useRealm} from '../../realm/realm';
import Realm from 'realm';
import {GColors} from '../../Styles/GColors';

const UserScreen = ({navigation}: any) => {
  const [modal, setModal] = React.useState(false);
  const [menuModal, setMenuModal] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState<ILoner>(null);
  const realm = useRealm();
  const allLoaner = useQuery<ILoner>('Loaner');

  const totals = useQuery<ITotals>('Totals').find(item => item);
  // console.log(allLoaner);
  // console.log(totals);

  const [data, setData] = React.useState({
    address: '১২৬/১ মিরহাজীরবাগ',
    extraCharge: 150,
    fatherName: 'ইউনুছ বিশ্বাস',
    loanAmount: 5000,
    mobile: 1871063074,
    motherName: 'মোর্শেদা বেগম',
    name: 'আরিফ বিশ্বাস',
    nid: 46416414654,
    profit: 1500,
    loanLead: 12,
    isLoss: false,
    referAddress: '১৫০ মিরহাজীবাগ',
    referMobile: 1871063074,
    referName: 'আলি ভাই',
  });

  const saveNewLoner = React.useCallback(
    async (loneData: ILoner) => {
      loneData.totalInstallment = loneData.loanAmount + loneData.profit;
      // console.log(loneData);
      if (!totals) {
        ToastAndroid.showWithGravity(
          `ব্যালেন্স সংযোগ করুন`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        return;
      } else if (
        totals.totalBalance === 0 ||
        totals?.totalBalance < 0 ||
        totals?.totalBalance < loneData.loanAmount
      ) {
        ToastAndroid.showWithGravity(
          `ব্যালেন্স নেই , আগে নতুন করে ব্যালেন্স সংযোগ করুন`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        return;
      }

      try {
        // console.log(allBalance);
        realm.write(() => {
          totals.totalBalance = totals.totalBalance - loneData.loanAmount;
          totals.totalLoan = totals.totalLoan + loneData.loanAmount;
          totals.totalComes =
            totals.totalComes + (loneData.loanAmount + loneData.profit);
        });

        realm.write(() => {
          realm.create('Loaner', {
            ...loneData,
          });
        });

        ToastAndroid.showWithGravity(
          `${loneData.name} এর ঋণ সংযোগ করা হইছে`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        setModal(false);
      } catch (error) {
        console.log(error);
      }
    },
    [data],
  );
  const deleteHandler = React.useCallback(async (loneData: ILoner) => {
    console.log(loneData);

    try {
      realm.write(() => {
        totals.totalBalance = totals.totalBalance + loneData.loanAmount;
        totals.totalLoan = totals.totalLoan - loneData.loanAmount;
        totals.totalComes =
          totals.totalComes - (loneData.loanAmount + loneData.profit);
      });

      realm.write(() => {
        realm.delete(loneData);
      });

      ToastAndroid.showWithGravity(
        `ডিলেট সফল হইছে`,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      setMenuModal(false);
      setSelectItem(null);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const lossHandler = React.useCallback(
    async (loneData: ILoner) => {
      // console.log(loneData);
      const single = realm.objectForPrimaryKey('Loaner', selectItem._id);
      // console.log(single);

      try {
        realm.write(() => {
          totals.totalLoan = totals.totalLoan - loneData.loanAmount;
          totals.totalComes =
            totals.totalComes - (loneData.loanAmount + loneData.profit);
        });

        realm.write(() => {
          single.isLoss = true;
        });

        ToastAndroid.showWithGravity(
          `ক্ষতিতে সংযোগ করা হয়েছে`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        setMenuModal(false);
      } catch (error) {
        console.log(error);
      }
    },
    [selectItem],
  );
  const haveToHandler = React.useCallback(
    async (loneData: ILoner) => {
      // console.log(loneData);
      const single = realm.objectForPrimaryKey('Loaner', selectItem._id);
      // console.log(single);

      try {
        realm.write(() => {
          totals.totalLoan = totals.totalLoan + loneData.loanAmount;
          totals.totalComes =
            totals.totalComes + (loneData.loanAmount + loneData.profit);
        });

        realm.write(() => {
          single.isLoss = false;
        });

        ToastAndroid.showWithGravity(
          `পাওয়া যাবে`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        setMenuModal(false);
      } catch (error) {
        console.log(error);
      }
    },
    [selectItem],
  );

  // console.log([...Array(5)]);

  return (
    <GlueStackProvider>
      <Box h="100%" position="relative">
        <HeaderPlusBack />
        <Box my="$2" px="$3">
          <Text color="$teal600" size="sm">
            মোট সদস্য : {allLoaner.length}
          </Text>
        </Box>
        <ScrollView>
          <Box pb="$16">
            {allLoaner.length !== 0 ? (
              <Box>
                {allLoaner.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('UserDetails', item)}>
                    <HStack
                      my="$1"
                      mx="2%"
                      borderColor={item.isLoss ? '$red600' : '$teal600'}
                      borderWidth="$1"
                      p="$1"
                      rounded="$md"
                      alignItems="center"
                      justifyContent="space-between">
                      <HStack gap="$3" alignItems="center" my="$1">
                        <Avatar
                          bgColor={item.isLoss ? '$red600' : '$teal600'}
                          style={{
                            width: 55,
                            height: 55,
                          }}>
                          <AvatarFallbackText>
                            {item?.name.slice(0, 1)}
                          </AvatarFallbackText>
                        </Avatar>
                        <VStack gap="-$1">
                          <Text
                            size="sm"
                            color={item.isLoss ? '$red600' : '$teal600'}
                            fontWeight="bold">
                            {item?.name}
                          </Text>
                          <Text size="sm" color="$coolGray600">
                            {item?.address}
                          </Text>
                          <Text size="sm" color="$coolGray600">
                            {item.mobile}
                          </Text>
                        </VStack>
                      </HStack>
                      {item.isLoss ? (
                        <Text size="sm" fontWeight="$black" color="$red500">
                          ক্ষতি
                        </Text>
                      ) : (
                        <Text size="xs" fontWeight="$black" color="$teal600">
                          {item.day}/{item.month}/{item.year}
                        </Text>
                      )}

                      <TouchableOpacity
                        onPress={() => {
                          setSelectItem(item);
                          setMenuModal(!menuModal);
                        }}
                        style={{
                          padding: 5,
                        }}>
                        <Entypo
                          name="dots-three-vertical"
                          size={20}
                          color={item.isLoss ? GColors.red : GColors.primary}
                        />
                      </TouchableOpacity>
                    </HStack>
                  </TouchableOpacity>
                ))}
              </Box>
            ) : (
              <Box my="$4">
                <Text
                  size="md"
                  textAlign="center"
                  color="$teal800"
                  fontWeight="bold"
                  opacity="$25">
                  কাউকে পাওয়া যাইনি , নতুন সংযোগ করুন
                </Text>
              </Box>
            )}
          </Box>
        </ScrollView>

        <TouchableOpacity
          onPress={() => setModal(!modal)}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 10,
          }}>
          <HStack
            bgColor="$teal600"
            alignItems="center"
            justifyContent="center"
            gap="$1"
            px="$4"
            py="$3"
            rounded="$lg"
            softShadow="1">
            {/* <FabIcon as={AddIcon} mr="$1" /> */}
            <FontAwesome name="user-plus" size={20} color="white" />
            <Text color="$white" fontWeight="semibold">
              নতুন
            </Text>
          </HStack>
        </TouchableOpacity>

        {/*------------------- menu item modal ----------------------- */}
        <CustomModal
          Radius={15}
          modalVisible={menuModal}
          setModalVisible={setMenuModal}
          backButton={true}
          height="40%"
          width="65%"
          // appearance={true}
        >
          <>
            <Box gap="$1">
              {allLoaner.length !== 0 && selectItem && selectItem?.isLoss ? (
                <TouchableOpacity
                  onPress={() => {
                    haveToHandler(selectItem);
                  }}>
                  <View
                    bgColor="$green600"
                    p="$3"
                    w="100%"
                    h="$12"
                    rounded="$md"
                    justifyContent="center"
                    alignItems="center">
                    <Text size="md" color="$white" fontWeight="bold">
                      পাওয়া যাবে !
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`tel:0${selectItem.mobile}`);
                      setMenuModal(false);
                    }}>
                    <View
                      bgColor="$teal600"
                      p="$3"
                      w="100%"
                      h="$12"
                      rounded="$md"
                      justifyContent="center"
                      alignItems="center">
                      <Text size="md" color="$white" fontWeight="bold">
                        কল
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('UpdateUser', {item: selectItem});
                      setMenuModal(false);
                    }}>
                    <View
                      bgColor="$teal600"
                      p="$3"
                      w="100%"
                      h="$12"
                      rounded="$md"
                      justifyContent="center"
                      alignItems="center">
                      <Text size="md" color="$white" fontWeight="bold">
                        এডিট
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('WeeklyInstallment', {
                        item: selectItem,
                      });
                      setMenuModal(false);
                    }}>
                    <View
                      bgColor="$teal600"
                      p="$3"
                      w="100%"
                      h="$12"
                      rounded="$md"
                      justifyContent="center"
                      alignItems="center">
                      <Text size="md" color="$white" fontWeight="bold">
                        সাপ্তাহিক জমা
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      lossHandler(selectItem);
                    }}>
                    <View
                      bgColor="$red600"
                      p="$3"
                      w="100%"
                      h="$12"
                      rounded="$md"
                      justifyContent="center"
                      alignItems="center">
                      <Text size="md" color="$white" fontWeight="bold">
                        পাওয়া যাবে না (ক্ষতি)
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity
                onPress={() => {
                  deleteHandler(selectItem);
                }}>
                <View
                  bgColor="$red600"
                  p="$3"
                  w="100%"
                  h="$12"
                  rounded="$md"
                  justifyContent="center"
                  alignItems="center">
                  <Text size="md" color="$white" fontWeight="bold">
                    ডিলেট
                  </Text>
                </View>
              </TouchableOpacity>
            </Box>
          </>
        </CustomModal>

        {/*--------------- new add modal -------------------- */}
        <CustomModal
          Radius={15}
          modalVisible={modal}
          setModalVisible={setModal}
          backButton={true}
          height="80%"
          appearance={true}>
          <>
            <Box>
              <Center>
                <Image
                  source={require('../../../assets/adduser.png')}
                  alt="picture"
                  w="$16"
                  h="$16"
                />
              </Center>
            </Box>
            <ScrollView my="$2" showsVerticalScrollIndicator={false}>
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
                    onChangeText={text =>
                      setData({...data, mobile: Number(text)})
                    }
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
                    onChangeText={text =>
                      setData({...data, profit: Number(text)})
                    }
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
                    onChangeText={text =>
                      setData({...data, referAddress: text})
                    }
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
            </ScrollView>
            <HStack justifyContent="space-between" py="$3">
              <TouchableOpacity
                onPress={() => saveNewLoner(data)}
                style={{
                  width: '45%',
                }}>
                <HStack
                  bgColor="$green600"
                  py="$3"
                  gap="$2"
                  justifyContent="center"
                  alignItems="center"
                  rounded="$lg">
                  <FontAwesome name="user-plus" size={20} color="white" />
                  <Text color="$white" fontWeight="bold">
                    Add
                  </Text>
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModal(!modal)}
                style={{
                  width: '45%',
                }}>
                <HStack
                  bgColor="$red600"
                  py="$3"
                  gap="$2"
                  justifyContent="center"
                  alignItems="center"
                  rounded="$lg">
                  <Icon as={CloseIcon} color="$white" size="lg" />
                  <Text color="$white" fontWeight="bold">
                    Cancel
                  </Text>
                </HStack>
              </TouchableOpacity>
            </HStack>
          </>
        </CustomModal>
      </Box>
    </GlueStackProvider>
  );
};

export default UserScreen;
