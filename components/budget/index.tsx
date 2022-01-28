import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Budget as BudgetType, User } from '@prisma/client';
import { useContext, useState } from 'react';
import useSWR, { SWRResponse } from 'swr';
import UserContext from '../../contexts/UserContext';
import LoadingScreen from './LoadingScreen';

const fetcher = (...props) => {
  const [url, userId] = props;

  fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      userId,
    }),
  }).then((res) => res.json());

  //   fetch(...args).then((res) => res.json()
};

const Budget = ({ userId }: { userId: string }) => {
  //   const { state, dispatch } = useContext(BudgetContext);
  const { data: budgetItems, error } = useSWR(
    ['api/budget/get', userId],
    fetcher
  );

  const [loading, setLoading] = useState(true);
  //   const [budget, setBudget] = useState<BudgetType[]>([]);

  //   console.log(state, 'state');
  //   console.log(dispatch, 'dispatch');
  //   console.log(budget, 'budget');
  //   console.log(isValidating, 'isValidating');

  useState(() => {
    // if (budgetItems) {
    // console.log(user, 'user');
    // console.log(budgetItems, 'budgetItems');
    //   }
  });

  //   if (loading) {
  //     return <LoadingScreen />;
  //   }

  return (
    <>
      <Box
        alignItems="center"
        bgcolor="#53b053"
        display="flex"
        gap={10}
        padding="1em"
      >
        <Typography variant="h4" component="h1" color="white" fontWeight={600}>
          {new Date().toLocaleString('default', { month: 'long' })}
        </Typography>

        <Typography variant="h4" color="white" fontWeight={300}>
          {new Date().getFullYear()}
        </Typography>
      </Box>

      <Box>{loading && <LoadingScreen />}</Box>
    </>
  );
};

export default Budget;
