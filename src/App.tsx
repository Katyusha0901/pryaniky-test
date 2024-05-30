import { SignInSide } from "./components/SignIn";
import { MainPage } from "./components/MainPage";
import { Registration } from "./components/Registration";
import { AuthorizationContext } from "./AuthorizationContextProvider";
import { useContext, useState } from "react";
import { RoutesObject } from "./Routes";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const App: React.FC = () => {
  const { isLogedIn, isRegistration } = useContext(AuthorizationContext);

  return isLogedIn ? (
    <Routes>
      <Route path={RoutesObject.mainPage} element={<MainPage />}></Route>
      <Route
        path={"*"}
        element={<Navigate to={RoutesObject.mainPage} replace />}
      ></Route>
    </Routes>
  ) : isRegistration ? (
    <Routes>
      <Route
        path={RoutesObject.registration}
        element={<Registration />}
      ></Route>
      <Route
        path={"*"}
        element={<Navigate to={RoutesObject.registration} replace />}
      ></Route>
    </Routes>
  ) : (
    <Routes>
      <Route path={RoutesObject.home} element={<SignInSide />}></Route>
      <Route
        path={"*"}
        element={<Navigate to={RoutesObject.home} replace />}
      ></Route>
    </Routes>
  );
};
