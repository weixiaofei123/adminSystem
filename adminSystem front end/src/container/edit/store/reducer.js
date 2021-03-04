
const defaultState={
	
}

export default (state=defaultState,action)=>{
	var newState=JSON.parse(JSON.stringify(state));
	if (action.type=="xxx") {
		
		return newState;
	}
	return state;
}