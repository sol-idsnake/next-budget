import { useEffect } from 'react';
import { useCurrentUser } from '../src/context';

const Index = () => {
  const { userState, login } = useCurrentUser();

  useEffect(() => {
    console.log(userState, 'userState');

    if (userState.newUser != null) {
      //   setCurrentUser(userState.newUser);
    }
  }, [userState.newUser]);

  const handleClick = () => login('ADMIN');

  return (
    <>
      <section>
        <h1>test</h1>
        {!userState.currentUser && (
          <button type="button" onClick={handleClick}>
            Login
          </button>
        )}
      </section>
    </>
  );
};

export default Index;
