import { Button } from '../../components/ui/button';
import { useAuthStore } from '../../stores/useAuthStore';

const HomePage = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      <Button onClick={logout}>Click me to Logout</Button>
    </div>
  );
};

export default HomePage;
