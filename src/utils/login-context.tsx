import React from 'react';

interface Props {
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = React.createContext<Props>({
  signIn: () => {},
  signOut: () => {},
});
