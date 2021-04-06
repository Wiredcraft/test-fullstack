
let LSD = localStorage.getItem('userData');

const defaultState={
	userData: LSD ? JSON.parse(LSD) : {},
	talkData: []
}

export default (state=defaultState, action)=> {
	
	if (action.type === 'USER') {
		let newState = JSON.parse(JSON.stringify(state));
		newState.userData = action.value;
		return newState;
	}
	
	if (action.type === 'TALK') {
		let newState = JSON.parse(JSON.stringify(state));
		newState.talkData = action.value;
		return newState;
	}
	
	return state;

}
