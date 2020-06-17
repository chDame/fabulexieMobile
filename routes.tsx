import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DocumentsScreen from './pages/Documents';
import ProfileScreen from './pages/Profile';
import HomeScreen from './pages/Home';
import ReadScreen from './pages/Read';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import CustomDrawerContent from './components/DrawerContent'
import translate from './services/i18n';
import authService from './services/AuthService';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function Main(props:any) {
  return (
    <Stack.Navigator screenOptions={stackNavOptions} initialRouteName="Home">
      <Stack.Screen name="Home" options={{headerTitle: translate('HOME')}} component={HomeScreen} />
      <Stack.Screen name="Profile" options={{headerTitle: translate('PROFILE')}} component={ProfileScreen} />
      <Stack.Screen name="Documents" options={{headerTitle: translate('DOCUMENTS')}} component={DocumentsScreen} />
      <Stack.Screen name="Read" component={ReadScreen} />
    </Stack.Navigator>
  );
}

function Routes() {

  return !authService.isAuthenticated() ? (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  ) : (
    <Drawer.Navigator drawerStyle={{backgroundColor: "#d7c3a7"}} drawerContentOptions={{ activeBackgroundColor: 'pink', activeTintColor: '#ffffff' }} drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Main" component={Main} />
    </Drawer.Navigator>
  );
};

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/fabulexie.png')}
    />
  );
}
function ToggleDrawerButton(props:any) {
  const navigation = useNavigation();
  return (
    <Ionicons name="ios-menu" size={26} color="#fff" onPress={() => navigation.toggleDrawer()}
    style={{padding:10}}/>
  );
}
const stackNavOptions = {
  headerStyle: {
    backgroundColor: '#d7c3a7',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  
  headerTitleAlign: 'center',
  headerLeft: () => ( <ToggleDrawerButton/> ),
  headerRight: () => (<LogoTitle/>)
};
export default Routes;