import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import {GColors} from '../Styles/GColors';
import UserScreen from '../screens/users/UserScreen';
import UserDetailsScreen from '../screens/users/UserDetailsScreen';
import BalanceScreen from '../screens/balance/BalanceScreen';
import ProfitScreen from '../screens/profit/ProfitScreen';
import LossScreen from '../screens/loss/LossScreen';
import ReportScreen from '../screens/Report/ReportScreen';
import MonthlyScreen from '../screens/Report/MonthlyScreen';
import WeeklyScreen from '../screens/Report/WeeklyScreen';
import CalculatorScreen from '../screens/calculator/CalculatorScreen';
import UpdateUserScreen from '../screens/users/UpdateUserScreen';
import WeeklyInstallmentScreen from '../screens/users/WeeklyInstallmentScreen';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          statusBarAnimation: 'fade',
          statusBarStyle: 'auto',
          statusBarColor: GColors.primary,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          fullScreenGestureEnabled: true,
          animation: 'ios',
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUserScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WeeklyInstallment"
          component={WeeklyInstallmentScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Balance"
          component={BalanceScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profit"
          component={ProfitScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Loss"
          component={LossScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Report"
          component={ReportScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ReportMonthly"
          component={MonthlyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ReportWeekly"
          component={WeeklyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
