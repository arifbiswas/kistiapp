import {
  SettingsIcon,
  Icon,
  Box,
  Center,
  HStack,
  Text,
  Heading,
  Divider,
} from '@gluestack-ui/themed';

import {} from 'react-native';
import React from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';

import {getDate, getDay, getMonth, getWeekDay, getYear} from 'bangla-calendar';

const HomeScreen = () => {
  let today = new Date();
  const banglaDate = getDate(today);

  return (
    <GlueStackProvider>
      <Box height={'100%'} bg="$white">
        <Center height={'45%'}>
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
              <HStack
                mx={'2%'}
                justifyContent="flex-end"
                gap="$1"
                alignItems="center">
                <Icon as={SettingsIcon} color="$white" size="lg" />
                <Text color="$white" fontWeight="semibold">
                  সেটিং
                </Text>
                {/* setting end*/}
              </HStack>
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
            {/* <Center>
              <HStack gap="$7">
                <Text color="$white">সদস্য : 5 জন</Text>
                <Box h="$6">
                  <Divider orientation="vertical" />
                </Box>
                <Text color="$white">লাভ : ৳৫০০</Text>
                <Box h="$6">
                  <Divider orientation="vertical" />
                </Box>
                <Text color="$white">ক্ষতি : ৳৫০০</Text>
              </HStack>
            </Center> */}
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
                pb="$1"
                justifyContent="space-between">
                <Text size="lg" color="$white" fontWeight="bold">
                  পাওনা :{' '}
                </Text>
                <Heading size="2xl" color="$white">
                  ৳১০০০০
                </Heading>
              </HStack>
              <HStack
                alignItems="center"
                pb="$1"
                justifyContent="space-between">
                <Text size="lg" color="$white" fontWeight="bold">
                  ক্ষতি :{' '}
                </Text>
                <Heading size="2xl" color="$white">
                  - ৳৫০০
                </Heading>
              </HStack>
            </Box>
            <Box mx="4%">
              <HStack
                alignItems="center"
                pb="$2"
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
          <Box
            h="$16"
            w="$16"
            bgColor="$teal600"
            rounded="$md"
            hardShadow="1"></Box>
          <Box
            h="$16"
            w="$16"
            bgColor="$teal600"
            rounded="$md"
            hardShadow="1"></Box>
          <Box
            h="$16"
            w="$16"
            bgColor="$teal600"
            rounded="$md"
            hardShadow="1"></Box>
          <Box
            h="$16"
            w="$16"
            bgColor="$teal600"
            rounded="$md"
            hardShadow="1"></Box>
        </HStack>
        <HStack mt="$12" mx="4%" justifyContent="space-between">
          <Box
            h="$16"
            w="$16"
            bgColor="$teal600"
            rounded="$md"
            hardShadow="1"></Box>
          <Box
            h="$16"
            w="$16"
            bgColor="$teal600"
            rounded="$md"
            hardShadow="1"></Box>
          <Box
            h="$16"
            w="$16"
            bgColor="$teal600"
            rounded="$md"
            hardShadow="1"></Box>
          <Box
            h="$16"
            w="$16"
            bgColor="$teal600"
            rounded="$md"
            hardShadow="1"></Box>
        </HStack>
      </Box>
    </GlueStackProvider>
  );
};
export default HomeScreen;
