import { useContext } from 'react';
import Budget from '../components/budget';
import UserContext from '../contexts/UserContext';

const Index = () => {
  const user = useContext(UserContext);

  return <main>{user && <Budget userId={user?.id} />}</main>;
};

export default Index;
