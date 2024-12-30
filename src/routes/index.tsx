import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./private-route";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { Home, Login } from "@pages";
import { Navbar } from "@components/navbar";

export const RoutesPath = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route
          path='/login'
          element={user ? <Navigate to='/' replace /> : <Login />}
        />
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='*'
          element={
            user ? (
              <Navigate to='/' replace />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};
