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
import {Divider} from '@gluestack-ui/themed';

const BalanceScreen = ({navigation}: any) => {
  const [modal, setModal] = React.useState(false);
  const [menuModal, setMenuModal] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState({});
  const realm = useRealm();

  const AllBalance = useQuery('Balance');
  const totals = useQuery<ITotals>('Totals').find(item => item);
  console.log(totals);

  const [data, setData] = React.useState({
    balance: 50000,
  });
  const saveNewLoner = React.useCallback(
    async (balance: IBalance) => {
      // console.log(loneData);

      try {
        if (!totals?.totalBalance) {
          realm.write(() => {
            realm.create('Totals', {
              totalBalance: balance.balance,
            });
          });
        }

        if (totals?.totalBalance || totals?.totalBalance === 0) {
          realm.write(() => {
            totals.totalBalance = totals.totalBalance + balance.balance;
          });
        }

        realm.write(() => {
          realm.create('Balance', {
            ...balance,
          });
        });

        ToastAndroid.showWithGravity(
          `${balance.balance} নতুন যোগ করা হইছে`,
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
    async (balance: IBalance) => {
      // console.log(loneData);

      try {
        realm.write(() => {
          totals.totalBalance = totals.totalBalance - balance.balance;
        });

        realm.write(() => {
          realm.delete(balance);
        });

        ToastAndroid.showWithGravity(
          `ডিলেট সফল হইছে`,
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

  //   console.log(AllBalance);

  return (
    <GlueStackProvider>
      <Box h="100%" position="relative">
        <HeaderPlusBack />
        <Box my="$2" px="$3">
          <Text color="$teal600" size="sm">
            মোট ব্যালেন্স :{' '}
            {AllBalance.reduce(
              (preBalance, currentBalance) =>
                preBalance + currentBalance?.balance,
              0,
            )}
          </Text>
        </Box>
        {/* <Box>
          <Divider bgColor="$teal600" />
        </Box> */}
        <ScrollView>
          <Box pb="$16">
            {AllBalance.length !== 0 ? (
              <>
                {AllBalance.map(item => (
                  <Box
                    mx="2%"
                    key={item?._id}
                    style={{
                      borderStyle: 'dashed',
                      borderBottomColor: GColors.primary,
                      borderBottomWidth: 1,
                    }}>
                    <HStack
                      my="$1"
                      p="$1"
                      rounded="$md"
                      alignItems="center"
                      justifyContent="space-between">
                      <HStack gap="$3" alignItems="center" my="$1">
                        <VStack gap="-$1">
                          <HStack py="$1" alignItems="center" gap="$1">
                            <Text
                              size="md"
                              color="$coolGray500"
                              fontWeight="bold">
                              ব্যালেন্স : {''}
                            </Text>
                            <Text size="md" color="$teal600" fontWeight="bold">
                              + {item?.balance}
                            </Text>
                          </HStack>
                          <Text size="sm" color="$coolGray400">
                            {new Date(item.createdAt).toDateString()}
                          </Text>
                        </VStack>
                      </HStack>

                      <TouchableOpacity
                        onPress={() => {
                          setSelectItem(item);
                          setMenuModal(true);
                        }}
                        style={{
                          padding: 5,
                        }}>
                        <Entypo
                          name="dots-three-vertical"
                          size={20}
                          color={GColors.primary}
                        />
                      </TouchableOpacity>
                    </HStack>
                  </Box>
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
                  পাওয়া যাইনি , নতুন সংযোগ করুন
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
            gap="$2"
            px="$4"
            py="$3"
            rounded="$lg"
            softShadow="1">
            {/* <FabIcon as={AddIcon} mr="$1" /> */}
            <FontAwesome name="plus" size={16} color="white" />
            {/* <Entypo name="wallet" size={20} color="white" /> */}
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
          height="20%"
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
                    এডিট
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
            </Box>
          </>
        </CustomModal>

        {/*--------------- new add modal -------------------- */}
        <CustomModal
          Radius={15}
          modalVisible={modal}
          setModalVisible={setModal}
          backButton={true}
          height="40%"
          appearance={true}>
          <>
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
                    placeholder="মোবাইল"
                    size="sm"
                    keyboardType="numeric"
                    onChangeText={text =>
                      setData({...data, balance: Number(text)})
                    }
                    value={`${data.balance}`}
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

export default BalanceScreen;
