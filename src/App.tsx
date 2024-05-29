import { SignInSide } from "./SignIn";
import { AuthorizationContext } from "./AuthorizationContextProvider";

export const App: React.FC = () => {
  return (
    <div className="App">
      <SignInSide />
    </div>
  );
};
