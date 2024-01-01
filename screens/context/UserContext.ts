import React from 'react';
import auth from '@react-native-firebase/auth';

const userContext = React.createContext({
  user: {},
  logout: async () => {
    await auth().signOut();
  },
});

export {userContext};
