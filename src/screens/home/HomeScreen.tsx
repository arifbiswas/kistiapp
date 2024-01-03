import {
  SettingsIcon,
  Icon,
  Box,
  Center,
  HStack,
  Text,
  Heading,
  Divider,
  Image,
  VStack,
} from '@gluestack-ui/themed';

import {TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {getDate, getDay, getMonth, getWeekDay, getYear} from 'bangla-calendar';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = ({navigation}: any) => {
  let today = new Date();
  const banglaDate = getDate(today);

  return (
    <GlueStackProvider>
      <Box height={'100%'} bg="$white">
        <Center height={'43%'}>
          <Box
            width={'100%'}
            height={'100%'}
            bgColor="$teal600"
            softShadow="1"
            borderBottomEndRadius={10}
            borderBottomStartRadius={10}>
            {/* setting start*/}
            <HStack
              pt="$1"
              pb="$4"
              mx={'2%'}
              justifyContent="space-between"
              gap="$1"
              alignItems="center">
              <Text color="$white">{banglaDate}</Text>
              <TouchableOpacity>
                <HStack
                  px={'$1'}
                  justifyContent="flex-end"
                  gap="$1"
                  alignItems="center">
                  <Icon as={SettingsIcon} color="$white" size="lg" />
                  <Text color="$white" fontWeight="semibold">
                    সেটিং
                  </Text>
                  {/* setting end*/}
                </HStack>
              </TouchableOpacity>
            </HStack>
            <Center>
              <HStack gap="$7">
                <Text color="$white">সদস্য : 5 জন</Text>
                <Box h="$6">
                  <Divider orientation="vertical" />
                </Box>
                <Text color="$white">লাভ : ৳৫০০</Text>
                <Box h="$6">
                  <Divider orientation="vertical" />
                </Box>
                <Text color="$white">ক্ষতি : (-)৳৫০০</Text>
              </HStack>
            </Center>

            <Box
              mx="4%"
              borderBottomColor="$coolGray100"
              borderBottomWidth="$1"
              style={{
                borderStyle: 'dashed',
              }}>
              <HStack
                alignItems="center"
                pt="$2"
                justifyContent="space-between">
                <Text size="lg" color="$white" fontWeight="bold">
                  ব্যালেন্স :{' '}
                </Text>
                <Heading size="2xl" color="$white">
                  ৳১০০০০
                </Heading>
              </HStack>
              {/* debt start*/}

              <HStack
                alignItems="center"
                // pb="$1"
                justifyContent="space-between">
                <Text size="md" color="$white" fontWeight="bold">
                  পাওনা :{' '}
                </Text>
                <Heading size="lg" color="$white">
                  ৳১০০০০
                </Heading>
              </HStack>
              <HStack
                alignItems="center"
                // pb="$1"
                justifyContent="space-between">
                <Text size="md" color="$white" fontWeight="bold">
                  বই জমা :{' '}
                </Text>
                <Heading size="lg" color="$white">
                  ৳৫০০
                </Heading>
              </HStack>
              <HStack
                alignItems="center"
                // pb="$1"
                justifyContent="space-between">
                <Text size="lg" color="$white" fontWeight="bold">
                  লাভ :{' '}
                </Text>
                <Heading size="lg" color="$white">
                  ৳৫০০
                </Heading>
              </HStack>
              <HStack
                alignItems="center"
                pb="$2"
                justifyContent="space-between">
                <Text size="lg" color="$white" fontWeight="bold">
                  ক্ষতি :{' '}
                </Text>
                <Heading size="lg" color="$white">
                  - ৳৫০০
                </Heading>
              </HStack>
            </Box>
            <Box mx="4%" pt="$1">
              <HStack
                alignItems="center"
                // pb="$2"
                justifyContent="space-between">
                <Text size="lg" color="$white" fontWeight="bold">
                  মোট :{' '}
                </Text>
                <Heading size="2xl" color="$white">
                  ৳২০০০০
                </Heading>
              </HStack>
            </Box>
          </Box>
        </Center>
        <HStack mt="$12" mx="4%" justifyContent="space-between">
          <TouchableOpacity onPress={() => navigation.navigate('User')}>
            <VStack alignItems="center">
              <Box
                h="$16"
                w="$16"
                bgColor="$teal600"
                rounded="$md"
                softShadow="1"
                justifyContent="center"
                alignItems="center">
                <FontAwesome name="users" size={35} color="white" />
              </Box>
              <Text color="$teal600" fontWeight="$semibold">
                সদস্য
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity>
            <VStack alignItems="center">
              <Box
                h="$16"
                w="$16"
                bgColor="$teal600"
                rounded="$md"
                softShadow="1"
                justifyContent="center"
                alignItems="center">
                <Entypo name="wallet" size={45} color="white" />
              </Box>
              <Text color="$teal600" fontWeight="$semibold">
                ব্যালেন্স
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity>
            <VStack alignItems="center">
              <Box
                h="$16"
                w="$16"
                bgColor="$teal600"
                rounded="$md"
                softShadow="1"
                justifyContent="center"
                alignItems="center">
                <FontAwesome6 name="arrow-trend-up" size={40} color="white" />
              </Box>
              <Text color="$teal600" fontWeight="$semibold">
                লাভ
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity>
            <VStack alignItems="center">
              <Box
                h="$16"
                w="$16"
                bgColor="$teal600"
                rounded="$md"
                softShadow="1"
                justifyContent="center"
                alignItems="center">
                <FontAwesome6 name="arrow-trend-down" size={40} color="white" />
              </Box>
              <Text color="$teal600" fontWeight="$semibold">
                ক্ষতি
              </Text>
            </VStack>
          </TouchableOpacity>
        </HStack>
        <HStack mt="$8" mx="4%" justifyContent="space-between">
          <TouchableOpacity>
            <VStack alignItems="center">
              <Box
                h="$16"
                w="$16"
                bgColor="$teal600"
                rounded="$md"
                softShadow="1"
                justifyContent="center"
                alignItems="center">
                <MaterialCommunityIcons
                  name="book-open-page-variant"
                  size={45}
                  color="white"
                />
              </Box>
              <Text color="$teal600" fontWeight="$semibold">
                রিপোর্ট
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity>
            <VStack alignItems="center">
              <Box
                h="$16"
                w="$16"
                bgColor="$teal600"
                rounded="$md"
                softShadow="1"
                justifyContent="center"
                alignItems="center">
                <MaterialIcons name="find-in-page" size={45} color="white" />
              </Box>
              <Text color="$teal600" fontWeight="$semibold">
                মাসিক
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity>
            <VStack alignItems="center">
              <Box
                h="$16"
                w="$16"
                bgColor="$teal600"
                rounded="$md"
                softShadow="1"
                justifyContent="center"
                alignItems="center">
                <MaterialIcons name="find-in-page" size={45} color="white" />
              </Box>
              <Text color="$teal600" fontWeight="$semibold">
                সাপ্তাহিক
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity>
            <VStack alignItems="center">
              <Box
                h="$16"
                w="$16"
                bgColor="$teal600"
                rounded="$md"
                softShadow="1"
                justifyContent="center"
                alignItems="center">
                <MaterialIcons name="calculate" size={50} color="white" />
              </Box>
              <Text color="$teal600" fontWeight="$semibold">
                ক্যাল
              </Text>
            </VStack>
          </TouchableOpacity>
        </HStack>
      </Box>
    </GlueStackProvider>
  );
};
export default HomeScreen;
