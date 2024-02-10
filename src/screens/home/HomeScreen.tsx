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
import {useQuery, useRealm} from '../../realm/realm';
import {IBalance, ILoner, ITotals} from '../../types/interface';
import {ToastAndroid} from 'react-native';

const HomeScreen = ({navigation}: any) => {
  const realm = useRealm();
  const allLoaner = useQuery<ILoner>('Loaner');
  const allBalance = useQuery<IBalance>('Balance');
  const lossLoaner = useQuery('Loaner', loaner => {
    return loaner.filtered('isLoss == $0', true);
  });
  const haveLoaner = useQuery('Loaner', loaner => {
    return loaner.filtered('isLoss == $0', false);
  });
  const totals = useQuery<ITotals>('Totals').find(item => item);
  let today = new Date();
  const banglaDate = getDate(today);

  const totalLossLoanAmount = lossLoaner.reduce(
    (preValue, currentValue) => preValue + currentValue?.loanAmount,
    0,
  );
  const totalExtraAmount = haveLoaner.reduce(
    (preValue, currentValue) => preValue + currentValue?.extraCharge,
    0,
  );

  const totalBalance = allBalance.reduce(
    (preBalance, currentBalance) => preBalance + currentBalance?.balance,
    0,
  );

  const totalProfit = allLoaner.reduce(
    (preValue, currentValue) => preValue + currentValue?.profit,
    0,
  );

  // console.log(totalExtraAmount);

  return (
    <GlueStackProvider>
      <Box height={'100%'} bg="$white">
        <Box
          width={'100%'}
          height={280}
          bgColor="$teal600"
          softShadow="1"
          px={'2%'}
          borderBottomEndRadius={10}
          borderBottomStartRadius={10}>
          {/* setting start*/}
          <HStack
            pt="$3"
            justifyContent="space-between"
            gap="$1"
            alignItems="center">
            <Text color="$white">{banglaDate}</Text>
            {/* <TouchableOpacity>
              <HStack
                px={'$1'}
                justifyContent="flex-end"
                gap="$1"
                alignItems="center">
                <Icon as={SettingsIcon} color="$white" size="lg" />
                <Text color="$white" fontWeight="semibold">
                  সেটিং
                </Text>
              </HStack>
            </TouchableOpacity> */}
            {/* setting end*/}
          </HStack>
          <Box flex={1} justifyContent="center">
            <Box paddingHorizontal="$10">
              <HStack justifyContent="space-between">
                <Text color="$white">সদস্য : {allLoaner.length} জন</Text>

                <Text color="$white">
                  লাভ :{' '}
                  {totals?.totalComes && totals?.totalLoan
                    ? totals?.totalComes - totals?.totalLoan
                    : 0}
                </Text>

                <Text color="$white">ক্ষতি : {totalLossLoanAmount}</Text>
              </HStack>
            </Box>

            <VStack mx="4%" gap="-$3">
              <HStack
                alignItems="center"
                pt="$2"
                justifyContent="space-between">
                <Text size="4xl" color="$white" fontWeight="bold">
                  ব্যালেন্স :{' '}
                </Text>
                <Heading size="4xl" color="$white">
                  {totals?.totalBalance ? totals?.totalBalance : 0}
                </Heading>
              </HStack>
              {/* debt start*/}

              <HStack
                alignItems="center"
                // pb="$1"
                justifyContent="space-between">
                <Text size="4xl" color="$white" fontWeight="bold">
                  পাওনা :{' '}
                </Text>
                <Heading size="4xl" color="$white">
                  {totals?.totalComes ? totals?.totalComes : 0}
                </Heading>
              </HStack>
            </VStack>
            {/* <Box mx="4%" pt="$1">
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
            </Box> */}
            <Box paddingHorizontal="$10" mt="$3">
              <HStack justifyContent="space-around">
                <Text color="$white">
                  {' '}
                  মোট ঋণ : {totals?.totalLoan ? totals?.totalLoan : 0}
                </Text>

                {/* <Text color="$white">
                মোট :{' '}
                {totals?.totalBalance &&
                (totals?.totalLoan || totalLossLoanAmount)
                  ? totals?.totalBalance +
                    totals?.totalLoan +
                    totalLossLoanAmount
                  : 0}
              </Text> */}

                <Text color="$white">
                  সর্ব মোট :{' '}
                  {totals?.totalBalance &&
                  totals?.totalComes &&
                  totalExtraAmount
                    ? totals?.totalBalance +
                      totals?.totalComes +
                      totalExtraAmount
                    : 0}
                </Text>
              </HStack>
            </Box>
          </Box>
        </Box>

        <HStack mt="$12" mx="4%" justifyContent="space-between">
          <TouchableOpacity
            onPress={() => {
              if (!totals) {
                ToastAndroid.showWithGravity(
                  `ব্যালেন্স সংযোগ করুন`,
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER,
                );
                return;
              }
              navigation.navigate('User');
            }}>
            <VStack alignItems="center" gap="$1">
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
          <TouchableOpacity onPress={() => navigation.navigate('Balance')}>
            <VStack alignItems="center" gap="$1">
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
          <TouchableOpacity onPress={() => navigation.navigate('Profit')}>
            <VStack alignItems="center" gap="$1">
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
          <TouchableOpacity onPress={() => navigation.navigate('Loss')}>
            <VStack alignItems="center" gap="$1">
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
        <HStack
          mt="$8"
          mx="4%"
          justifyContent="space-between"
          // gap="$5"
        >
          <TouchableOpacity onPress={() => navigation.navigate('Report')}>
            <VStack alignItems="center" gap="$1">
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
          <TouchableOpacity
            onPress={() => navigation.navigate('ReportMonthly')}>
            <VStack alignItems="center" gap="$1">
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
                মাসিক জমা
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReportWeekly')}>
            <VStack alignItems="center" gap="$1">
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
                প্রতিদিন জমা
              </Text>
            </VStack>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('DataExportImport')}>
            <VStack alignItems="center" gap="$1">
              <Box
                h="$16"
                w="$16"
                bgColor="$teal600"
                rounded="$md"
                softShadow="1"
                justifyContent="center"
                alignItems="center">
                <Entypo name="database" size={50} color="white" />
              </Box>
              <Text color="$teal600" fontWeight="$semibold">
                ডাটা
              </Text>
            </VStack>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Calculator')}>
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
          </TouchableOpacity> */}
        </HStack>
      </Box>
    </GlueStackProvider>
  );
};
export default HomeScreen;
