import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/Home";
import "./App.css";
import { MstProvider, store } from "store";
import { HOME_ROUTE, LOGIN_ROUTE } from "constants/RoutesConstant";
import Login from "pages/Login";
import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";

function App() {
  return (
    <MstProvider value={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={LOGIN_ROUTE} element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path={HOME_ROUTE} element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate replace to={HOME_ROUTE} />} />
        </Routes>
      </BrowserRouter>
    </MstProvider>
  );
}

export default App;
