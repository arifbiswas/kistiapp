import {ToastAndroid, TouchableOpacity} from 'react-native';
import React from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import HeaderPlusBack from '../../components/HeaderPlusBack';
import {
  Box,
  Divider,
  HStack,
  Input,
  InputField,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {IInstallment, ILoner, ITotals} from '../../types/interface';
import {useQuery, useRealm} from '../../realm/realm';

const WeeklyInstallmentScreen = ({route}: any) => {
  const realm = useRealm();
  const item: ILoner = route?.params?.item;
  const totals = useQuery<ITotals>('Totals').find(item => item);
  const installments = useQuery<IInstallment>('Installments', install => {
    return install.filtered('userId == $0', item._id);
  });
  console.log(installments);
  const [data, setData] = React.useState({
    amount: 500,
    userId: item._id,
  });

  const InstallmentHandler = React.useCallback(
    (installment: IInstallment) => {
      console.log(installment);
      const findLoner = realm.objectForPrimaryKey<ILoner>('Loaner', item._id);
      if (findLoner?.isValid()) {
        try {
          realm.write(() => {
            findLoner.loanLead = findLoner.loanLead - 1;
            findLoner.totalInstallment =
              findLoner.totalInstallment - installment.amount;
          });
          if (totals?.isValid()) {
            realm.write(() => {
              totals.totalBalance = totals.totalBalance + installment.amount;
              totals.totalLoan = totals.totalLoan - installment.amount;
              totals.totalComes = totals.totalComes - installment.amount;
            });
          }

          realm.write(() => {
            realm.create('Installments', {
              ...installment,
            });
          });
          ToastAndroid.showWithGravity(
            `জমা করা হয়েছে`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
    [data],
  );

  return (
    <GlueStackProvider height="100%">
      <HeaderPlusBack />
      <Box mt="$2" mx="$3">
        <Text color="$teal600">জমা সংখ্যা : {installments.length}</Text>
      </Box>
      <Box mx="4%" mt="$4" mb="$10" py="$5" softShadow="1" rounded="$md">
        <HStack justifyContent="center" gap="$3" alignItems="center">
          <Input w="45%" size="lg">
            <InputField
              size="lg"
              placeholder="টাকার পরিমাণ"
              keyboardType="numeric"
              onChangeText={value => setData({...data, amount: Number(value)})}
              value={`${data.amount}`}
            />
          </Input>
          <TouchableOpacity onPress={() => InstallmentHandler(data)}>
            <Box px="$3" py="$2" bgColor="$teal600" rounded="$md">
              <Text color="$white">সাপ্তাহিক জমা</Text>
            </Box>
          </TouchableOpacity>
        </HStack>
      </Box>
      <Divider />
      <ScrollView>
        <Box my="$3" pb="$6" mx="5%">
          {installments.map((item, index) => (
            <Box
              key={item._id}
              p="$3"
              style={{
                borderStyle: 'dashed',
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}>
              <HStack justifyContent="space-between">
                <Text color="$coolGray500" fontWeight="bold">
                  {item.createdAt?.toLocaleDateString()}
                </Text>
                <Text color="$teal600" fontWeight="bold">
                  {item.amount}
                </Text>
                <TouchableOpacity>
                  <Box bgColor="$teal600" py="$1" px="$3" rounded="$md">
                    <Text color="$white" fontWeight="$bold">
                      প্রিন্ট
                    </Text>
                  </Box>
                </TouchableOpacity>
              </HStack>
            </Box>
          ))}
        </Box>
      </ScrollView>
    </GlueStackProvider>
  );
};

export default WeeklyInstallmentScreen;
