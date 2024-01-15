import React from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import HeaderPlusBack from '../../components/HeaderPlusBack';
import {ILoner} from '../../types/interface';
import {
  Avatar,
  AvatarFallbackText,
  HStack,
  Text,
  VStack,
  Box,
  Divider,
  Center,
  ScrollView,
} from '@gluestack-ui/themed';

const UserDetailsScreen = ({route, navigation}: any) => {
  const item: ILoner = route?.params;
  return (
    <GlueStackProvider>
      <HeaderPlusBack />
      <Box
        bgColor="$teal600"
        w="100%"
        h="15%"
        alignItems="center"
        justifyContent="center">
        <Text size="4xl" fontWeight="bold" color="$white">
          {item?.name}
        </Text>
        {/* <AvatarImage
                    source={{
                      uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=80&q=60',
                    }}
                    alt="name"
                  /> */}
      </Box>
      <ScrollView>
        <VStack gap="$3" alignItems="center" my="$4" mx="$4">
          <Center>
            <Box bgColor="$teal600" p="$1" rounded="$md">
              <Text size="sm" color="$white" fontWeight="bold">
                পরিচয়
              </Text>
            </Box>
          </Center>
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text size="sm" color="$coolGray600">
              পিতার নাম :
            </Text>
            <Text size="sm" color="$teal600" fontWeight="$black">
              {item.fatherName}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text size="sm" color="$coolGray600">
              মাতার নাম :
            </Text>
            <Text size="sm" color="$teal600" fontWeight="$black">
              {item.motherName}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text size="sm" color="$coolGray600">
              ঠিকানা :
            </Text>
            <Text size="sm" color="$teal600" fontWeight="$black">
              {item?.address}
            </Text>
          </HStack>

          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text size="sm" color="$teal600" fontWeight="$black">
              মোবাইল : {item.mobile}
            </Text>
            <Text size="sm" color="$teal600" fontWeight="$black">
              এন আইডি : {item.nid}
            </Text>
          </HStack>
          <Divider bgColor="$teal600" />
          <Center>
            <Box bgColor="$teal600" p="$1" rounded="$md">
              <Text size="sm" color="$white" fontWeight="bold">
                হিসাব
              </Text>
            </Box>
          </Center>
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text size="sm" color="$coolGray600">
              ঋনের পরিমাণ :
            </Text>
            <Text size="sm" color="$teal600" fontWeight="$black">
              {item.loanAmount}
            </Text>
          </HStack>

          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text size="sm" color="$coolGray600">
              কিস্তি সংখা :
            </Text>
            <Text size="sm" color="$teal600" fontWeight="$black">
              {item.loanLead}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text size="sm" color="$coolGray600">
              বই জমা :
            </Text>
            <Text size="sm" color="$teal600" fontWeight="$black">
              {item.extraCharge}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text size="sm" color="$coolGray600">
              লাভ :
            </Text>
            <Text size="sm" color="$teal600" fontWeight="$black">
              {item.profit}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text
              size="sm"
              color={item.loss ? '$red600' : '$teal600'}
              fontWeight="$black">
              পরিশোধ করবে :{' '}
              {item.loss ? 'পাওয়া যাবে না' : item.loanAmount + item.profit}
            </Text>
            <Text
              size="sm"
              color={item.loss ? '$red600' : '$teal600'}
              fontWeight="$black">
              মোট টাকা : {item.loanAmount + item.extraCharge + item.profit}
            </Text>
          </HStack>
          <Divider bgColor="$teal600" />
          <Center>
            <Box bgColor="$teal600" p="$1" rounded="$md">
              <Text size="xs" color="$white" fontWeight="bold">
                রেফারের পরিচয়
              </Text>
            </Box>
          </Center>
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text size="sm" color="$coolGray600">
              রেফারের নাম :
            </Text>
            <Text size="sm" color="$teal600" fontWeight="$black">
              {item.referName}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text size="sm" color="$coolGray600">
              রেফারের ঠিকানা :
            </Text>
            <Text size="sm" color="$teal600" fontWeight="$black">
              {item.referAddress}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Text size="sm" color="$coolGray600">
              রেফারের মোবাইল :
            </Text>
            <Text size="sm" color="$teal600" fontWeight="$black">
              {item.referMobile}
            </Text>
          </HStack>
        </VStack>
      </ScrollView>
    </GlueStackProvider>
  );
};

export default UserDetailsScreen;
