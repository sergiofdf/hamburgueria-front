import { Button } from '../../components/Button';
import { useAuth } from '../../../app/hooks/useAuth';

export function Dashboard() {
  const { signOut } = useAuth();

  return(
    <>
      <Button onClick={signOut}>
        Sair
      </Button>
    </>
  );
}
