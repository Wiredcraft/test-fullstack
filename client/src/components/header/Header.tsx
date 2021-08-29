import * as React from "react";
import './header.css';
import { useAuth } from "../../contexts/AuthContext";
function Header() {
	const { isAuthenticated } = useAuth() // to decide whether is going to show login button or create talk button
	const [showLoginForm, setLoginState] = React.useState(false)
	const [showCreateTalkForm, setTalkState] = React.useState(false)
	
	return (
		<div className="c-header">
			<h1>Talkraft</h1>
			<button>Login</button>
			<button>CreateTalk</button>
		</div>
	)
}
//			{
//				if(!isAuthenticated){
//					return <button >Open Login Form By Changing state</button>
//				}
//			}
//
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