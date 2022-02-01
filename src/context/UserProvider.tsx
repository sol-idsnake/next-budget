import { isEmpty, isObject } from 'lodash';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {
  CurrentUserAction,
  CurrentUserContextShape,
  CurrentUserState,
} from '../types';

// const initialState = {
//   currentUser: {
//     id: "",
//     email: "",
//     firstName: "",
//     lastName: "",
//     role: "USER",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// };

const apiGetLoginUser = async (userId: string) => {
  return await fetch(`/api/users/${userId}`);
};

const initialState = {
  currentUser: null,
  newUser: null,
};

const CurrentUserContext = createContext<CurrentUserContextShape>(
  initialState as CurrentUserContextShape
);

export const UserProvider = (props: any) => {
  const [userState, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    if (!isEmpty(userState.currentUser)) {
      if (isObject(localStorage)) {
        const hasUser = JSON.parse(localStorage.getItem('user'));

        if (!hasUser) {
          console.log('setting user to local storage');
          localStorage.setItem('user', JSON.stringify(userState.currentUser));
        }
      }
    }
  }, [userState]);

  const login = useCallback(async (userId: string) => {
    try {
      const data = await apiGetLoginUser(userId);
      const user = await data.json();
      dispatch({ type: 'SUCCESSFUL_GET', payload: user });
      router.push(`/${user.id}`);
    } catch (error) {
      // toast.error(error.message);
      console.log(error);
    }
  }, []);

  const value = useMemo(() => {
    return {
      userState,
      login,
    };
  }, [userState, login]);

  return <CurrentUserContext.Provider value={value} {...props} />;
};

const reducer = (state: CurrentUserState, action: CurrentUserAction) => {
  switch (action.type) {
    case 'SUCCESSFUL_GET':
      return {
        currentUser: action.payload,
        newUser: null,
      };

    case 'FAILED_GET':
      return {
        ...state,
        newUser: null,
      };

    default:
      console.warn('unknown action: ', action.type, action.payload);
      return state;
  }
};

const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error(`useUsers must be used within a UsersProvider`);
  }

  return context;
};

export default useCurrentUser;
