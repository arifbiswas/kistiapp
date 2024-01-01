import React from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';

function GlueStackProvider({children}: any): JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.white,
    // height: '100%',
  };

  return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>;
}

export default GlueStackProvider;

// <SafeAreaView style={backgroundStyle}>
{
  /* <StatusBar
      // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      // barStyle={'light-content'}
      // backgroundColor={globalStyle.primary}
      /> */
}
// </SafeAreaView>
