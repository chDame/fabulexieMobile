import React, { useState } from 'react';
import styles, { modalStyles, btnStyles, switchStyles, iconColor, textColor, iconSecondaryColor, primary } from '../styles';
import { ScrollView, Switch, Text, Image, View, TouchableOpacity } from 'react-native';
import { Button, Input, CheckBox } from 'react-native-elements';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import translate, {setLocale, getLocale} from '../services/i18n';
import informationService from '../services/InformationService';

export const Container = (props:any) => (
  <View style={[styles.container, props.style]} {...props} />
)

export const ScrollContainer = (props:any) => (
  <ScrollView contentContainerStyle={{flexGrow:1}}>
    <View style={[styles.container, props.style]} {...props} />
  </ScrollView>
)

export const FullSwitch = (props:any) => (
  <View style={switchStyles.container}>
    {props.icon && <Ionicons name={props.icon} style={{fontSize:20, marginRight:10, color:textColor}}></Ionicons>}
    <Text style={switchStyles.text} onPress={props.onLabelClick}>{props.label}</Text>
    <Switch
        trackColor={{ false: "#767577", true: iconSecondaryColor }}
        thumbColor={props.value ? iconColor : "#CCCCCC"}
        //ios_backgroundColor="#CCCCCC"
        onValueChange={ props.onChange }
        value={props.value}
      />
  </View>
)

export const SettingsLink = (props:any) => (
  <TouchableOpacity onPress={props.action} style={switchStyles.container}>
    {props.icon && <Ionicons name={props.icon} style={{fontSize:20, marginRight:10, color:textColor}}></Ionicons>
    }
    <Text style={switchStyles.text} onPress={props.onLabelClick}>{props.label}</Text>
    <Text style={switchStyles.text} onPress={props.onLabelClick}>{props.value}</Text>
  </TouchableOpacity>
)

export const RuleLetterPopper = (props:any) => (
    <TouchableOpacity onPress={props.onPress} style={switchStyles.container}>
            <Text  style={{fontSize: 16, color: textColor}}>{translate('PROFILE_letterRule')} : </Text>
            <Text 
              style={{fontSize: 16, fontWeight: props.rule.bold?"bold":"normal", 
                fontStyle: props.rule.italic?"italic":"normal",
                textDecorationLine: props.rule.underlined?"underline":"none",
                color: props.rule.color ? props.rule.color : 'black', 
                backgroundColor: props.rule.backgroundColor ? props.rule.backgroundColor : 'transparent'
                }}>{props.rule.lettersString}</Text>
    </TouchableOpacity>
)

export const Radio = (props:any) => (
  <CheckBox
      containerStyle={{backgroundColor: 'transparent', borderWidth: 0, flexDirection: "row"}} 
      textStyle={{color:textColor, fontSize: 16}}
      title={props.title}
      checkedIcon='dot-circle-o'
      uncheckedIcon='circle-o'
      checkedColor={iconColor}
      checked={props.checked}
      onPress={props.onPress}
      />
)

export const Btn = (props:any) => (
  <Button 
    {...props} 
    titleStyle={[props.titleStyle, {marginLeft:props.icon?10:0,marginRight:10}]}
    icon={props.icon ? 
      <Ionicons
        name={props.icon}
        size={24}
        color="white"
      />
      :{}
    }
  />
)
export const BtnSecondary = (props:any) => (
  <Btn buttonStyle={btnStyles.btnSecondary} titleStyle={{color: primary}} {...props} />
)
export const BtnPrimary = (props:any) => (
  <Btn buttonStyle={btnStyles.btnPrimary} 
  {...props} />
)

export const BtnFa = (props:any) => (
  <Button 
    buttonStyle={btnStyles.btnPrimary}
    titleStyle={{marginLeft:props.icon?10:0,marginRight:10}}
    {...props} 
    icon={props.icon ? 
      <FontAwesome5 
        name={props.icon}
        size={24}
        color="white"
      />
      :{}
    }
  />
)


export const BtnFaSecondary = (props:any) => (
  <Button 
    buttonStyle={btnStyles.btnSecondary}
    titleStyle={{marginLeft:props.icon?10:0,marginRight:10, color: primary}}
    {...props} 
    icon={props.icon ? 
      <FontAwesome5 
        name={props.icon}
        size={24}
        color={primary}
      />
      :{}
    }
  />
)

export const BtnFaRound = (props:any) => (
  <TouchableOpacity onPress={props.action} style={btnStyles.btnRoundContainer}>
    <FontAwesome5 name={props.icon} style={props.pressed ? [btnStyles.btnRound, btnStyles.btnRoundPressed] : btnStyles.btnRound}></FontAwesome5>
    <Text {...props} style={btnStyles.btnRoundSubTitle}/>
  </TouchableOpacity>
)

