import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';

interface AdminRouteProps {
  element: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  const user = useAppSelector((state) => state.auth.user);
  const isAdminLocal = localStorage.getItem('isadmin') === 'true';

  const isAdminRedux = user?.role?.id === 1;
  console.log("hu")

  if (isAdminLocal || isAdminRedux && user) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
