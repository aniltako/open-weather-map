import { LOGIN_ROUTE } from "constants/RoutesConstant";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMst } from "store";

const PrivateRoute = () => {
  const { userStore } = useMst();

  if (!userStore.isLogin) {
    return <Navigate to={LOGIN_ROUTE} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
