import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import {RootState} from '../../store/rootReducer';
import {signUp} from '../../store/features/auth/slice';

import { Container, Logo, AlertError, BtnBlock, Password, InputText, Link } from '../../components';
import {IUser} from '../../store/features/auth/slice';
import styles from '../../styles';
import translate from '../../services/i18n';

const schema = Yup.object().shape({
  name: Yup.string().required(translate('REGISTER_error_firstname')),
  email: Yup.string()
    .email()
    .required(translate('LOGIN_error_email')),
  password: Yup.string().required(translate('LOGIN_error_password')),
});

function SignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [user, setUser] = useState<IUser>({name: '', email: '', password: ''});
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      await schema.validate(user);

      dispatch(signUp(user));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
  
        <Logo source={require('../../assets/fabulexie.png')} />
        <InputText placeholder={translate('REGISTER_firstname')} onChangeText={(text:string) => setUser({...user, name: text})} icon='ios-contact'/>
        <InputText placeholder={translate('LOGIN_email')} onChangeText={(text:string) => setUser({...user, email: text})} icon='ios-at'/>
        <Password placeholder={translate('LOGIN_password')} onChangeText={(text:string) => setUser({...user, password: text})} style={styles.input} />

        { (error.length==0) ? (<></>) : (<AlertError label={error}/>)}
        <BtnBlock onPress={() => handleSubmit()} loading={loading} icon="ios-checkmark-circle-outline"
          title={translate('REGISTER_register')}
          buttonStyle={styles.btnPrimary}
        />
        
        <Link onPress={() => navigation.navigate('SignIn')} style={styles.mt1}>{translate('REGISTER_haveAnAccount')}</Link>
        
    </Container>
  );
};

export default SignUp;
