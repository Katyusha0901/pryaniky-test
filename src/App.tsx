import { SignInSide } from "./SignIn";
import { MainPage } from "./MainPage";
import { AuthorizationContext } from "./AuthorizationContextProvider";
import { useContext } from "react";
import { RoutesObject } from "./Routes";
import { Routes, Route } from "react-router-dom";

export const App: React.FC = () => {
  const { isLogedIn } = useContext(AuthorizationContext);

  return isLogedIn ? (
    <Route path={RoutesObject.mainPage} element={<MainPage />}></Route>
  ) : (
    <Routes>
      <Route path={RoutesObject.home} element={<SignInSide />}></Route>
    </Routes>
  );
};
