import { createContext } from 'react';

interface User {
  name: string;
  age: number;
  email: string;
}

const UserContext = createContext<User | undefined>(undefined);

export default UserContext;
