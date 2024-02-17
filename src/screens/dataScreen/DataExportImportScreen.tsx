import {
  Alert,
  PermissionsAndroid,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import {
  Box,
  FlatList,
  HStack,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import HeaderPlusBack from '../../components/HeaderPlusBack';

import RNFS from 'react-native-fs';
import sizeOf from 'sizeof';
import {useQuery, useRealm} from '../../realm/realm';
import {IBalance, IInstallment, ILoner, ITotals} from '../../types/interface';
import CustomModal from '../../components/customModal/CustomModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Realm from 'realm';
import {GColors} from '../../Styles/GColors';

interface IDatabase {
  loaners: [ILoner];
  totals: [ITotals];
  installments: [IInstallment];
  balance: [IBalance];
}

const DataExportImportScreen = () => {
  const navigation = useNavigation();
  const realm = useRealm();

  const [currentPath, setCurrentPath] = React.useState(
    RNFS.DownloadDirectoryPath,
  );
  const [modalOpen, setOpenModal] = React.useState(false);
  const [isExport, setIsExport] = React.useState(false);
  const [exportTextName, setExportTextName] = React.useState('');
  const [pathData, setPathData] = React.useState([]);
  const [uploadData, setUploadData] = React.useState<IDatabase | never>();
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
          // buttonNegative: 'Denied',
          buttonNeutral: 'এখন না',

          buttonPositive: 'ওকে',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Storage');
      } else {
        console.log('Storage permission denied');
        navigation.goBack();
      }
      return granted;
    } catch (err) {
      console.warn(err);
    }
  };

  // write the file
  // console.log(currentPath);
  const database = {loaners, totals, installments, balance};
  const handleExportData = () => {
    if (!exportTextName) {
      ToastAndroid.showWithGravity(
        'ডেটাবেসের সুন্দর একটি নাম দিন !',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }
    // console.log(RNFS.mkdir(RNFS.DownloadDirectoryPath + 'Lol'));
    RNFS.writeFile(
      RNFS.DownloadDirectoryPath + '/' + (exportTextName + '.json'),
      JSON.stringify(database),
      'utf8',
    )
      .then(success => {
        console.log(success);
        ToastAndroid.showWithGravity(
          'সকল তথ্য সংগ্রহ করা হয়েছে' +
            `${RNFS.DownloadDirectoryPath}/${exportTextName}.json`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setExportTextName('');
        setIsExport(false);
        setOpenModal(!modalOpen);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const uploadDatabase = async (path: string) => {
    // console.log(path);
    setOpenModal(false);
    const data = RNFS.readFile(path, 'utf8')
      .then(contents => {
        // log the file contents
        setUploadData(JSON.parse(contents));
      })
      .catch(err => {
        console.log(err.message, err.code);
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
            realm.beginTransaction();
            realm.deleteAll();
            realm.commitTransaction();
          },
        },
      ],
    );
  };
  // console.log(PermissionsAndroid.PERMISSIONS);

  //------------------ আগুন শুরু 💫----------------------

  const handleMarge = (data: {
    loners: ILoner;
    balance: IBalance;
    totals: ITotals;
    installments: IInstallment;
  }) => {
    //----------------- totals start--------------------------
    realm.write(() => {
      uploadData?.totals.forEach(item => {
        const check = realm
          .objectForPrimaryKey('Totals', Realm.BSON.ObjectId(item._id))
          ?.isValid();

        if (!check) {
          realm.create('Totals', {
            _id: Realm.BSON.ObjectId(item._id),
            totalBalance: item.totalBalance,
            totalComes: item.totalComes,
            totalLoan: item.totalLoan,
          });
        }
      });
    });
    //----------------- totals end--------------------------

    //----------------- balance start -------------------------------
    realm.write(() => {
      uploadData?.balance.forEach(item => {
        const check = realm
          .objectForPrimaryKey('Balance', Realm.BSON.ObjectId(item._id))
          ?.isValid();

        if (!check) {
          realm.create('Balance', {
            _id: Realm.BSON.ObjectId(item._id),
            balance: item.balance,
            createdAt: item.createdAt,
            day: item.day,
            month: item.month,
            updatedAt: item.updatedAt,
            year: item.year,
          });
        }
      });
    });
    //----------------- balance end -------------------------------

    //---------------------  loaners start -----------------------------
    realm.write(() => {
      uploadData?.loaners.forEach(item => {
        const check = realm
          .objectForPrimaryKey('Loaner', Realm.BSON.ObjectId(item._id))
          ?.isValid();

        if (!check) {
          realm.create('Loaner', {
            _id: Realm.BSON.ObjectId(item._id),
            address: item.address,
            createdAt: item.createdAt,
            day: item.day,
            extraCharge: item.extraCharge,
            fatherName: item.fatherName,
            isLoss: item.isLoss,
            loanAmount: item.loanAmount,
            loanLead: item.loanLead,
            mobile: item.mobile,
            month: item.month,
            motherName: item.motherName,
            name: item.name,
            nid: item.nid,
            profit: item.profit,
            referAddress: item.referAddress,
            referMobile: item.referMobile,
            referName: item.referName,
            totalInstallment: item.totalInstallment,
            updatedAt: item.updatedAt,
            year: item.year,
          });
        }
      });
    });
    //---------------------  loaners end -----------------------------

    // ------------------ installments start --------------------------
    realm.write(() => {
      uploadData?.installments.forEach(item => {
        const check = realm
          .objectForPrimaryKey('Installments', Realm.BSON.ObjectId(item._id))
          ?.isValid();

        if (!check) {
          realm.create('Installments', {
            _id: Realm.BSON.ObjectId(item._id),
            amount: item.amount,
            createdAt: item.createdAt,
            day: item.day,
            month: item.month,
            updatedAt: item.updatedAt,
            userId: Realm.BSON.ObjectId(item.userId),
            year: item.year,
          });
        }
      });
    });
    // ------------------ installments end --------------------------
    setUploadData(null);
    ToastAndroid.showWithGravity(
      'পূর্বের সব তথ্য এক সাথে সংযোগ করা হয়েছে',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };

  //------------------ আগুন শেষ 💫----------------------

  const automation = useCallback(async () => {
    const granted = await getPermission();

    if (currentPath && granted == PermissionsAndroid.RESULTS.GRANTED) {
      RNFS.readDir(currentPath)
        .then(result => {
          if (result) {
            setPathData(result);
          }
        })
        .then(error => {
          console.log(error);
        });
    }
  }, [modalOpen, currentPath, exportTextName]);

  useEffect(() => {
    automation();
  }, [modalOpen, currentPath, exportTextName]);

  // console.log(currentPath === '/storage/emulated/0');
  console.log(uploadData);
  return (
    <GlueStackProvider height="100%">
      <HeaderPlusBack />

      <VStack mt="$2" gap="$4">
        <Box paddingHorizontal="$4" mt="$2">
          <Text fontWeight="$bold" color="$teal600" size="xs">
            বর্তমান ডেটাবেস
          </Text>
          <HStack justifyContent="space-between">
            <Text fontWeight="$bold" width="30%">
              গ্রাহকের তথ্য :
            </Text>
            <Text fontWeight="$black" color="$teal700">
              {loaners.length}
            </Text>
            <Text fontWeight="$black" color="$teal700">
              {sizeOf.sizeof(loaners, true)}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="$bold" width="30%">
              ব্যালেন্সের তথ্য :
            </Text>
            <Text fontWeight="$black" color="$teal700">
              {balance.length}
            </Text>
            <Text fontWeight="$black" color="$teal700">
              {sizeOf.sizeof(balance, true)}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="$bold" width="30%">
              সাপ্তাহিক তথ্য :
            </Text>
            <Text fontWeight="$black" color="$teal700">
              {installments.length}
            </Text>
            <Text fontWeight="$black" color="$teal700">
              {sizeOf.sizeof(installments, true)}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="$bold" width="30%">
              অনন্য তথ্য :
            </Text>
            <Text fontWeight="$black" color="$teal700">
              {totals.length}
            </Text>
            <Text fontWeight="$black" color="$teal700">
              {sizeOf.sizeof(totals, true)}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="$bold" width="30%">
              মোট :
            </Text>

            <Text fontWeight="$black" color="$teal700">
              {sizeOf.sizeof(database, true)}
            </Text>
          </HStack>
        </Box>
        <Box>
          <Text mx="$4" size="sm" my="$1">
            Export Folder :
          </Text>
          <HStack
            borderColor="$blueGray400"
            borderWidth="$1"
            mx="$4"
            justifyContent="space-between"
            alignItems="center"
            rounded="$md">
            <Text mx="$3">/{currentPath.split('/').slice(-1)}</Text>

            <TouchableOpacity
              onPress={() => {
                setIsExport(true);
                setOpenModal(!modalOpen);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Box
                p="$1"
                rounded="$md"
                borderColor="$blueGray400"
                borderWidth="$1"
                px="$3">
                <FontAwesome name="folder" size={30} color={GColors.primary} />
              </Box>
            </TouchableOpacity>
          </HStack>
        </Box>
        <Box>
          <Text mx="$4" size="sm" my="$1">
            Import Folder :
          </Text>
          <HStack
            borderColor="$blueGray400"
            borderWidth="$1"
            mx="$4"
            justifyContent="space-between"
            alignItems="center"
            rounded="$md">
            <Text mx="$3">/{currentPath.split('/').slice(-1)}</Text>

            <TouchableOpacity
              onPress={() => {
                setOpenModal(!modalOpen);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Box
                p="$1"
                rounded="$md"
                borderColor="$blueGray400"
                borderWidth="$1"
                px="$3">
                <FontAwesome name="folder" size={30} color={GColors.primary} />
              </Box>
            </TouchableOpacity>
          </HStack>
        </Box>

        {uploadData?.loaners && (
          <Box paddingHorizontal="$4" mt="$2">
            <HStack justifyContent="space-between">
              <Text fontWeight="$bold" width="30%">
                গ্রাহকের তথ্য :
              </Text>
              <Text fontWeight="$black" color="$teal700">
                {uploadData?.loaners?.length}
              </Text>
              <Text fontWeight="$black" color="$teal700">
                {sizeOf.sizeof(uploadData?.loaners, true)}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontWeight="$bold" width="30%">
                ব্যালেন্সের তথ্য :
              </Text>
              <Text fontWeight="$black" color="$teal700">
                {uploadData?.balance?.length}
              </Text>
              <Text fontWeight="$black" color="$teal700">
                {sizeOf.sizeof(uploadData?.balance, true)}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontWeight="$bold" width="30%">
                সাপ্তাহিক তথ্য :
              </Text>
              <Text fontWeight="$black" color="$teal700">
                {uploadData?.installments?.length}
              </Text>
              <Text fontWeight="$black" color="$teal700">
                {sizeOf.sizeof(uploadData?.installments, true)}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontWeight="$bold" width="30%">
                অনন্য তথ্য :
              </Text>
              <Text fontWeight="$black" color="$teal700">
                {uploadData?.totals?.length}
              </Text>
              <Text fontWeight="$black" color="$teal700">
                {sizeOf.sizeof(uploadData?.totals, true)}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontWeight="$bold" width="30%">
                মোট :
              </Text>

              <Text fontWeight="$black" color="$teal700">
                {sizeOf.sizeof(uploadData, true)}
              </Text>
            </HStack>
            <TouchableOpacity
              onPress={() => {
                handleMarge(uploadData);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Box w={'50%'} bg="$green600" py="$3" rounded="$md">
                <Text color="$white" textAlign="center">
                  মার্জ করুন
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
        )}
      </VStack>
      <CustomModal
        modalVisible={modalOpen}
        appearance
        setModalVisible={setOpenModal}
        backButton={isExport ? false : true}
        height={450}
        Radius={20}>
        <Box>
          <HStack gap="$3">
            <TouchableOpacity
              disabled={currentPath === '/storage/emulated/0'}
              onPress={() => {
                setCurrentPath(
                  currentPath
                    .split('/')
                    .slice(0, currentPath.split('/')?.length - 1)
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
          <Box my="$5" h={isExport ? 310 : 380}>
            <FlatList
              data={pathData}
              // numColumns={4}

              contentContainerStyle={{
                // justifyContent: 'center',
                gap: 20,
                // alignItems: 'center',
              }}
              keyExtractor={(item, index) => index + item?.name}
              ListEmptyComponent={() => (
                <Box justifyContent="center" alignItems="center">
                  <Text color="$blueGray300">No Found any Folder & Files</Text>
                </Box>
              )}
              renderItem={({item}) => (
                <TouchableOpacity
                  disabled={isExport}
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
          {isExport && (
            <HStack gap="$2" alignItems="center">
              <Input flex={1}>
                <InputField
                  color="$blueGray600"
                  fontWeight="$semibold"
                  placeholder="file name"
                  onChangeText={(text: string) => setExportTextName(text)}
                  value={exportTextName}
                />
              </Input>

              <TouchableOpacity
                onPress={() => {
                  setIsExport(false);
                  setOpenModal(!modalOpen);
                }}>
                <Box
                  justifyContent="center"
                  alignItems="center"
                  py="$2"
                  px="$4"
                  bgColor="$red800"
                  rounded="$md">
                  <Text color="$white">Cancel</Text>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleExportData();
                }}>
                <Box
                  justifyContent="center"
                  alignItems="center"
                  py="$2"
                  px="$4"
                  bgColor="$teal600"
                  rounded="$md">
                  <Text color="$white">Save</Text>
                </Box>
              </TouchableOpacity>
            </HStack>
          )}
        </Box>
      </CustomModal>
      <TouchableOpacity
        onPress={() => {
          handleDeletedData();
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Box w={'50%'} bg="$red800" py="$3" mt="10%" rounded="$md">
          <Text color="$white" textAlign="center">
            সকল তথ্য মুছে ফেলুন
          </Text>
        </Box>
      </TouchableOpacity>
    </GlueStackProvider>
  );
};

export default DataExportImportScreen;
