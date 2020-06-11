import React, { useState } from 'react';
import styles, { iconColor, textColor } from '../styles';
import { TextInput, Text, Image, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useLinkProps } from '@react-navigation/native';

export const Container = (props:any) => (
  <View style={[styles.container, props.style]} {...props} />
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

export const BtnFa = (props:any) => (
  <Button {...props} 
    icon={props.icon ? 
      <FontAwesome
        name={props.icon}
        size={24}
        color="white"
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
  <View style={styles.alertError}>
    <Ionicons name='md-alert' style={styles.errorIcon}></Ionicons>
    <Text style={styles.alertErrorText} {...props}>{props.label}</Text>
  </View>
)

export function InputText({...props}) {
  const [focus, setFocus] = useState(false);
  return(
    <Input {...props} 
      style={styles.input}
      inputStyle={{color:textColor, fontSize: 16}}
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

export const Password = (props:any) => (
  <InputText icon='ios-key' secureTextEntry {...props} />
)

export const Link = (props:any) => (
  <Text {...props} style={[styles.linkPrimary, props.style]}/>
)