import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/slices/auth.slice";
import { Button } from "./button";
import { RootState } from "@redux/store";

export function Navbar(): JSX.Element {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='bg-gray-800 p-4 flex justify-between items-center'>
      <div className='text-white font-bold text-xl'>{user?.name}</div>
      <div className='flex space-x-4'>
        <Button variant='danger' onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </nav>
  );
}
