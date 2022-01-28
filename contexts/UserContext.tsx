import { User } from '@prisma/client';
import { createContext, memo, ReactNode, useEffect, useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const defaultState: User = {
  id: '',
  firstName: '',
  lastName: '',
  role: 'USER',
  email: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const UserContext = createContext(defaultState);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const { data: remoteUser }: SWRResponse<User> = useSWR(
    '/api/user/get',
    fetcher
  );

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    setUser(localUser);
  }, []);

  useEffect(() => {
    if (remoteUser && !user) {
      localStorage.setItem('user', JSON.stringify(remoteUser));
      setUser(remoteUser);
    }
  }, [remoteUser]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const memoizedProvider = memo(UserProvider);

export default UserContext;
export { memoizedProvider as UserProvider };
