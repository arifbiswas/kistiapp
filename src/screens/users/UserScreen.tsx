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
} from '@gluestack-ui/themed';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import HeaderPlusBack from '../../components/HeaderPlusBack';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomModal from '../../components/customModal/CustomModal';
import {Input} from '@gluestack-ui/themed';
import {ILoner} from '../../types/interface';
import {useQuery, useRealm} from '../../realm/realm';
import Realm from 'realm';
import {GColors} from '../../Styles/GColors';

const UserScreen = ({navigation}: any) => {
  const [modal, setModal] = React.useState(false);
  const realm = useRealm();
  const AllLoaner = useQuery('Loaner');

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

      try {
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

  console.log(AllLoaner);

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
                      borderColor="$teal600"
                      borderWidth="$1"
                      p="$1"
                      rounded="$md"
                      alignItems="center"
                      justifyContent="space-between">
                      <HStack gap="$3" alignItems="center" my="$1">
                        <Avatar
                          bgColor="$teal600"
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
                          <Text size="sm" color="$teal600" fontWeight="bold">
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

                      <Menu
                        placement="top right"
                        // top={-20}
                        offset={-20}
                        // selectionMode="multiple"

                        trigger={({...triggerProps}) => {
                          return (
                            <TouchableOpacity
                              {...triggerProps}
                              style={{
                                padding: 5,
                              }}>
                              <Entypo
                                name="dots-three-vertical"
                                size={20}
                                color={GColors.primary}
                              />
                            </TouchableOpacity>
                          );
                        }}>
                        <MenuItem key="Community" textValue="Community">
                          <MenuItemLabel size="md">Community</MenuItemLabel>
                        </MenuItem>
                        <MenuItem key="Plugins" textValue="Plugins">
                          <MenuItemLabel size="md">Plugins</MenuItemLabel>
                        </MenuItem>
                        <MenuItem key="Theme" textValue="Theme">
                          <MenuItemLabel size="md">Theme</MenuItemLabel>
                        </MenuItem>
                        <MenuItem key="Settings" textValue="Settings">
                          <MenuItemLabel size="md">Settings</MenuItemLabel>
                        </MenuItem>
                        <MenuItem key="Add account" textValue="Add account">
                          <MenuItemLabel size="md">Add account</MenuItemLabel>
                        </MenuItem>
                      </Menu>
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
                    textContentType="none"
                    onChangeText={text => setData({...data, name: text})}
                    value={data.name}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="পিতার নাম"
                    onChangeText={text => setData({...data, fatherName: text})}
                    value={data.fatherName}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="মাতার নাম"
                    onChangeText={text => setData({...data, motherName: text})}
                    value={data.motherName}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="ঠিকানা"
                    onChangeText={text => setData({...data, address: text})}
                    value={data.address}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="মোবাইল"
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
                    keyboardType="numeric"
                    onChangeText={text => setData({...data, nid: Number(text)})}
                    value={`${data.nid}`}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="ঋনের পরিমান"
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
                    keyboardType="numeric"
                    onChangeText={text => setData({...data, referName: text})}
                    value={`${data.referName}`}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="ঠিকানা"
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
