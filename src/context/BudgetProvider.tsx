import { Category } from '@prisma/client';
import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

const initialState = { categories: [] };

const BudgetContext = createContext<BudgetContextShape>(
  initialState as BudgetContextShape
);

export const BudgetProvider = (props) => {
  const [budgetState, dispatch] = useReducer(reducer, initialState);

  const getBudget = useCallback(
    async (id) => {
      try {
        const budget = await fetch(`api/budget/${id}`);

        console.log(budget, 'budget');
      } catch (error) {}
    },
    [budgetState]
  );

  const value = useMemo(() => {
    return {
      budgetState,
      getBudget,
    };
  }, [budgetState]);

  return <BudgetContext.Provider value={value} {...props} />;
};

const reducer = (state: CurrentBudgetState, action: BudgetAction) => {
  switch (action.type) {
    case 'SUCCESSFUL_GET':
      return {
        categories: action.payload,
      };

    case 'FAILED_GET':
      return {
        ...state,
      };

    default:
      return state;
  }
};

const useBudget = () => {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error('useCategory must be used within a BudgetProvider');
  }

  return context;
};

export default useBudget;

export interface CurrentBudgetState {
  categories: [] | Category[];
}

export type BudgetAction =
  | {
      type: 'SUCCESSFUL_GET';
      payload: Category[];
    }
  | { type: 'FAILED_GET' };

interface BudgetContextShape extends CurrentBudgetState {
  dispatch: Dispatch<BudgetAction>;
  budgetState: CurrentBudgetState;
  getBudget: (id: string) => void;
}
