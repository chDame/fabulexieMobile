import React, { useState } from 'react';
import styles, { iconColor, textColor } from '../styles';
import { TextInput, Image, View } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useLinkProps } from '@react-navigation/native';

export const Container = (props:any) => (
  <View style={styles.container} {...props} />
)

export const Btn = (props:any) => (
  <Button {...props} 
    icon={props.icon ? 
      <Ionicons
        name={props.icon}
        size={24}
        color="white"
        style={styles.btnIcon}
      />
      :{}
    }
  />
)

export const BtnBlock = (props:any) => (
  <Btn containerStyle={{width: '100%', marginLeft: 0}} {...props} />
)

export const Logo = (props:any) => (
  <Image style={styles.logo} {...props} />
)

/*export const InputText = (props:any) => (
  <Input {...props} 
    onFocus={() => props.focused = true }
    onBlur={() => props.focused = false }
    inputContainerStyle={this?isFocused ? styles.inputFocused : {}}/>
)*/

export const AlertError = (props:any) => (
  <Text style={styles.alertError} {...props} />
)

export function InputText({...props}) {
  const [focus, setFocus] = useState(false);
  return(
    <Input {...props} 
      style={styles.input}
      inputStyle={{color:textColor}}
      onFocus={() => setFocus(true)}
      onBlur={() =>setFocus(false)}
      inputContainerStyle={focus? styles.inputFocused : styles.input}
      leftIcon={props.icon ? 
        <Ionicons
          name={props.icon}
          size={24}
          color={iconColor}
          style={styles.inputIcon}
        />
        :{}
      }/>
    )
}
/*
export const InputTextIcon = (props:any) => (
  <InputText leftIcon={
    <Ionicons
      name={props.icon}
      size={24}
      color={iconColor}
    />
  } {...props} />
)*/

export const Password = (props:any) => (
  <InputText icon='ios-key' secureTextEntry {...props} />
)

export const Link = (props:any) => (
  <Text {...props} style={[styles.linkPrimary, props.style]}/>
)