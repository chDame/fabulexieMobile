import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './routes';

import { navigationRef } from './services/Navigation';


export default function App() {  
  
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          translucent={false}
          backgroundColor="#b7a387"
        />
        <Routes />
      </NavigationContainer>
    </Provider>
  );
};