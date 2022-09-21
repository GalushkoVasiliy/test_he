import {Formik} from 'formik';
import React, {useContext} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../configs';
import {AuthContext} from '../utils/login-context';
import * as Yup from 'yup';

const SCHEMA = Yup.object().shape({
  email: Yup.string().email().required('This field is required'),
  password: Yup.string().required('This field is required'),
  confirmPassword: Yup.string()
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same',
      ),
    })
    .required('This field is required'),
});

const SignUpScreen: React.FC = () => {
  const {signIn} = useContext(AuthContext);

  return (
    <View style={styles.wrapper}>
      <Formik
        validationSchema={SCHEMA}
        initialValues={{email: '', password: '', confirmPassword: ''}}
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
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}

            <Text>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.email && touched.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <Text>Password confirm</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            ) : null}
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  input: {
    color: COLORS.ebony,
    fontSize: 14,
    height: 47,
    borderWidth: 1,
    width: '100%',
    marginBottom: 15,
    borderRadius: 15,
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
