import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin = false }) => {
  const {
    loading,
    isAuthenticated,
    user = {},
  } = useSelector((state) => state.user);
  if (isAdmin) {
    return (
      <Fragment>
        {loading === false && user?.role === 'admin' ? (
          <Outlet />
        ) : (
          <Navigate to='/login' />
        )}
      </Fragment>
    );
  }
  return (
    <Fragment>
      {loading === false && isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to='/login' />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
