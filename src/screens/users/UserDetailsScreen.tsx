import {} from 'react-native';
import React from 'react';
import GlueStackProvider from '../../gluestack_config/gluestackProvider';
import HeaderPlusBack from '../../components/HeaderPlusBack';

const UserDetailsScreen = () => {
  return (
    <GlueStackProvider>
      <HeaderPlusBack />
    </GlueStackProvider>
  );
};

export default UserDetailsScreen;
