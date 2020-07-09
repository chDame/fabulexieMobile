import React, { useState } from 'react';
import {RootState} from '../../store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import { ILetterRule, IConfig } from '../../store/model';
import { FlatList, Modal, View, StyleSheet, Dimensions } from 'react-native';
import { Container, RuleLetterPopper, BtnSecondary, BtnPrimary, BtnFa, BtnMat, InputText, FullSwitch, Radio } from '../../components';
import translate from '../../services/i18n';
import styles, { modalStyles } from '../../styles';
import profileService from '../../services/ProfileService';
import { TriangleColorPicker, toHsv, fromHsv } from 'react-native-color-picker'

function ProfileScreen() {
  const dispatch = useDispatch();
  const {user, profile, loading} = useSelector((state: RootState) => ({
    profile: state.profile.profile,
    loading: state.profile.loading,
    user: state.auth.data
  }));
  
  const [profileEdit, setProfileEdit] = useState<IConfig>(JSON.parse(JSON.stringify(profile)));
  const [change, setChange] = useState<number>(0);

  const [letterRuleModal, setLetterRuleModal] = useState(false);
  const [colorPickerModal, setColorPickerModal] = useState(false);
  const [extraLineModal, setExtraLineModal] = useState(false);
  const [extraWordModal, setExtraWordModal] = useState(false);
  const [rule, setRule] = useState<ILetterRule>({});
  const [ruleIdx, setRuleIdx] = useState<number>(-1);
  const [frontColor, setFrontColor] = useState(true);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const setLetters = (rule: ILetterRule, value: string):void => {
    rule.lettersString = value; 
    setChange(change+1);
  } 
  const setLineSpace = (value:number|null):void => {
    profileEdit.extraLineSpace=value;
    if (value==null) {
      setExtraLineModal(false);
    } else {
      setExtraLineModal(true);
    }
    setChange(change+1);
  }
  const setWordSpace = (value:number|null):void => {
    profileEdit.extraWordSpace=value;
    if (value==null) {
      setExtraWordModal(false);
    } else {
      setExtraWordModal(true);
    }
    setChange(change+1);
  }
  const setOpenDys = ():void => {
    profileEdit.openDys=(profileEdit.openDys)?!profileEdit.openDys:true;
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
      <FullSwitch value={profileEdit.openDys}
        onChange={() => setOpenDys()}
        label="OpenDyslexic"/>
      <FullSwitch value={profileEdit.extraLineSpace!=null}
          onChange={() => {(profileEdit.extraLineSpace)?setLineSpace(null):setLineSpace(1);}}
          onLabelClick={() => (profileEdit.extraLineSpace)?setExtraLineModal(!extraLineModal):setExtraLineModal(false)}
          label={translate('PROFILE_extraLineSpace')}
          />

      <View 
        style={{display: extraLineModal?"flex":"none"}}>
            
          <Radio
              title={translate('PROFILE_2xLineSpace')}
              checked={profileEdit.extraLineSpace==1}
              onPress={() => setLineSpace(1)}
            />
            <Radio
              title={translate('PROFILE_3xLineSpace')}
              checked={profileEdit.extraLineSpace==2}
              onPress={() => setLineSpace(2)}
            />
            <Radio
              title={translate('PROFILE_4xLineSpace')}
              checked={profileEdit.extraLineSpace==3}
              onPress={() => setLineSpace(3)}
            />
      </View>

      <FullSwitch value={profileEdit.extraWordSpace!=null}
          onChange={() => {(profileEdit.extraWordSpace)?setWordSpace(null):setWordSpace(1);}}
          onLabelClick={() => (profileEdit.extraWordSpace)?setExtraWordModal(!extraWordModal):setExtraWordModal(false)}
          label={translate('PROFILE_extraWordSpace')}
          />

      <View 
        style={{display: extraWordModal?"flex":"none"}}>
            
          <Radio
              title={translate('PROFILE_wordSpace')}
              checked={profileEdit.extraWordSpace==1}
              onPress={() => setWordSpace(1)}
            />
            <Radio
              title={translate('PROFILE_bigWordSpace')}
              checked={profileEdit.extraWordSpace==2}
              onPress={() => setWordSpace(2)}
            />
            <Radio
              title={translate('PROFILE_biggerWordSpace')}
              checked={profileEdit.extraWordSpace==3}
              onPress={() => setWordSpace(3)}
            />
      </View>
           
      <FlatList<ILetterRule> extraData={change}
        style={{width:"100%"}}
        removeClippedSubviews={false}
        data={profileEdit?.letterRules}
        keyExtractor={item => `${item.id}`}
        renderItem={({item, index}) => (
          <RuleLetterPopper onPress={ () => {setRule(item); setRuleIdx(index); setLetterRuleModal(true);}} rule={item}/>
        )}
      />
      <View style={[styles.row, styles.mt1]}>
        <BtnPrimary icon='ios-add-circle-outline' onPress={ () => addRule()} title={translate('PROFILE_addRule')}/>
        <BtnPrimary
          onPress={() => saveProfile()}
          loading={loading}
          icon="md-save"
          title={translate('SAVE')}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={letterRuleModal}
        presentationStyle="overFullScreen"
      >
        <View style={modalStyles.ruleModalOverlayView}>
          <View style={modalStyles.modalView}>
            <InputText onChangeText={(text:string) => setLetters(rule, text) } inputStyle={{color: rule.color ? rule.color : 'black', backgroundColor: rule.backgroundColor ? rule.backgroundColor : 'transparent'}} defaultValue={`${rule.lettersString}`}/>
            <View style={styles.buttonGroup}>
              <BtnFa icon='italic' onPress={ () => italic(rule)} buttonStyle={rule.italic ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
              <BtnFa icon='bold' onPress={ () => bold(rule)}  buttonStyle={rule.bold ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
              <BtnFa icon='underline' onPress={ () => underline(rule)}  buttonStyle={rule.underlined ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
              <BtnMat icon='format-letter-case-upper' onPress={ () => uppercase(rule)} buttonStyle={rule.upperCase ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
              <BtnFa icon='paint-brush' onPress={ () => { setFrontColor(true); setColorPickerModal(true)}} buttonStyle={rule.color ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn}/>
              <BtnFa icon='fill-drip' onPress={ () => { setFrontColor(false); setColorPickerModal(true)}} buttonStyle={rule.backgroundColor ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
            </View>
            <View style={styles.row}>
              <BtnPrimary onPress={() => setLetterRuleModal(false)} title={translate('FINISH')}/>
              <BtnFa icon='trash' onPress={ () => {removeRule(ruleIdx); setLetterRuleModal(false)}} title={translate('DELETE')}/>
            </View>
         </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={colorPickerModal}
        presentationStyle="overFullScreen"
      >
        <View style={modalStyles.colorModalOverlayView}>
          <View style={modalStyles.modalView}>
            <TriangleColorPicker 
              oldColor={rule && rule.color ? rule.color : "#333333"}
              onColorChange={color => setSelectedColor(fromHsv(color))}
              style={{flex:1, marginBottom: 40, width: Dimensions.get("window").width-100, height: Dimensions.get("window").width-100}}
            />
            <View style={styles.row}>
              <BtnSecondary onPress={() => setColorPickerModal(false)} title={translate('CANCEL')}/>
              <BtnPrimary onPress={() => {if (rule!=null) frontColor ? rule.color = null : rule.backgroundColor = null; setChange(change+1); setColorPickerModal(false)}} title={translate('DEFAULT')}/>
              <BtnPrimary onPress={() => {if (rule!=null) frontColor ? rule.color = selectedColor : rule.backgroundColor = selectedColor; setChange(change+1); setColorPickerModal(false)}} title={translate('VALIDATE')}/>
            </View>
         </View>
        </View>
      </Modal>
    </Container>
  );
};



export default ProfileScreen;
