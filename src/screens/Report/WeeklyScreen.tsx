import {TouchableOpacity} from 'react-native';
import React from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import HeaderPlusBack from '../../components/HeaderPlusBack';
import {useQuery} from '../../realm/realm';
import {IInstallment} from '../../types/interface';
import {ScrollView, Box, HStack, Text} from '@gluestack-ui/themed';
import DatePicker from 'react-native-date-picker';
import SingleInstallments from './SingleInstallments';
const WeeklyScreen = () => {
  const [date, setDate] = React.useState(new Date());
  console.log(date);
  const [open, setOpen] = React.useState(false);
  const installments = useQuery<IInstallment>(
    'Installments',
    install => {
      return install
        .filtered(
          'day == $0',
          Number(new Date(date).toLocaleDateString().split('/')[1]),
        )
        .filtered(
          'month == $0',
          Number(new Date(date).toLocaleDateString().split('/')[0]),
        )
        .filtered(
          'year == $0',

          Number(new Date(date).toLocaleDateString().split('/')[2]),
        );
    },
    [date],
  );

  const monthlyTotalComes = installments.reduce(
    (preValue, currentValue) => preValue + currentValue?.amount,
    0,
  );

  // console.log(installments);
  return (
    <GlueStackProvider height="100%">
      <HeaderPlusBack />
      <HStack mt="$2" px="$3" justifyContent="space-between">
        <Text color="$teal600" size="sm">
          মোট সদস্য : {monthlyTotalComes}
        </Text>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Text color="$teal600" size="sm">
            {new Date(date).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      </HStack>
      <ScrollView>
        <Box my="$3" pb="$6" mx="5%">
          {installments.map((item, index) => (
            <SingleInstallments key={item._id} item={item} />
          ))}
        </Box>
      </ScrollView>
      <Box w="100%" justifyContent="center" alignItems="center" bg="$teal700">
        <DatePicker
          modal={false}
          open={open}
          mode="date"
          date={date}
          textColor="white"
          fadeToColor="none"
          onDateChange={date => {
            setOpen(false);
            setDate(date);
          }}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </Box>
    </GlueStackProvider>
  );
};

export default WeeklyScreen;
