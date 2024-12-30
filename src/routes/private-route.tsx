import { RootState } from "@redux/store";
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;