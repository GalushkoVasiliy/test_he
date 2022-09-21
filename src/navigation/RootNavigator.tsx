import React, {useMemo, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NavigationKey from './NavigationKey';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';

import {AuthContext} from '../utils/login-context';
import SignUp from '../screens/SignUp';

const RootStack = createStackNavigator();

const RootNavigator: React.FunctionComponent = () => {
  const [logged, setLogged] = useState(false);

  const authContext = useMemo(
    () => ({
      signIn: () => setLogged(true),
      signOut: () => {
        setLogged(false);
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            animationEnabled: false,
            cardOverlayEnabled: false,
            cardShadowEnabled: false,
            cardStyle: {
              elevation: 0,
              opacity: 1,
            },
          }}
          initialRouteName={NavigationKey.SignIn}>
          {logged === false ? (
            <>
              <RootStack.Screen name="SignIn" component={SignIn} />
              <RootStack.Screen name="SignUp" component={SignUp} />
            </>
          ) : (
            <RootStack.Screen name="Home" component={Home} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default React.memo(RootNavigator);
