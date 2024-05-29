import { SignInSide } from "./SignIn";
import { MainPage } from "./MainPage";
import { AuthorizationContext } from "./AuthorizationContextProvider";
import { useContext } from "react";
import { RoutesObject } from "./Routes";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const App: React.FC = () => {
  const { isLogedIn } = useContext(AuthorizationContext);
  return isLogedIn ? (
    <Routes>
      <Route path={RoutesObject.mainPage} element={<MainPage />}></Route>
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
