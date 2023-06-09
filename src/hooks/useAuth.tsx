import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosI } from '@/services/axios';

export interface User {
  id: number;
  name: string;
  email: string;
  permissions: {
    id: number;
    name: string;
    access: string;
    description: string;
  };
}

interface AuthContextType {
  signed: boolean;
  userInfo: User | null;
  signIn: (
    signInData: any,
    setStateCollorButton: any,
    setSignIndata: any
  ) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storagedUser = localStorage.getItem('TBAuthUser');
    const storagedToken = localStorage.getItem('TBAuthToken');

    if (storagedUser && storagedToken) {
      axiosI.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
      setUserInfo(JSON.parse(storagedUser));
    }
  }, []);

  interface signInData {
    email: string;
    password: string;
  }

  const signIn = async (
    signInData: signInData,
    setStateCollorButton: (value: string) => void,
    setSignIndata: (value: signInData) => void
  ) => {
    setStateCollorButton('#8a8893');

    try {
      const { data } = await axiosI.post('auth/sign-in', signInData);

      setUserInfo(data.user);

      axiosI.defaults.headers['Authorization'] = `Bearer ${data.token}`;
      localStorage.setItem('TBAuthUser', JSON.stringify(data.user));
      localStorage.setItem('TBAuthToken', data.token);

      navigate('/');
    } catch (err) {
      setSignIndata({
        email: '',
        password: ''
      });
      setStateCollorButton('#e21a27');
    }
  };

  const signOut = () => {
    navigate('/sign-in');
    setUserInfo(null);
    localStorage.removeItem('TBAuthUser');
    localStorage.removeItem('TBAuthToken');
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!userInfo,
        userInfo,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
