import { SignInSide } from "./components/SignIn";
import { MainPage } from "./components/MainPage";
import { Registration } from "./components/Registration";
import { AuthorizationContext } from "./AuthorizationContextProvider";
import { useContext } from "react";
import { RoutesObject } from "./Routes";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthorizationContext);

  return isLoggedIn ? (
    <Routes>
      <Route path={RoutesObject.mainPage} element={<MainPage />}></Route>
      <Route
        path={"*"}
        element={<Navigate to={RoutesObject.mainPage} replace />}
      ></Route>
    </Routes>
  ) : (
    <Routes>
      <Route path={RoutesObject.home} element={<SignInSide />}></Route>
      <Route
        path={RoutesObject.registration}
        element={<Registration />}
      ></Route>
      <Route
        path={"*"}
        element={<Navigate to={RoutesObject.home} replace />}
      ></Route>
    </Routes>
  );
};
