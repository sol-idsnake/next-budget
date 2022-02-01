import { Role, User } from '@prisma/client';
import { Dispatch } from 'react';

// type Role = typeof Role[keyof typeof Role];

type UserType = User;

export interface CurrentUserState {
  currentUser: UserType | {};
  newUser: boolean;
}

export type CurrentUserAction =
  | { type: 'SUCCESSFUL_GET'; payload: UserType }
  | { type: 'FAILED_GET' };

export interface CurrentUserContextShape extends CurrentUserState {
  dispatch: Dispatch<CurrentUserAction>;
  // setNewUser: (username: string) => void;
  userState: CurrentUserState;
  // setCurrentUser: (username: string) => void;
  login: (userId: string) => void;
}
