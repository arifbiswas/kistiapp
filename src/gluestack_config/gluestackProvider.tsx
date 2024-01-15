import React from 'react';
import {createProvider} from '@gluestack-ui/provider';
import {StyledProvider} from '@gluestack-style/react';
import {OverlayProvider} from '@gluestack-ui/overlay';
import {ToastProvider} from '@gluestack-ui/toast';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {config} from '@gluestack-ui/config';
import {Box} from '@gluestack-ui/themed';

const GluestackUIStyledProvider = createProvider({StyledProvider});

function GlueStackProvider({children, height, ...props}: any): JSX.Element {
  return (
    <GluestackUIStyledProvider config={config}>
      <OverlayProvider>
        <ToastProvider>
          <Box height={height}>{children}</Box>
        </ToastProvider>
      </OverlayProvider>
    </GluestackUIStyledProvider>
  );
}

export default GlueStackProvider;
