import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './routes';

import {navigationRef, isMountedRef} from './services/Navigation';

export default function App() {
  useEffect(() => {
    function init() {
      isMountedRef.current = true;
    }

    init();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor="#ede5db"
        />
        <Routes />
      </NavigationContainer>
    </Provider>
  );
};
/*
export default App;

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
