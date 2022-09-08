import { HOME_ROUTE } from "constants/RoutesConstant";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMst } from "store";

const PublicRoute = () => {
  const { userStore } = useMst();

  if (userStore.isLogin) {
    return <Navigate to={HOME_ROUTE} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
