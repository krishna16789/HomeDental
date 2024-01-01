import React, {useContext, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import {userContext} from './context/UserContext';

const Home = (props: any) => {
  const userDetails = useContext(userContext);
  useEffect(() => {
    if (
      userDetails.user === null ||
      (userDetails.user as any).phoneNumber === undefined
    ) {
      props.navigation.navigate('Login');
    }
  });
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>
        Hello {(userDetails.user as any).displayName || 'user'}!! Welcome
      </Text>
      <Button
        title="Logout"
        color="red"
        onPress={async () => {
          await userDetails.logout();
          props.navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default Home;
