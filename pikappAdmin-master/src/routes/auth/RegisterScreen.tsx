import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import TextInputView from '~/components/authComponents/TextInputView';
import {setLogged, setUser} from '~/redux/Apps/AppStore';
import {UserType} from '~/types/UserType';

// CustomHooks
const formData = values => {
  const [formValues, setFormValues] = useState({
    ...values,
  });

  const handleFormValueChange = (key, value) => {
    // console.log('key', key, 'value', value);

    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  return [formValues, handleFormValueChange, setFormValues];
};

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [formValues, handleFormValueChange, setFormValues] = formData({
    email: 'example@mail.com',
    password: 'Enter password',
    firstName: 'First name',
    lastName: 'Last Name',
  });

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function validateFields() {
    let hasError = false;
    Object.values(formValues).map((e, i) => {
      // validate if field are not empty and have minimum 4 character
      if (e.length == 0 || e.length < 4) {
        hasError = true;
      } else {
        hasError = false;
      }
      // verify email
      if (i == 0) {
        hasError = hasError || validateEmail(formValues.email);
      }
    });
    if (hasError) {
      Alert.alert(
        'Error',
        'You enter wrong creditals !!!. Verify all inputs and try again',
      );
    } else {
      let user: UserType = {
        email: formValues.email,
        password: formValues.password,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
      };
      console.log('user', user);

      dispatch(setUser(user));
      dispatch(setLogged(true));
      navigation.navigate('HomeScreen');
    }
  }

  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{paddingVertical: 20}}>Register Screen</Text>
      <TextInputView
        placeholder={formValues.email}
        formKey={'email'}
        handleFormValueChange={handleFormValueChange}
      />
      <TextInputView
        placeholder={formValues.password}
        formKey={'password'}
        handleFormValueChange={handleFormValueChange}
      />
      <TextInputView
        placeholder={formValues.firstName}
        formKey={'firstName'}
        handleFormValueChange={handleFormValueChange}
      />
      <TextInputView
        placeholder={formValues.lastName}
        formKey={'lastName'}
        handleFormValueChange={handleFormValueChange}
      />

      <TouchableOpacity
        onPress={() => validateFields()}
        style={{
          backgroundColor: 'green',
          paddingHorizontal: 50,
          borderRadius: 10,
          paddingVertical: 10,
          margin: 30,
        }}>
        <Text style={{color: 'white'}}>Register</Text>
      </TouchableOpacity>
      <View style={{padding: 10, alignItems: 'center'}}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={{color: 'blue'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
