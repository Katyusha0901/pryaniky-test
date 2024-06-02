import { SignInSide } from "./pages/SignIn";
import { MainPage } from "./pages/MainPage";
import { ChangeRowsAndAuthorizationContext } from "./ChangeRowsAndAuthorizationContextProvider";
import { useContext } from "react";
import { RoutesObject } from "./Routes";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const App: React.FC = () => {
  const { isLoggedIn } = useContext(ChangeRowsAndAuthorizationContext);

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
      <Route path={RoutesObject.signIn} element={<SignInSide />}></Route>
      <Route
        path={"*"}
        element={<Navigate to={RoutesObject.signIn} replace />}
      ></Route>
    </Routes>
  );
};