export const BtnMatRound = (props:any) => (
  <TouchableOpacity onPress={props.action} style={btnStyles.btnRoundContainer}>
    <MaterialCommunityIcons name={props.icon} style={props.pressed ? [btnStyles.btnRound, btnStyles.btnRoundMat, btnStyles.btnRoundPressed] : [btnStyles.btnRound, btnStyles.btnRoundMat]}/>
    <Text {...props} style={btnStyles.btnRoundSubTitle}/>
  </TouchableOpacity>
)

export const BtnMat = (props:any) => (
  <Button 
    {...props} 
    icon={props.icon ? 
      <MaterialCommunityIcons
        name={props.icon}
        size={36}
        color="white"
        style={{marginBottom:6}}
      />
      :{}
    }
  />
)

export const BtnBlock = (props:any) => (
  <BtnPrimary containerStyle={{width: '100%', marginLeft: 0}} {...props} />
)

export const GoogleSignBtn = (props:any) => (
  
  <TouchableOpacity onPress={props.onPress} style={btnStyles.btnGoogle}>
    <Image
      style={{ width: 40, height: 40, margin:5 }}
      source={require('../assets/googleBtn.png')}
    />
    <Text style={btnStyles.btnGoogleText}>Google Sign </Text>
  </TouchableOpacity>
  
)

export const MenuAction = (props:any) => (
  <TouchableOpacity style={switchStyles.container} onPress={props.onPress}>
    {props.icon ? (<FontAwesome5 
        name={props.icon}
        size={24}
        style={{color: (props.color) ? props.color :textColor}}
      />) : (<></>)}
    <Text style={[switchStyles.text, (props.color) ? {color: props.color} : {}]} >{props.label}</Text>
  </TouchableOpacity>
)


export const Logo = (props:any) => (
  <Image style={styles.logo} {...props} />
)

export const AlertError = (props:any) => (
  <View style={styles.alertError}>
    <Ionicons name='md-alert' style={styles.errorIcon}></Ionicons>
    <Text style={styles.alertErrorText} {...props}>{props.label}</Text>
  </View>
)

export function InputText({...props}) {
  const [focus, setFocus] = useState(false);
  return(
    <Input 
      style={styles.input}
      inputStyle={{color:textColor, fontSize: 16}}
      onFocus={() => setFocus(true)}
      onBlur={() =>setFocus(false)}
      inputContainerStyle={focus? styles.inputFocused : styles.input}
      {...props} 
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
export const IconLink = (props:any) => (
  <TouchableOpacity onPress={props.action} style={{flexDirection: 'row'}}>
    <Ionicons name={props.icon} style={[styles.linkPrimary, {fontSize:20, marginRight:10}]}></Ionicons>
    <Text {...props} style={[styles.linkPrimary, props.style]}/>
  </TouchableOpacity>
)

export function LocaleSelector({...props}) {
  const [selectorLocale, setSelectorLocale] = useState(getLocale());
  return(
  <View style={modalStyles.ruleModalOverlayView}>
    <View style={modalStyles.modalView}>
      <Radio
          title='français'
          checked={selectorLocale=="fr"}
          onPress={() => {setLocale("fr"); setSelectorLocale("fr");}}
      />
      <Radio
          title='english'
          checked={selectorLocale=="en"}
          onPress={() => {setLocale("en"); setSelectorLocale("en");}}
      />
      
      <BtnBlock onPress={props.close} title={translate('FINISH')}/>
    </View>
  </View>
)
  }


export function MessageInfo({...props}) {
  const [change, setChange] = useState(0);
  return(informationService.displayInformation(props.messageKey) ?
    <View style={{backgroundColor: '#DDDDFF', padding: 10, margin: 40, borderRadius:5}} >
      <View style={{flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between", padding: 10, backgroundColor: "#BBBBEE", marginBottom: 10, borderRadius:5}}>
        <Ionicons
          name="ios-help-buoy"
          size={30}
          style={{color: '#8888BB'}}
          
          />
          <Text style={{fontSize: 18}}>Information</Text>
          
        <Ionicons
          name="ios-close"
          size={30}
          style={{textShadowColor: "white", textShadowRadius:1, textShadowOffset:{height:1, width:1}}}
          onPress={() => { setChange(change+1); informationService.closeInformation(props.messageKey, false)}}
          />
      </View>
      <Text>{translate(props.messageKey)}</Text>  

        <Button 
          buttonStyle={{backgroundColor: '#BBBBEE', marginTop:20}}
          titleStyle={{marginLeft:10, color: 'black'}}
          title="Fermer"
          onPress={() => { setChange(change+1); informationService.closeInformation(props.messageKey, true)}}
          icon={
            <Ionicons 
              name="ios-close"
              size={30}
            />
          }
        />
        <Button 
          buttonStyle={{backgroundColor: '#BBBBEE', marginTop:10}}
          titleStyle={{marginLeft:10, color: 'black', width: '70%'}}
          title="Ne plus afficher de messages d'information"
          onPress={() => { setChange(change+1); informationService.closeInformation('all', true)}}
          icon={
            <Ionicons 
              name="ios-eye-off"
              size={30}
            />
          }
        />
    </View>
    : <></>)
}