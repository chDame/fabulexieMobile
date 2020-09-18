import React, { useState, useCallback } from 'react';
import {RootState} from '../../store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import { ILetterRule, IRule, IConfig, ISyllabeRule, instanceOfLetterRule } from '../../store/model';
import { FlatList, Modal, View, Dimensions } from 'react-native';
import { Container, RuleLetterPopper, BtnSecondary, BtnPrimary, BtnFa, BtnFaSecondary, BtnFaRound, BtnMatRound, InputText, FullSwitch, Radio } from '../../components';
import translate from '../../services/i18n';
import styles, { modalStyles, textColor } from '../../styles';
import profileService from '../../services/ProfileService';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker'
import thunk from 'redux-thunk';
import store from '../../store';
import { State } from 'react-native-gesture-handler';

function ProfileScreen() {
  const dispatch = useDispatch();
  const {user, profile, loading} = useSelector((state: RootState) => ({
    profile: state.profile.profile,
    loading: state.profile.loading,
    user: state.auth.data
  }));
  
  const [profileEdit, setProfileEdit] = useState<IConfig>(JSON.parse(JSON.stringify(profile)));
  const [change, setChange] = useState<number>(0);

  const [ruleModal, setRuleModal] = useState(false);
  const [colorPickerModal, setColorPickerModal] = useState(false);
  const [extraLineModal, setExtraLineModal] = useState(false);
  const [extraWordModal, setExtraWordModal] = useState(false);
  const [rule, setRule] = useState<IRule>({});
  const [ruleIdx, setRuleIdx] = useState<number>(-1);
  const [frontColor, setFrontColor] = useState(true);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const setLetters = (rule: ILetterRule, value: string):void => {
    rule.lettersString = value; 
    setChange(change+1);
  } 
  const setSeparator = (rule: ISyllabeRule, value: string):void => {
    rule.separator = value; 
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
  const setSyllabeRule = (value:boolean):void => {
    profileEdit.syllabeRule.enabled=value;
    if (value) {
      setRule(profileEdit.syllabeRule);
      setRuleModal(true);
    } else {
      setRuleModal(false);
    }
    setChange(change+1);
  }
  const openSyllabeRule = ():void => {
    if (profileEdit.syllabeRule.enabled) {
      setRule(profileEdit.syllabeRule);
      setRuleModal(!ruleModal);
    } else {
      setRuleModal(false);
    }
  }
  const setOpenDys = ():void => {
    profileEdit.openDys=(profileEdit.openDys)?!profileEdit.openDys:true;
    setChange(change+1);
  }
  const italic = (rule: IRule):void => {
    rule.italic = !rule.italic; 
    setChange(change+1);
  }
  const bold = (rule: IRule):void => {
    rule.bold = !rule.bold; 
    setChange(change+1);
  } 
  const underline = (rule: IRule):void => {
    rule.underlined = !rule.underlined; 
    setChange(change+1);
  } 
  const uppercase = (rule: IRule):void => {
    rule.upperCase = !rule.upperCase; 
    setChange(change+1);
  } 
  const addRule = ():void => {
    let length = profileEdit.letterRules?.push({lettersString:'', letters: [], italic:false, bold:true, upperCase:false, underlined:false});
    let idx = length-1;
    setRuleIdx(idx);
    setRule(profileEdit.letterRules[idx]);
    setRuleModal(true);
    setChange(change+1);
  }
  const removeRule = (index:number):void => {
    profileEdit.letterRules?.splice(index, 1);
    setChange(change+1);
  }
  const saveProfile = async () => {
    const unsubscribe = store.subscribe(() => {
      if (store.getState().profile.loading == false) {
        setProfileEdit(JSON.parse(JSON.stringify(store.getState().profile.profile)));
        setChange(0); 
        unsubscribe();
      }
    });
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
      
      <FullSwitch value={profileEdit.syllabeRule.enabled}
          onChange={() => {(profileEdit.syllabeRule.enabled)?setSyllabeRule(false):setSyllabeRule(true);}}
          onLabelClick={() => openSyllabeRule()}
          label={translate('PROFILE_syllabeRule')}
          />

      <FlatList<ILetterRule> extraData={change}
        style={{width:"100%"}}
        removeClippedSubviews={false}
        data={profileEdit?.letterRules}
        keyExtractor={(item: ILetterRule, index: number) => `${index}`}
        renderItem={({item, index}) => (
          <RuleLetterPopper onPress={ () => {setRule(item); setRuleIdx(index); setRuleModal(true);}} rule={item}/>
        )}
      />

      <View style={[styles.row, styles.mt1]}>
        <BtnPrimary icon='ios-add-circle-outline' onPress={ () => addRule()} title={translate('PROFILE_addRule')}/>
        {change>0 ? 
        (<BtnPrimary
          onPress={() => saveProfile()}
          loading={loading}
          icon="md-save"
          title={translate('SAVE')}
        />) : <BtnPrimary
        disabled
        icon="ios-checkmark"
        title={translate('SAVED')}
      /> }
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ruleModal}
        presentationStyle="overFullScreen"
      >
        <View style={modalStyles.ruleModalOverlayView}>
          <View style={modalStyles.modalView}>
            {instanceOfLetterRule(rule) ?
              <InputText placeholder={translate('PROFILE_characters')} onChangeText={(text:string) => setLetters(rule, text) } inputStyle={{color: textColor}} defaultValue={`${(rule as ILetterRule).lettersString}`}/>
            :
              <InputText placeholder={translate('PROFILE_separator')} onChangeText={(text:string) => setSeparator(rule as ISyllabeRule, text) } inputStyle={{color: textColor}} defaultValue={`${(rule as ISyllabeRule).separator}`}/>
            }
            <View style={{ justifyContent: "space-evenly", flexDirection: 'row', alignSelf: 'stretch',}}>
              <BtnFaRound icon='italic' action={ () => italic(rule)} pressed={rule.italic}>{translate('PROFILE_italic')}</BtnFaRound>
              <BtnFaRound icon='bold' action={ () => bold(rule)} pressed={rule.bold}>{translate('PROFILE_bold')}</BtnFaRound>
              <BtnFaRound icon='underline' action={ () => underline(rule)} pressed={rule.underlined}>{translate('PROFILE_underline')}</BtnFaRound>
            </View>
            <View style={{ justifyContent: "space-evenly", flexDirection: 'row', alignSelf: 'stretch',}}>
              <BtnMatRound icon='format-letter-case-upper' action={ () => uppercase(rule)} pressed={rule.upperCase}>{translate('PROFILE_uppercase')}</BtnMatRound>
              <BtnFaRound icon='paint-brush' action={ () => { setFrontColor(true); setColorPickerModal(true)}} pressed={rule.color}>{translate('PROFILE_frontColor')}</BtnFaRound>
              <BtnFaRound icon='fill-drip' action={ () => { setFrontColor(false); setColorPickerModal(true)}} pressed={rule.backgroundColor}>{translate('PROFILE_backColor')}</BtnFaRound>
            </View>
            <View style={styles.row}>
              <BtnFa icon='check' onPress={() => setRuleModal(false)} title={translate('VALIDATE')}/>
              {instanceOfLetterRule(rule) ?
                <BtnFaSecondary icon='trash' onPress={ () => {removeRule(ruleIdx); setRuleModal(false)}} title={translate('DELETE')}/>
                :
                <BtnFaSecondary icon='times' onPress={ () => {setRuleModal(false)}} title={translate('CANCEL')}/>
              }
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
