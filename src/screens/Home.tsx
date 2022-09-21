import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AuthContext} from '../utils/login-context';

const Home: React.FC = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <View>
      <Text>Card Screen</Text>

      <TouchableOpacity onPress={signOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
