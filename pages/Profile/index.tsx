import React, { useState } from 'react';
import {RootState} from '../../store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import { ILetterRule, IConfig } from '../../store/model';
import { TouchableOpacity, SafeAreaView, Text, FlatList, Modal, View, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Container, BtnSecondary, BtnPrimary, BtnFa, BtnBlock, InputText } from '../../components';
import { Button } from 'react-native-elements'
import translate from '../../services/i18n';
import styles from '../../styles';
import profileService from '../../services/ProfileService';
import { ColorPicker, TriangleColorPicker, toHsv, fromHsv } from 'react-native-color-picker'

function ProfileScreen() {
  const dispatch = useDispatch();
  const {user, profile, loading} = useSelector((state: RootState) => ({
    profile: state.profile.profile,
    loading: state.profile.loading,
    user: state.auth.data
  }));
  
  const [profileEdit, setProfileEdit] = useState<IConfig>(JSON.parse(JSON.stringify(profile)));
  const [change, setChange] = useState<number>(0);

  const [colorPickerModal, setColorPickerModal] = useState(false);
  const [rule, setRule] = useState<ILetterRule|null>(null);
  const [frontColor, setFrontColor] = useState(true);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const setLetters = (rule: ILetterRule, value: string):void => {
    rule.lettersString = value; 
    setChange(change+1);
  } 

  const italic = (rule: ILetterRule):void => {
    rule.italic = !rule.italic; 
    setChange(change+1);
  }
  const bold = (rule: ILetterRule):void => {
    rule.bold = !rule.bold; 
    setChange(change+1);
  } 
  const underline = (rule: ILetterRule):void => {
    rule.underlined = !rule.underlined; 
    setChange(change+1);
  } 
  const uppercase = (rule: ILetterRule):void => {
    rule.upperCase = !rule.upperCase; 
    setChange(change+1);
  } 
  const addRule = ():void => {
    profileEdit.letterRules?.push({lettersString:'', italic:false, bold:true, upperCase:false, underlined:false});
    setChange(change+1);
  }
  const removeRule = (index:number):void => {
    profileEdit.letterRules?.splice(index, 1);
    setChange(change+1);
  }
  const saveProfile = async () => {
    dispatch(profileService.saveProfile(user, profileEdit));
  };

  return (
    <Container>
      <SafeAreaView style={{flex: 1}}>
      <FlatList<ILetterRule> extraData={change}
          data={profileEdit?.letterRules}
          keyExtractor={item => `${item.id}`}
          renderItem={({item, index}) => (
            <TouchableOpacity>
              <InputText onChangeText={(text:string) => setLetters(item, text) } inputStyle={{color: item.color ? item.color : 'black', backgroundColor: item.backgroundColor ? item.backgroundColor : 'transparent'}} defaultValue={`${item.lettersString}`}/>
              <View style={styles.buttonGroup}>
                <BtnFa icon='italic' onPress={ () => italic(item)} buttonStyle={item.italic ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
                <BtnFa icon='bold' onPress={ () => bold(item)}  buttonStyle={item.bold ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
                <BtnFa icon='underline' onPress={ () => underline(item)}  buttonStyle={item.underlined ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
                <Button title={translate('PROFILE_uppercase')} onPress={ () => uppercase(item)} buttonStyle={item.upperCase ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
                <BtnFa icon='paint-brush' onPress={ () => {setRule(item); setFrontColor(true); setColorPickerModal(true)}} buttonStyle={item.color ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn}/>
                <BtnFa icon='fill-drip' onPress={ () => {setRule(item); setFrontColor(false); setColorPickerModal(true)}} buttonStyle={item.backgroundColor ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
                <BtnFa icon='trash' onPress={ () => {removeRule(index); }} buttonStyle={styles.buttonGroupBtn}/>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={[styles.row, styles.mt1]}>
          <BtnPrimary icon='ios-add-circle-outline' onPress={ () => addRule()} title="Ajouter règle"/>
          <BtnPrimary
            onPress={() => saveProfile()}
            loading={loading}
            icon="md-save"
            title={translate('SAVE')}
          />
        </View>
      </SafeAreaView >

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={colorPickerModal}
        presentationStyle="overFullScreen"
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <TriangleColorPicker 
              oldColor={rule && rule.color ? rule.color : "#333333"}
              onColorChange={color => setSelectedColor(fromHsv(color))}
              style={{flex:1, marginBottom: 40, width: Dimensions.get("window").width-100, height: Dimensions.get("window").width-100}}
            />
            <View style={styles.row}>
              <BtnSecondary onPress={() => setColorPickerModal(false)} title="Annuler"/>
              <BtnPrimary onPress={() => {if (rule!=null) frontColor ? rule.color = null : rule.backgroundColor = null; setChange(change+1); setColorPickerModal(false)}} title="Par défaut"/>
              <BtnPrimary onPress={() => {if (rule!=null) frontColor ? rule.color = selectedColor : rule.backgroundColor = selectedColor; setChange(change+1); setColorPickerModal(false)}} title="Valider"/>
            </View>
         </View>
        </View>
      </Modal>
    </Container>
  );
};

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 22
  },
  modalView: {
    flex:1,
    margin: 20,
    backgroundColor: "#333333",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

export default ProfileScreen;
