import * as React from "react";
import { useAuth } from "../../contexts/AuthContext";

function TalkListComponent() {
	const { isAuthenticated } = useAuth()
	//This will be map actually and prop being passed will control whether the like button will be there or not	
	return <Talk props={isAuthenticated}></Talk>
}

export default TalkListComponent