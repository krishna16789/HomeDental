import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import PhoneLogin from './screens/PhoneLogin';
import HeaderLogo from './screens/components/HeaderLogo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'darkblue',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerTitle: () => <HeaderLogo />}}
        />
        <Stack.Screen name="Login" component={PhoneLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
