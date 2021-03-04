import { combineReducers } from 'redux'
import editReducer from '../container/edit/store/reducer.js'
export default  combineReducers({
	editReducer:editReducer,
});