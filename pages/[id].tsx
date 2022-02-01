import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useBudget } from '../src/context';

const Index = () => {
  const {
    query: { id },
  } = useRouter();

  const { categories, getBudget } = useBudget();

  useEffect(() => {
    console.log(categories, 'budgetState in component');
    if (!categories.length) {
      console.log(categories, 'budgetState in component');
    }
  });

  console.log(id, 'router');
  return (
    <>
      <section>
        <Box
          alignItems="center"
          bgcolor="#53b053"
          display="flex"
          gap="10px"
          padding="1em"
        >
          <Typography
            color="white"
            component="h1"
            fontWeight={600}
            variant="h4"
          >
            {new Date().toLocaleString('default', { month: 'long' })}
          </Typography>

          <Typography variant="h4" color="white">
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </section>
    </>
  );
};

export default Index;
