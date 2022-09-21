import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  Button,
  I18nManager,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Yup from 'yup';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from '../utils/login-context';
import NavigationKey from '../navigation/NavigationKey';
import {Formik} from 'formik';
import {COLORS} from '../configs';
import i18n from '../utils/i18n';
import {useTranslation} from 'react-i18next';

const SCHEMA = Yup.object().shape({
  email: Yup.string().email().required('This field is required'),
  password: Yup.string().required('This field is required'),
});

const SignInScreen: React.FC = () => {
  const {signIn} = useContext(AuthContext);
  const navigation = useNavigation();
  const {t} = useTranslation();

  const goToSignUp = () => {
    navigation.navigate(NavigationKey.SignUp);
  };

  const changeLanguageHandler = () => {
    if (i18n.language === 'he') {
      i18n.changeLanguage('en');
      AsyncStorage.setItem('lang', 'en');
      I18nManager.forceRTL(false);
      RNRestart.Restart();
    } else {
      i18n.changeLanguage('he');
      AsyncStorage.setItem('lang', 'he');
      I18nManager.forceRTL(true);
      RNRestart.Restart();
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        validationSchema={SCHEMA}
        initialValues={{email: '', password: ''}}
        onSubmit={() => signIn()}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <Text style={styles.title}>{t('login.email')}</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}

            <Text style={styles.title}>{t('login.password')}</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <Button onPress={handleSubmit} title={t('login.submit')} />
          </View>
        )}
      </Formik>

      <TouchableOpacity onPress={goToSignUp}>
        <Text>{t('login.goToSignUp')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={changeLanguageHandler}>
        <Text>{t('login.changeLanguage')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  input: {
    color: COLORS.ebony,
    fontSize: 14,
    height: 47,
    borderWidth: 1,
    width: '100%',
    marginBottom: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
    writingDirection: 'rtl',
  },
  title: {
    padding: 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    writingDirection: 'rtl',
  },
  container: {
    width: '100%',
    paddingHorizontal: 25,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginBottom: 10,
    color: COLORS.red,
  },
});
