import {} from 'react-native';
import React from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import {Box} from '@gluestack-ui/themed';
import HeaderPlusBack from '../../components/HeaderPlusBack';

const CalculatorScreen = () => {
  return (
    <GlueStackProvider height="100%">
      <HeaderPlusBack />
    </GlueStackProvider>
  );
};

export default CalculatorScreen;
