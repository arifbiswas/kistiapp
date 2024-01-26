import {TouchableOpacity} from 'react-native';
import React from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import HeaderPlusBack from '../../components/HeaderPlusBack';
import {useQuery, useRealm} from '../../realm/realm';
import {IBalance, IInstallment, ILoner, ITotals} from '../../types/interface';
import {Box, Center, Divider, HStack, VStack} from '@gluestack-ui/themed';
import {Text} from '@gluestack-ui/themed';

const ReportScreen = () => {
  const realm = useRealm();
  const allLoaner = useQuery<ILoner>('Loaner');
  const allBalance = useQuery<IBalance>('Balance');
  const lossLoaner = useQuery<ILoner>('Loaner', loaner => {
    return loaner.filtered('isLoss == $0', true);
  });
  const fullInstallments = useQuery<IInstallment>('Installments');
  // const haveLoaner = useQuery('Loaner', loaner => {
  //   return loaner.filtered('isLoss == $0', false);
  // });
  const totals = useQuery<ITotals>('Totals').find(item => item);

  const totalLossLoanAmount = lossLoaner.reduce(
    (preValue, currentValue) => preValue + currentValue?.loanAmount,
    0,
  );
  const totalInstallment = fullInstallments.reduce(
    (preValue, currentValue) => preValue + currentValue?.amount,
    0,
  );

  const monthlyBalance = useQuery<IBalance>('Balance', item => {
    return item.filtered(
      'month == $0',
      Number(new Date().toLocaleDateString().split('/')[0]),
    );
  });
  const monthlyTotalBalance = monthlyBalance.reduce(
    (preValue, currentValue) => preValue + currentValue?.balance,
    0,
  );

  const monthlyLoaner = useQuery<ILoner>('Loaner', loaner => {
    return loaner.filtered(
      'month == $0',
      Number(new Date().toLocaleDateString().split('/')[0]),
    );
  });

  const monthlyTotalComes = monthlyLoaner.reduce(
    (preValue, currentValue) => preValue + currentValue?.totalInstallment,
    0,
  );

  const monthlyLossLoaner = useQuery<ILoner>('Loaner', loaner => {
    return loaner
      .filtered('isLoss == $0', true)
      .filtered(
        'month == $0',
        Number(new Date().toLocaleDateString().split('/')[0]),
      );
  });
  const monthlyTotalLossLoanAmount = monthlyLossLoaner.reduce(
    (preValue, currentValue) => preValue + currentValue?.loanAmount,
    0,
  );
  console.log(monthlyTotalBalance);
  const monthlyTotalLoanAmount = monthlyLoaner.reduce(
    (preValue, currentValue) => preValue + currentValue?.loanAmount,
    0,
  );
  const installments = useQuery<IInstallment>('Installments', install => {
    return install.filtered(
      'month == $0',
      Number(new Date().toLocaleDateString().split('/')[0]),
    );
  });
  const monthlyAllReadyTotalComes = installments.reduce(
    (preValue, currentValue) => preValue + currentValue?.amount,
    0,
  );

  // console.log(monthlyAllReadyTotalComes);
  return (
    <GlueStackProvider height="100%">
      <HeaderPlusBack />
      <Box>
        <Center pt="$3">
          <Text size="lg" color="$teal600">
            রিপোর্ট
          </Text>
        </Center>
        <Center py="$2">
          <Text size="lg" color="$teal600">
            সম্পূর্ন রিপোর্ট
          </Text>
        </Center>
        {/* <HStack
          justifyContent="space-between"
          alignItems="center"
          mx="4%"
          mb="$5">
          <TouchableOpacity
            style={{
              width: '48%',
            }}>
            <Box
              justifyContent="center"
              alignItems="center"
              py="$2"
              px="$5"
              bgColor="$teal600"
              rounded="$md">
              <Text color="$white">মাসিক</Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '48%',
            }}>
            <Box
              justifyContent="center"
              alignItems="center"
              py="$2"
              px="$5"
              bgColor="$teal600"
              rounded="$md">
              <Text color="$white">সম্পূর্ণ</Text>
            </Box>
          </TouchableOpacity>
        </HStack> */}
        <VStack gap="$2">
          <HStack mx="4%" justifyContent="space-between">
            <Text fontWeight="$semibold">মোট ব্যালেন্স</Text>
            <Text fontWeight="$black" color="$teal600">
              {totals?.totalBalance} ৳
            </Text>
          </HStack>
          <HStack mx="4%" justifyContent="space-between">
            <Text fontWeight="$semibold">মোট লোন</Text>
            <Text fontWeight="$black" color="$teal600">
              {totals?.totalLoan} ৳
            </Text>
          </HStack>

          <HStack mx="4%" justifyContent="space-between">
            <Text fontWeight="$semibold">মোট জমা</Text>
            <Text fontWeight="$black" color="$teal600">
              {totalInstallment} ৳
            </Text>
          </HStack>
          <HStack mx="4%" justifyContent="space-between">
            <Text fontWeight="$semibold">মোট ক্ষতি</Text>
            <Text fontWeight="$black" color="$teal600">
              {totalLossLoanAmount} ৳
            </Text>
          </HStack>
        </VStack>
        <Box mt="$3" mx="4%" justifyContent="flex-end" alignItems="flex-end">
          <Divider my="$1" bg="$teal600" w="30%" />
        </Box>
        <HStack mx="4%" justifyContent="space-between">
          <Text fontWeight="$semibold">মোট </Text>
          <Text fontWeight="$black" color="$teal600">
            {totalLossLoanAmount +
              totals?.totalComes +
              totals?.totalBalance -
              (totals?.totalComes - totals?.totalLoan)}
            ৳
          </Text>
        </HStack>
        <HStack mx="4%" justifyContent="space-between">
          <Text fontWeight="$semibold">মোট লাভ</Text>
          <Text fontWeight="$black" color="$teal600">
            {totals?.totalComes - totals?.totalLoan} ৳
          </Text>
        </HStack>

        <Center py="$2">
          <Text size="lg" color="$teal600">
            মাসিক রিপোর্ট
          </Text>
        </Center>
        <VStack gap="$2">
          <HStack mx="4%" justifyContent="space-between">
            <Text fontWeight="$semibold">মোট ব্যালেন্স</Text>
            <Text fontWeight="$black" color="$teal600">
              {monthlyTotalBalance -
                monthlyTotalLoanAmount +
                monthlyAllReadyTotalComes}
              ৳
            </Text>
          </HStack>
          <HStack mx="4%" justifyContent="space-between">
            <Text fontWeight="$semibold">মোট লোন</Text>
            <Text fontWeight="$black" color="$teal600">
              {monthlyTotalLoanAmount - monthlyAllReadyTotalComes} ৳
            </Text>
          </HStack>
          {/* <HStack mx="4%" justifyContent="space-between">
            <Text fontWeight="$semibold">মোট লাভ</Text>
            <Text fontWeight="$black" color="$teal600">
              {monthlyTotalComes - monthlyTotalLoanAmount} ৳
            </Text>
          </HStack> */}
          <HStack mx="4%" justifyContent="space-between">
            <Text fontWeight="$semibold">মোট মাসিক জমা</Text>
            <Text fontWeight="$black" color="$teal600">
              {monthlyAllReadyTotalComes} ৳
            </Text>
          </HStack>
          <HStack mx="4%" justifyContent="space-between">
            <Text fontWeight="$semibold">মোট ক্ষতি</Text>
            <Text fontWeight="$black" color="$teal600">
              {monthlyTotalLossLoanAmount} ৳
            </Text>
          </HStack>
        </VStack>
        <Box mt="$3" mx="4%" justifyContent="flex-end" alignItems="flex-end">
          <Divider my="$1" bg="$teal600" w="30%" />
        </Box>
        <HStack mx="4%" justifyContent="space-between">
          <Text fontWeight="$semibold">মোট </Text>
          <Text fontWeight="$black" color="$teal600">
            {monthlyTotalLossLoanAmount +
              totals.totalComes +
              totals.totalBalance}
            ৳
          </Text>
        </HStack>
      </Box>
    </GlueStackProvider>
  );
};

export default ReportScreen;
