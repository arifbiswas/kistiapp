import {} from 'react-native';
import React from 'react';
import {Box, HStack, Text} from '@gluestack-ui/themed';
import {useObject} from '../../realm/realm';
import {IInstallment, ILoner} from '../../types/interface';

export default function SingleInstallments({item}: any) {
  const loaner = useObject<ILoner>('Loaner', item.userId);
  console.log(loaner);
  return (
    <Box
      p="$2"
      // style={{
      //   borderStyle: 'dashed',
      //   borderBottomColor: 'gray',
      //   borderBottomWidth: 1,
      // }}
    >
      <HStack justifyContent="space-between">
        <Text color="$teal600" fontWeight="bold">
          {loaner?.name}
        </Text>
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
  );
}
