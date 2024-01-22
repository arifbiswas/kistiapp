import {TouchableOpacity} from 'react-native';
import React from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import HeaderPlusBack from '../../components/HeaderPlusBack';
import {useQuery} from '../../realm/realm';
import {IInstallment} from '../../types/interface';
import {ScrollView, Box, HStack, Text} from '@gluestack-ui/themed';
import DatePicker from 'react-native-date-picker';
const MonthlyScreen = () => {
  const [date, setDate] = React.useState(new Date());
  console.log(date);
  const [open, setOpen] = React.useState(false);
  const installments = useQuery<IInstallment>('Installments', install => {
    return install.filtered(
      'month == $0',
      Number(new Date().toLocaleDateString().split('/')[0]),
    );
  });

  const monthlyTotalComes = installments.reduce(
    (preValue, currentValue) => preValue + currentValue?.amount,
    0,
  );

  console.log(installments);
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
            <Box
              key={item._id}
              p="$2"
              // style={{
              //   borderStyle: 'dashed',
              //   borderBottomColor: 'gray',
              //   borderBottomWidth: 1,
              // }}
            >
              <HStack justifyContent="space-between">
                <Text color="$coolGray500" fontWeight="bold" size="sm">
                  {item.createdAt?.toLocaleDateString()}
                </Text>
                <Text color="$teal600" fontWeight="bold">
                  {item.amount}
                </Text>
                {/* <TouchableOpacity>
                  <Box bgColor="$teal600" py="$1" px="$3" rounded="$md">
                    <Text color="$white" fontWeight="$bold">
                      প্রিন্ট
                    </Text>
                  </Box>
                </TouchableOpacity> */}
              </HStack>
            </Box>
          ))}
        </Box>
      </ScrollView>
      <DatePicker
        modal={true}
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </GlueStackProvider>
  );
};

export default MonthlyScreen;
