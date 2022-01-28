import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import initialBudget from '../data/initialBudget.json';
import { DatabaseContext } from './DatabaseContext';

export const BudgetContext = createContext({});

const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const { debouncedUpdateResume } = useContext(DatabaseContext);

  const memoizedReducer = useCallback((fn, deps) => {
    let newState;

    console.log(fn, 'fn');
    console.log(deps, 'deps');

    return {};
  });

  const [state, dispatch] = useReducer(memoizedReducer, initialBudget);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};

export default BudgetProvider;
