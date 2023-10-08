import { createContext, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '../../config/localStorageKeys';
import { useQuery } from 'react-query';
import { usersService } from '../services/usersService';
import { toast } from 'react-hot-toast';


interface AuthContextValue{
  signedIn: boolean;
  signIn(accessToken: string): void;
  signOut(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({children}: {children: React.ReactNode}) {

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAcessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    return !!storedAcessToken;
  });

  const { isError } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn
  });

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);


  useEffect(() => {
    if(isError){
      signOut();
      toast.error('Sessão expirada!');
    }
  }, [isError, signOut]);

  return (
    <AuthContext.Provider value={{ signedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
