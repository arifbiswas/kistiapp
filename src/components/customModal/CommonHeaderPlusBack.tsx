import React, {useState} from 'react';
import {Box, HStack, Input, InputField, Text, View} from '@gluestack-ui/themed';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GColors} from '../../Styles/GColors';

type CommonHeaderProps = {
  isBack?: boolean;
  title?: string;
  isSearch?: boolean;
  searchText?: string;
  setSearchText?: Function | any;
};

const CommonHeaderPlusBack = ({
  isBack,
  title,
  isSearch,
  setSearchText,
  searchText,
}: CommonHeaderProps) => {
  const [goSearch, setGoSearch] = useState(false);
  const navigation = useNavigation();
  return (
    <Box
      style={{
        backgroundColor: GColors.primary,
      }}
      h="$16"
      //   borderBottomRightRadius={10}
      //   borderBottomLeftRadius={10}
      px="$2">
      <HStack alignItems="center" justifyContent="space-between" h="$16">
        {!goSearch && (
          <HStack alignItems="center">
            {isBack && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <HStack alignItems="center" gap="$1">
                  <AntDesign name="arrowleft" size={25} color="white" />
                  <Text color="$white" fontWeight="bold">
                    পিছনে
                  </Text>
                </HStack>
              </TouchableOpacity>
            )}
            <View px="$2" py="$2">
              <Text color="white" fontSize="$md">
                {title}
              </Text>
            </View>
          </HStack>
        )}
        {goSearch && (
          <HStack alignItems="center">
            <TouchableOpacity onPress={() => setGoSearch(!goSearch)}>
              <View px="$2" py="$2">
                <Ionicons name="close" size={30} color="white" />
              </View>
            </TouchableOpacity>

            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              w="73%"
              mx="$2">
              <InputField
                placeholder="search..."
                placeholderTextColor="$white"
                color="$white"
                onChangeText={value => setSearchText(value)}
                value={searchText}
              />
            </Input>
            <TouchableOpacity onPress={() => console.log(searchText)}>
              <View px="$2" py="$2">
                <Feather name="search" size={25} color="white" />
              </View>
            </TouchableOpacity>
          </HStack>
        )}
        {!goSearch && isSearch && (
          <TouchableOpacity onPress={() => setGoSearch(!goSearch)}>
            <View px="$2" py="$2">
              <Feather name="search" size={25} color="white" />
            </View>
          </TouchableOpacity>
        )}
      </HStack>
    </Box>
  );
};

export default CommonHeaderPlusBack;
