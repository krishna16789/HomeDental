import React, {useState, useEffect} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {userContext} from './context/UserContext';

function PhoneLogin(props: any) {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle login
  function onAuthStateChanged(user: any) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
      setUser(user);
      props.navigation.navigate('Home');
    } else {
      props.navigation.navigate('Login');
    }
  }

  async function logout() {
    setUser(null);
    await auth().signOut();
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: any) {
    setError(false);
    if (phoneNumber.length < 10) {
      setError(true);
      setErrorMessage('Invalid phone number.');
      return;
    }
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        '+91' + phoneNumber,
      );
      setConfirm(confirmation);
    } catch (error) {
      setError(true);
      console.log(error);
      setErrorMessage('Invalid Phone Number');
    }
  }

  async function confirmCode() {
    setError(false);
    try {
      await confirm.confirm(code);
    } catch (error) {
      setError(true);
      setErrorMessage('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            placeholder="Enter Phone Number"
            onChangeText={text => setPhoneNumber(text)}
          />
          {error ? <Text>{errorMessage}</Text> : null}
          <Button
            title="Sign In"
            onPress={() => signInWithPhoneNumber(phoneNumber)}
          />
        </View>
      </>
    );
  }

  return (
    <>
      <userContext.Provider
        value={{
          user,
          logout,
        }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            placeholder="Enter code"
            value={code}
            onChangeText={text => setCode(text)}
          />
          {error ? <Text>{errorMessage}</Text> : null}
          <Button title="Confirm Code" onPress={() => confirmCode()} />
        </View>
      </userContext.Provider>
    </>
  );
}

export default PhoneLogin;
