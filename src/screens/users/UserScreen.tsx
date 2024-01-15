import React from 'react';
import {TouchableOpacity, ToastAndroid} from 'react-native';

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
  const [selectItem, setSelectItem] = React.useState<ILoner>({});
  const realm = useRealm();
  const AllLoaner = useQuery<ILoner>('Loaner');

  const totals = useQuery<ITotals>('Totals').find(item => item);
  console.log(totals);

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
    loss: false,
    day: Number(new Date().toLocaleDateString().split('/')[0]),
    month: Number(new Date().toLocaleDateString().split('/')[1]),
    year: Number(new Date().toLocaleDateString().split('/')[2]),
    referAddress: '১৫০ মিরহাজীবাগ',
    referMobile: 1871063074,
    referName: 'আলি ভাই',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const saveNewLoner = React.useCallback(
    async (loneData: ILoner) => {
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
          totals.totalProfit = totals.totalProfit + loneData.profit;
          // totals.totalLoss = totals.totalProfit + loneData.;
        });

        realm.write(() => {
          realm.create('Loaner', {
            _id: new Realm.BSON.ObjectId(),
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
  const deleteHandler = React.useCallback(
    async (loneData: ILoner) => {
      // console.log(loneData);

      try {
        realm.write(() => {
          realm.delete(loneData);
        });

        ToastAndroid.showWithGravity(
          `ডিলেট সফল হইছে`,
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
  const lossHandler = React.useCallback(
    async (loneData: ILoner) => {
      // console.log(loneData);
      const single = realm.objectForPrimaryKey('Loaner', selectItem._id);
      // console.log(single);

      try {
        realm.write(() => {
          totals.totalLoss =
            totals.totalLoss + (loneData.loanAmount + loneData.profit);
        });
        realm.write(() => {
          single.loss = true;
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
          totals.totalLoss =
            totals.totalLoss - (loneData.loanAmount + loneData.profit);
        });
        realm.write(() => {
          single.loss = false;
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
            মোট সদস্য : {AllLoaner.length}
          </Text>
        </Box>
        <ScrollView>
          <Box pb="$16">
            {AllLoaner.length !== 0 ? (
              <>
                {AllLoaner.map(item => (
                  <TouchableOpacity
                    key={item?._id}
                    onPress={() => navigation.navigate('UserDetails', item)}>
                    <HStack
                      my="$1"
                      mx="2%"
                      borderColor={item.loss ? '$red600' : '$teal600'}
                      borderWidth="$1"
                      p="$1"
                      rounded="$md"
                      alignItems="center"
                      justifyContent="space-between">
                      <HStack gap="$3" alignItems="center" my="$1">
                        <Avatar
                          bgColor={item.loss ? '$red600' : '$teal600'}
                          style={{
                            width: 55,
                            height: 55,
                          }}>
                          <AvatarFallbackText>
                            {item?.name.slice(0, 1)}
                          </AvatarFallbackText>
                          {/* <AvatarImage
                    source={{
                      uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=80&q=60',
                    }}
                    alt="name"
                  /> */}
                        </Avatar>
                        <VStack gap="-$1">
                          <Text
                            size="sm"
                            color={item.loss ? '$red600' : '$teal600'}
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
                      {item.loss && (
                        <Text size="sm" fontWeight="$black" color="$red500">
                          ক্ষতি
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
                          color={item.loss ? GColors.red : GColors.primary}
                        />
                      </TouchableOpacity>
                    </HStack>
                  </TouchableOpacity>
                ))}
              </>
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
              <TouchableOpacity>
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
              <TouchableOpacity>
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
              <TouchableOpacity>
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
                  deleteHandler(selectItem);
                  setMenuModal(false);
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

              {selectItem.loss ? (
                <TouchableOpacity
                  onPress={() => {
                    haveToHandler(selectItem);
                    // setMenuModal(false);
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
                <TouchableOpacity
                  onPress={() => {
                    lossHandler(selectItem);
                    // setMenuModal(false);
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
              )}
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
                    size="sm"
                    textContentType="none"
                    onChangeText={text => setData({...data, name: text})}
                    value={data.name}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="পিতার নাম"
                    size="sm"
                    onChangeText={text => setData({...data, fatherName: text})}
                    value={data.fatherName}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="মাতার নাম"
                    size="sm"
                    onChangeText={text => setData({...data, motherName: text})}
                    value={data.motherName}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="ঠিকানা"
                    size="sm"
                    onChangeText={text => setData({...data, address: text})}
                    value={data.address}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="মোবাইল"
                    size="sm"
                    keyboardType="numeric"
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
                    onChangeText={text => setData({...data, nid: Number(text)})}
                    value={`${data.nid}`}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="ঋনের পরিমান"
                    size="sm"
                    keyboardType="numeric"
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
                    onChangeText={text => setData({...data, referName: text})}
                    value={`${data.referName}`}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="ঠিকানা"
                    size="sm"
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
