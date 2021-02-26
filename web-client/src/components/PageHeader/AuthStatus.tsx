import { FeedxButton } from "components/FeedxButton";
import { useHistory } from "react-router-dom";

export default function AuthStatus() {
  const { push } = useHistory()
  // const { authState } = useMobxStates()
  // const isAuthenticated = authState?.isAuthenticated;
  // const UserProfileLink = <Link to={{ pathname: "/profile" }}>UserProfile</Link>;
  const onButonClick = () => {
    push("/auth")
  }
  const SigninButton = <FeedxButton onClick={onButonClick} btnType="ghost">Sign In</FeedxButton>;
  return SigninButton;
}
