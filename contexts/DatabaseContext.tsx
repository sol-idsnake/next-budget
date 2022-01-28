import { debounce } from 'lodash';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import UserContext from './UserContext';

const DEBOUNCE_WAIT_TIME = 4000;

const defaultState = {
  isUpdating: false,
  createBudget: async () => {},
  getBudget: async () => {},
  debouncedUpdateBudget: async () => {},
};

export const DatabaseContext = createContext(defaultState);

const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const [isUpdating, setUpdating] = useState(false);
  const user = useContext(UserContext);

  const getBudget = async () => {
    const body = JSON.stringify({ userId: user.id });
    console.log(body, 'body');

    try {
      return await fetch('api/budget/get', {
        body,
      });
    } catch (error) {
      return null;
    }
  };

  const createBudget = async () => {
    console.log(user, 'user');
  };

  const updateBudget = async () => {
    setUpdating(true);
    console.log('trig update Budget');

    setUpdating(false);
  };

  const debouncedUpdateBudget = debounce(updateBudget, DEBOUNCE_WAIT_TIME);

  const memoizedDefault = useMemo(
    () => ({ isUpdating, createBudget, debouncedUpdateBudget, getBudget }),
    []
  );

  return (
    <DatabaseContext.Provider value={memoizedDefault}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseProvider;
