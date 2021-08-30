import * as React from "react";
import './header.css';
import { useAuth } from "../../contexts/AuthContext";
import ToggleShowButton from "../toggle-show-button/ToggleShowButton";
import { REACT_APP_GIT_URL } from "../../../env";
import CreateTalkForm from "../create-talk-form/CreateTalkForm";

function Header() {
	const { isAuthenticated } = useAuth()
	const [showCreateTalkForm, setTalkState] = React.useState(false);
	const GIT_URL = REACT_APP_GIT_URL;

	return (
		<div className="c-header">
			<h1>Talkraft</h1>
			<ToggleShowButton onClick={() => setTalkState(true)} show={isAuthenticated && !showCreateTalkForm} text="Create Talk" />
			<ToggleShowButton
				show={!isAuthenticated}
				text="Sign in with GitHub"
				href={GIT_URL} />
			{showCreateTalkForm ? <CreateTalkForm closeForm={() => setTalkState(false)}/> : null}
		</div>
	)
}

//			{
//				if(isAuthenticated){
//					return <button >Open Create talk form by Changing state</button>
//				}
//			}
//
//			{
//				if(showCreateTalkForm) {
//					return <LoginForm />
//				}
//				if(showCreateTalkForm) {
//					return <CreateTalkForm />
//				}
//			}
//

export default Header;