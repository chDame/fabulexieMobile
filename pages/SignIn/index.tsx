import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import {RootState} from '../../store/rootReducer';

import { Container, LocaleSelector, Logo, AlertError, BtnBlock, Password, InputText, IconLink, Link, SocialSignBtn } from '../../components';
import { Modal, View } from 'react-native';
import styles from '../../styles';
import translate from '../../services/i18n';
import authService from '../../services/AuthService';

import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(translate('LOGIN_error_email')),
  password: Yup.string().required(translate('LOGIN_error_password')),
});

function SignIn() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {loading, requestError} = useSelector((state: RootState) => ({
    loading:  state.auth.loading,
    requestError: state.auth.error}));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [localeModal, setLocaleModal] = useState(false);

  const [googleMobileClientId, setGoogleMobileClientId] = useState('');
  const [faceBookAppId, setFaceBookAppId] = useState('');

  useEffect(() => {
    authService.getConfig().then(resp => {
       if (resp.data.googleMobileClientId) {
          setGoogleMobileClientId(resp.data.googleMobileClientId);
        }
        if (resp.data.faceBookAppId) {
          setFaceBookAppId(resp.data.faceBookAppId);
        }
    });
    dispatch(authService.signInToken());
    
  }, []);

  const googleSignin = async () => {
    if (googleMobileClientId!='') {
      try {
        const { type, idToken } = await Google.logInAsync({
          scopes: ['profile'],
          androidClientId: googleMobileClientId, 
          androidStandaloneAppClientId: googleMobileClientId
        });
        
        if (type === 'success') {
          dispatch(authService.socialSignIn('google', idToken));
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const facebookSignin = async () => {
    if (faceBookAppId!='') {
      try {
        await Facebook.initializeAsync(faceBookAppId);
      const {
        type,
        token
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
          dispatch(authService.socialSignIn('facebook', token));
        }
      } catch (error) {
        setError(error.message);
      }
   }
  };

  const handleSubmit = async () => {
    try {
      await schema.validate({email, password});
      dispatch(authService.signIn(email, password));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
     
        <Logo source={require('../../assets/fabulexie.png')} />
        <IconLink action={() => setLocaleModal(true)} icon="md-globe">{translate('LOCALE')}</IconLink>
        <Modal
          animationType="slide"
          transparent={true}
          visible={localeModal}
          presentationStyle="overFullScreen">
            <LocaleSelector close={() => setLocaleModal(false)}/>
              
        </Modal>
        <InputText placeholder={translate('LOGIN_email')} onChangeText={(text:string) => {setEmail(text) }} icon='ios-at'/>
        <Password placeholder={translate('LOGIN_password')} onChangeText={(text:string) => setPassword(text)} style={styles.input} />

        { (error.length>0) && (<AlertError label={error}/>)}
        { (requestError && requestError.length>0) && (<AlertError label={requestError}/>)}
        <BtnBlock
          onPress={() => handleSubmit()}
          loading={loading}
          icon="ios-log-in"
          title={translate('LOGIN_login')}
        />
        <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
          {(faceBookAppId!='') ?
          <SocialSignBtn
            image={require('../../assets/fbBtn.png')}
            title="Fb Login"
            onPress={() => facebookSignin()}
          /> : <></>}
          {(googleMobileClientId!='') ?
          <SocialSignBtn
            image={require('../../assets/googleBtn.png')}
            title="Google Login"
            onPress={() => googleSignin()}
          /> : <></>}
        </View>
        <Link onPress={() => navigation.navigate('SignUp')} style={styles.mt1}>{translate('LOGIN_createAccount')}</Link>
        <Link onPress={() => dispatch(authService.offline())} style={styles.mt1}>{translate('LOGIN_offline')}</Link>
        
    </Container>
  );
};

export default SignIn;
