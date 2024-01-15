import {} from 'react-native';
import React from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import {Box, Center, HStack, Text, VStack} from '@gluestack-ui/themed';
import HeaderPlusBack from '../../components/HeaderPlusBack';
import {useQuery} from '../../realm/realm';

const LossScreen = () => {
  const allLoaner = useQuery('Loaner', loaner => {
    return loaner.filtered('loss == $0', true);
  });
  const totalLoanAmount = allLoaner.reduce(
    (preValue, currentValue) => preValue + currentValue?.loanAmount,
    0,
  );
  const totalProfit = allLoaner.reduce(
    (preValue, currentValue) => preValue + currentValue?.profit,
    0,
  );
  return (
    <GlueStackProvider height="100%">
      <HeaderPlusBack />
      <Box py="$2" px="$2">
        <Text color="$teal600" size="md">
          মোট ক্ষতি : {totalLoanAmount + totalProfit}
        </Text>
      </Box>
      <Box mx="2%">
        {allLoaner.map((item, index) => (
          <Box
            key={index}
            p="$2"
            style={{
              borderStyle: 'dashed',
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack gap="$2">
                <Center h="$12" w="$12" rounded="$full" bgColor="$teal600">
                  <Text color="$white" fontWeight="$bold">
                    {item.name.slice(0, 1)}
                  </Text>
                </Center>
                <VStack>
                  <Text>{item.name}</Text>
                  <Text>
                    {item.loanAmount} + {item.profit}
                  </Text>
                </VStack>
              </HStack>
              <Text size="md" fontWeight="$bold" color="$teal600">
                {item.loanAmount + item.profit}
              </Text>
            </HStack>
          </Box>
        ))}
      </Box>
    </GlueStackProvider>
  );
};

export default LossScreen;
