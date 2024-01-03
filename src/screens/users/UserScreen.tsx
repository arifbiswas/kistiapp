import {TouchableOpacity} from 'react-native';
import React from 'react';
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
} from '@gluestack-ui/themed';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import HeaderPlusBack from '../../components/HeaderPlusBack';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomModal from '../../components/customModal/CustomModal';
import {Input} from '@gluestack-ui/themed';
import {ILoner} from '../../types/interface';
import {realmContext} from '../../realm/realm';

const realmX = realmContext;

const UserScreen = ({navigation}: any) => {
  const [modal, setModal] = React.useState(false);
  const realm = realmX.useRealm();
  const [data, setData] = React.useState({
    address: '',
    extraCharge: 0,
    fatherName: '',
    loanAmount: 0,
    mobile: 0,
    motherName: '',
    name: '',
    nid: 0,
    profit: 0,
    referAddress: '',
    referMobile: 0,
    referName: '',
  });
  const saveNewLoner = React.useCallback(
    async (loneData: ILoner) => {
      console.log(loneData);
      loneData._id = new Realm.BSON.ObjectId();
      // realm.write(() => {
      //   realm.create('Loner', loneData);
      // });
    },
    [data],
  );
  return (
    <GlueStackProvider>
      <Box h="100%" position="relative">
        <HeaderPlusBack />
        <Box my="$2" px="$3">
          <Text color="$teal600" size="sm">
            মোট সদস্য : 5
          </Text>
        </Box>
        <ScrollView>
          <TouchableOpacity onPress={() => navigation.navigate('UserDetails')}>
            <HStack
              my="$1"
              mx="2%"
              borderColor="$teal300"
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
                  <AvatarFallbackText>আ</AvatarFallbackText>
                  {/* <AvatarImage
                    source={{
                      uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=80&q=60',
                    }}
                    alt="name"
                  /> */}
                </Avatar>
                <VStack gap="-$1">
                  <Text size="sm" color="$coolGray600" fontWeight="bold">
                    আরিফ বিশ্বাস জয়
                  </Text>
                  <Text size="sm" color="$coolGray600">
                    ১২৬/১ মীরহাজীরবাগ ঢাকা-১২০৪
                  </Text>
                  <Text size="sm" color="$coolGray600">
                    ০১৮৭১০৬৩০৭৪
                  </Text>
                </VStack>
              </HStack>
              <TouchableOpacity
                style={{
                  padding: 5,
                }}>
                <Entypo name="dots-three-vertical" size={20} />
              </TouchableOpacity>
            </HStack>
          </TouchableOpacity>
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
                    onChangeText={text => setData({...data, name: text})}
                    keyboardType="default"
                    textContentType="none"
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="পিতার নাম"
                    onChangeText={text => setData({...data, fatherName: text})}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="মাতার নাম"
                    onChangeText={text => setData({...data, motherName: text})}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="ঠিকানা"
                    onChangeText={text => setData({...data, address: text})}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="মোবাইল"
                    onChangeText={text =>
                      setData({...data, mobile: Number(text)})
                    }
                    keyboardType="number-pad"
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="এন আইডি"
                    onChangeText={text => setData({...data, nid: Number(text)})}
                    keyboardType="number-pad"
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="ঋনের পরিমান"
                    onChangeText={text =>
                      setData({...data, loanAmount: Number(text)})
                    }
                    keyboardType="number-pad"
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="লাভ"
                    onChangeText={text =>
                      setData({...data, profit: Number(text)})
                    }
                    keyboardType="number-pad"
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="বই জমা"
                    onChangeText={text =>
                      setData({...data, extraCharge: Number(text)})
                    }
                    keyboardType="number-pad"
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
                    onChangeText={text => setData({...data, referName: text})}
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="ঠিকানা"
                    onChangeText={text =>
                      setData({...data, referAddress: text})
                    }
                  />
                </Input>
                <Input size="lg">
                  <InputField
                    placeholder="মোবাইল"
                    onChangeText={text =>
                      setData({...data, referMobile: Number(text)})
                    }
                    keyboardType="number-pad"
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
