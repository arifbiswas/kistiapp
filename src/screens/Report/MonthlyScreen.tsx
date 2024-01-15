import {} from 'react-native';
import React from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import HeaderPlusBack from '../../components/HeaderPlusBack';

const MonthlyScreen = () => {
  return (
    <GlueStackProvider height="100%">
      <HeaderPlusBack />
    </GlueStackProvider>
  );
};

export default MonthlyScreen;
