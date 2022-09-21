export type NavigationKeyType = 'Home' | 'SignIn' | 'SignUp';

const NavigationKey: {[key in NavigationKeyType]: NavigationKeyType} = {
  Home: 'Home',
  SignIn: 'SignIn',
  SignUp: 'SignUp',
};

export default NavigationKey;
