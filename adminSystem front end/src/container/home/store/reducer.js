const initialState = {
 stockData: {},
 d_arr:[],
 

}

export default (state=initialState, action)=> {
  if (action.type=="bigOrder") {
        var newState=JSON.parse(JSON.stringify(state));
        newState.stockData=action.data;
        return newState;
  }

  if (action.type=="change") {
        var newState=JSON.parse(JSON.stringify(state));
        newState.d_arr=action.d_arr;
        return newState;
  }


    if (action.type=="initial") {
        var newState=JSON.parse(JSON.stringify(state));
        newState.d_arr=action.d_arr;
        return newState;
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}