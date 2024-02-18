import {
  PermissionsAndroid,
  ToastAndroid,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import React from 'react';
LogBox.ignoreLogs(['new NativeEventEmitter']);
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
  FlatList,
} from '@gluestack-ui/themed';
import {IInstallment, ILoner, ITotals} from '../../types/interface';
import {useQuery, useRealm} from '../../realm/realm';

// import {
//   BLEPrinter,
// } from 'react-native-thermal-receipt-printer';

import {
  COMMANDS,
  ColumnAlignment,
} from 'react-native-thermal-receipt-printer-image-qr';

import {BleManager} from 'react-native-ble-plx';
import CustomModal from '../../components/customModal/CustomModal';

interface IBLEPrinter {
  device_name: string;
  inner_mac_address: string;
}

const WeeklyInstallmentScreen = ({route, navigation}: any) => {
  const savePrinter = useQuery<IBLEPrinter>('Printer');

  const BLT = new BleManager();
  const [modalOpen, setOpenModal] = React.useState(false);
  const [bluetoothEnable, setBluetoothEnable] = React.useState(false);
  const [printers, setPrinters] = React.useState([]);
  const [currentPrinter, setCurrentPrinter] = React.useState();

  const realm = useRealm();
  const item: ILoner = route?.params?.item;
  const totals = useQuery<ITotals>('Totals').find(item => item);
  const installments = useQuery<IInstallment>('Installments', install => {
    return install.filtered('userId == $0', item._id);
  });
  // console.log(installments);
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

  const getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      ]);

      return granted;
    } catch (err) {
      console.warn(err);
    }
  };

  const automation = React.useCallback(async () => {
    const granted = await getPermission();
    if (
      granted?.['android.permission.ACCESS_FINE_LOCATION'] ==
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      BLEPrinter.init().then(() => {
        BLEPrinter.getDeviceList().then(setPrinters);
      });
    }
  }, []);

  const _connectPrinter = printer => {
    //connect printer
    // console.log(printer);
    // BLEPrinter.connectPrinter(printer.inner_mac_address).then(
    //   () => {
    //     setCurrentPrinter(printer);
    //     setOpenModal(false);
    //     realm.write(() => {
    //       savePrinter.forEach(lolPrinter => {
    //         realm.delete(lolPrinter);
    //       });
    //       realm.create('Printer', {
    //         ...printer,
    //       });
    //     });
    //   },
    //   error => console.log(error),
    // );
  };

  const handlePrint = React.useCallback(
    async amount => {
      setOpenModal(true);
      automation();
      if (currentPrinter?.inner_mac_address) {
        //   BLEPrinter.printText(`id : ${item._id} \n
        // নাম : ${item.name}\n
        // ঠিকানা : ${item.address}\n
        // -----------------------\n
        // bill           : ${amount}
        // `);
      } else {
        if (savePrinter[0]._id) {
          // console.log(savePrinter[0].inner_mac_address);
          try {
            // BLEPrinter.connectPrinter(savePrinter[0].inner_mac_address).then(
            //   setCurrentPrinter({
            //     device_name: savePrinter[0].device_name,
            //     inner_mac_address: savePrinter[0].inner_mac_address,
            //   }),
            //   error => console.log(error),
            // );
          } catch (error) {
            console.log(error);
          }
        } else {
        }
      }
    },
    [currentPrinter, printers],
  );

  // const printBillTest = () => {
  //   currentPrinter && BLEPrinter.printBill('<C>sample bill</C>');
  // };

  console.log('lol' + currentPrinter);

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
                <TouchableOpacity
                  onPress={() => {
                    handlePrint(item.amount);
                  }}>
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
      <CustomModal
        modalVisible={modalOpen}
        appearance
        setModalVisible={setOpenModal}
        backButton
        height={450}
        Radius={20}>
        <Box>
          <HStack gap="$3">
            <TouchableOpacity onPress={() => {}}>
              <Box bg={'$teal600'} py="$1" px="$3" rounded="$md">
                <Text color="$white">Back</Text>
              </Box>
            </TouchableOpacity>
            <Text></Text>
          </HStack>
          <Box my="$5" h={380}>
            <FlatList
              data={printers}
              // numColumns={4}

              contentContainerStyle={{
                // justifyContent: 'center',
                gap: 20,
                // alignItems: 'center',
              }}
              keyExtractor={item => item.inner_mac_address}
              ListEmptyComponent={() => (
                <Box justifyContent="center" alignItems="center">
                  <Text color="$blueGray300">No Found any Folder & Files</Text>
                </Box>
              )}
              renderItem={({item}) => (
                <Box bgColor="$coolGray100" rounded="$md" py="$2" px="$5">
                  <HStack justifyContent="space-between" alignItems="center">
                    <Box>
                      <Text>{item.device_name}</Text>
                      <Text>{item.inner_mac_address}</Text>
                    </Box>
                    <TouchableOpacity
                      onPress={() => {
                        _connectPrinter(item);
                      }}>
                      <Box bgColor="$teal600" p="$2" rounded="$md">
                        <Text color="$white">Connect</Text>
                      </Box>
                    </TouchableOpacity>
                  </HStack>
                </Box>
              )}
            />
          </Box>
        </Box>
      </CustomModal>
    </GlueStackProvider>
  );
};

export default WeeklyInstallmentScreen;
