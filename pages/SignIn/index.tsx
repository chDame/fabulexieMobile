import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import {RootState} from '../../store/rootReducer';
import {signIn} from '../../store/features/auth/slice';

import { Container, Logo, AlertError, BtnBlock, Password, InputText, Link } from '../../components';
import styles from '../../styles';
import translate from '../../services/i18n';

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(translate('LOGIN_error_email')),
  password: Yup.string().required(translate('LOGIN_error_password')),
});

function SignIn() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      await schema.validate({email, password});
      dispatch(signIn(email, password));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
     
        <Logo source={require('../../assets/fabulexie.png')} />
        <InputText placeholder={translate('LOGIN_email')} onChangeText={(text:string) => {setEmail(text) }} icon='ios-at'/>
        <Password placeholder={translate('LOGIN_password')} onChangeText={(text:string) => setPassword(text)} style={styles.input} />

        { (error.length==0) ? (<></>) : (<AlertError label={error}/>)}
        <BtnBlock
          onPress={() => handleSubmit()}
          loading={loading}
          icon="ios-log-in"
          title={translate('LOGIN_login')}
          buttonStyle={styles.btnPrimary}
        />
        <Link onPress={() => navigation.navigate('SignUp')} style={styles.mt1}>{translate('LOGIN_createAccount')}</Link>
        
    </Container>
  );
};

export default SignIn;
