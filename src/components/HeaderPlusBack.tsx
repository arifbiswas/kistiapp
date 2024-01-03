import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Box, HStack, Text} from '@gluestack-ui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
const HeaderPlusBack = () => {
  const navigation = useNavigation();
  return (
    <Box
      bgColor="$teal600"
      height="8%"
      w="100%"
      px="3%"
      //   alignItems="center"
      justifyContent="center">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <HStack alignItems="center" gap="$1">
          <AntDesign name="arrowleft" size={25} color="white" />
          <Text color="$white" fontWeight="bold">
            পিছনে
          </Text>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};

export default HeaderPlusBack;
