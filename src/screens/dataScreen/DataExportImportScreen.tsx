import {Alert, PermissionsAndroid, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import {Box, FlatList, HStack, Text, VStack} from '@gluestack-ui/themed';
import HeaderPlusBack from '../../components/HeaderPlusBack';

import RNFS from 'react-native-fs';
import {useQuery, useRealm} from '../../realm/realm';
import {IBalance, IInstallment, ILoner, ITotals} from '../../types/interface';
import CustomModal from '../../components/customModal/CustomModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DataExportImportScreen = () => {
  const Realm = useRealm();

  const [currentPath, setCurrentPath] = React.useState(
    RNFS.DownloadDirectoryPath,
  );
  const [modalOpen, setOpenModal] = React.useState(false);
  const [pathData, setPathData] = React.useState(null);
  const [uploadData, setUploadData] = React.useState({});
  const loaners = useQuery<ILoner>('Loaner');
  const balance = useQuery<IBalance>('Balance');
  const installments = useQuery<IInstallment>('Installments');
  const totals = useQuery<ITotals>('Totals');

  // console.log(balance[0].balance);

  const getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Please give Storage Permission',
          message: ' App needs access to your Storage ',
          buttonNegative: 'Denied',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // write the file
  // console.log(currentPath);
  const database = {loaners, totals, installments, balance};
  const handleExportData = () => {
    // console.log(RNFS.mkdir(RNFS.DownloadDirectoryPath + 'Lol'));
    if ('granted' !== PermissionsAndroid.RESULTS.GRANTED) {
      getPermission();
    }
    RNFS.write(
      RNFS.DownloadDirectoryPath + '/database2.text',
      JSON.stringify(database),
      565,
      'utf8',
    )
      .then(success => {
        Alert.alert(
          'সকল তথ্য সংগ্রহ করা হয়েছে',
          'ডাউনলোড ফোলডারে ডেটাবেস নামে একটি ফাইল তৈরি করে হয়েছে' +
            ' ' +
            'পুনোড়ায় ফাইলটি ব্যবহার করে সকল তথ্য আনা যাবে',
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const uploadDatabase = async (path: string) => {
    // console.log(path);
    // setOpenModal(false);
    RNFS.readFile(path)
      .then(result => {
        // const lol = JSON.stringify(result);
        // const lolPas = JSON.parse(lol);
        // console.log(result);
        // setUploadData(result);
      })
      .then(error => {
        console.log(error);
      });
  };

  const handleDeletedData = () => {
    // Realm.write(() => {
    Alert.alert(
      'ডিলেট করতে চান ?',
      'যদি ডিলেট করে ফেলেন , তাহলে আপনার তথ্য সব মুছে যাবে আর পাওয়া যাবে না',
      [
        {
          text: 'না',
          style: 'cancel',
        },
        {
          text: 'হ্যাঁ',
          style: 'default',
          onPress: () => {
            Realm.beginTransaction();
            Realm.deleteAll();
            Realm.commitTransaction();
          },
        },
      ],
    );
  };

  useEffect(() => {
    RNFS.readDir(currentPath)
      .then(result => {
        if (result) {
          setPathData(result);
        }
      })
      .then(error => {
        console.log(error);
      });
  }, [modalOpen, currentPath]);

  // console.log(currentPath === '/storage/emulated/0');

  // console.log(uploadData?.loaners);

  return (
    <GlueStackProvider height="100%">
      <HeaderPlusBack />
      <VStack mt="$12" gap="$4">
        <TouchableOpacity
          onPress={() => {
            handleExportData();
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box w={'50%'} bg="$teal600" py="$3" rounded="$md">
            <Text color="$white" textAlign="center">
              তথ্য সংগ্রহ করুন
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if ('granted' !== PermissionsAndroid.RESULTS.GRANTED) {
              getPermission();
            }
            setOpenModal(!modalOpen);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box w={'50%'} bg="$teal600" py="$3" rounded="$md">
            <Text color="$white" textAlign="center">
              তথ্য আনুন
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleDeletedData();
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box w={'50%'} bg="$red600" py="$3" rounded="$md">
            <Text color="$white" textAlign="center">
              সকল তথ্য মুছে ফেলুন
            </Text>
          </Box>
        </TouchableOpacity>
      </VStack>
      <CustomModal
        modalVisible={modalOpen}
        appearance
        setModalVisible={setOpenModal}
        backButton
        Radius={20}>
        <Box>
          <HStack gap="$3">
            <TouchableOpacity
              disabled={currentPath === '/storage/emulated/0'}
              onPress={() => {
                setCurrentPath(
                  currentPath
                    .split('/')
                    .slice(0, currentPath.split('/').length - 1)
                    .join('/'),
                );
              }}>
              <Box
                bg={
                  currentPath === '/storage/emulated/0'
                    ? '$coolGray600'
                    : '$teal600'
                }
                py="$1"
                px="$3"
                rounded="$md">
                <Text color="$white">Back</Text>
              </Box>
            </TouchableOpacity>
            <Text>/{currentPath.split('/').slice(-1)}</Text>
          </HStack>
          <Box my="$5" height={'85%'}>
            <FlatList
              data={pathData}
              // numColumns={4}

              contentContainerStyle={{
                // justifyContent: 'center',
                gap: 20,
                // alignItems: 'center',
              }}
              keyExtractor={(item, index) => index + item?.name}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    try {
                      if (item.name.includes('.')) {
                        // console.log('yes');
                        uploadDatabase(item.path);
                      }
                      if (!item.name.includes('.')) {
                        setCurrentPath(item.path);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}>
                  <HStack mx="$3" alignItems="center" gap="$3">
                    <Box>
                      {item.name.includes('.') ? (
                        <FontAwesome name="file" size={40} />
                      ) : (
                        <FontAwesome name="folder" size={40} />
                      )}
                    </Box>
                    <Text>{item.name}</Text>
                  </HStack>
                </TouchableOpacity>
              )}
            />
          </Box>
        </Box>
      </CustomModal>
    </GlueStackProvider>
  );
};

export default DataExportImportScreen;
