import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';
import styles from '../../styles';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import authService from '../../services/AuthService';
import { Ionicons } from '@expo/vector-icons';
import translate from '../../services/i18n';


const MyDrawerItem = (props:any) => (
  (props.icon!=null) ?
    <DrawerItem 
      label={props.label}
      onPress={props.action}
      style={props.focused ? (styles.drawerItemDivFocused) : ({})}
      labelStyle={props.focused ? (styles.drawerItemFocused) : ({})}
      icon={({ focused, color, size }) => (<Ionicons color={props.focused?'white':color} size={25} name={props.icon} style={props.iconStyle}/> )}
    />
  :
    <DrawerItem 
      label={props.label}
      onPress={props.action}
      style={props.focused ? (styles.drawerItemDivFocused) : ({})}
      labelStyle={props.focused ? (styles.drawerItemFocused) : ({})}
    />
)

function CustomDrawerContent(props: any) {
  const token = useSelector(
    (state: RootState) => state.auth.data.token,
  );

  const [currentRoute, setCurrentRoute] = useState('Home');
  const navigate = (route: string) => {
    setCurrentRoute(route);
    props.navigation.navigate(route);
  }
  const dispatch = useDispatch();
  return (
    (token=='offline') ? 
      <DrawerContentScrollView {...props} >
        <MyDrawerItem label="" action={() => props.navigation.closeDrawer()} icon="ios-arrow-dropleft-circle" iconStyle={styles.toggleDrawer}/>
        <MyDrawerItem label={translate('HOME')} action={() => navigate("Home")} focused={currentRoute=="Home"} icon="ios-home"/>
        <MyDrawerItem label={translate('SIGNOUT')} action={() =>  dispatch(authService.signOut())} icon="ios-log-out"/>
      </DrawerContentScrollView>
     : 
      <DrawerContentScrollView {...props} >
        <MyDrawerItem label="" action={() => props.navigation.closeDrawer()} icon="ios-arrow-dropleft-circle" iconStyle={styles.toggleDrawer}/>
        <MyDrawerItem label={translate('HOME')} action={() => navigate("Home")} focused={currentRoute=="Home"} icon="ios-home"/>
        <MyDrawerItem label={translate('PROFILE')} action={() => navigate("Profile")} focused={currentRoute=="Profile"} icon="ios-cog"/>
        <MyDrawerItem label={translate('DOCUMENTS')} action={() => navigate("Documents")} focused={currentRoute=="Documents"} icon="ios-journal"/>
        <MyDrawerItem label={translate('SIGNOUT')} action={() =>  dispatch(authService.signOut())} icon="ios-log-out"/>
      </DrawerContentScrollView>
    
  );
}

export default CustomDrawerContent;