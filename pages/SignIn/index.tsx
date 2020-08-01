import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import {RootState} from '../../store/rootReducer';

import { Container, LocaleSelector, Logo, AlertError, BtnBlock, Password, InputText, IconLink, Link } from '../../components';
import { Modal } from 'react-native';
import styles from '../../styles';
import translate from '../../services/i18n';
import authService from '../../services/AuthService'

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

  useEffect(() => {
    dispatch(authService.signInToken());
  }, []);

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
        <Link onPress={() => navigation.navigate('SignUp')} style={styles.mt1}>{translate('LOGIN_createAccount')}</Link>
        <Link onPress={() => dispatch(authService.offline())} style={styles.mt1}>{translate('LOGIN_offline')}</Link>
        
    </Container>
  );
};

export default SignIn;
