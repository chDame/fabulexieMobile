import React, { useState } from 'react';
import {RootState} from '../../store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import { ILetterRule, IConfig } from '../../store/model';
import {TouchableOpacity, FlatList, ActivityIndicator, Text, View } from 'react-native';
import { Container, BtnFa, BtnBlock, InputText } from '../../components';
import { Button } from 'react-native-elements'
import translate from '../../services/i18n';
import styles from '../../styles';
import profileService from '../../services/ProfileService';

function ProfileScreen() {
  const dispatch = useDispatch();
  const {user, profile, loading} = useSelector((state: RootState) => ({
    profile: state.profile.profile,
    loading: state.profile.loading,
    user: state.auth.data
  }));
  
  const [profileEdit, setProfileEdit] = useState<IConfig>(JSON.parse(JSON.stringify(profile)));
  const [change, setChange] = useState<number>(0);

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

  const saveProfile = async () => {
    dispatch(profileService.saveProfile(user, profileEdit));
  };

  return (
    <Container>
      <FlatList<ILetterRule> extraData={change}
          data={profileEdit?.letterRules}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <TouchableOpacity>
              <InputText onChangeText={(text:string) => setLetters(item, text) } defaultValue={`${item.lettersString}`}/>
              <View style={styles.buttonGroup}>
                <BtnFa icon='italic' onPress={ () => italic(item)} buttonStyle={item.italic ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
                <BtnFa icon='bold' onPress={ () => bold(item)}  buttonStyle={item.bold ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
                <BtnFa icon='underline' onPress={ () => underline(item)}  buttonStyle={item.underlined ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
                <Button title={translate('PROFILE_uppercase')} onPress={ () => uppercase(item)} buttonStyle={item.upperCase ? styles.buttonGroupBtnPressed : styles.buttonGroupBtn} />
              </View>
            </TouchableOpacity>
          )}
        />

      <BtnBlock
        onPress={() => saveProfile()}
        loading={loading}
        icon="md-save"
        title={translate('SAVE')}
      />
    </Container>
  );
};

export default ProfileScreen;
