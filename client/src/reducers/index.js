import { combineReducers } from 'redux';
import CardReducer from './CardsReducer';
import ListReducer  from './ListResducer';
import TeamReducer from './TeamReducer';
import AuthReducer from './AuthReducer'

export default combineReducers({
    cards:CardReducer,
    lists : ListReducer,
    team : TeamReducer,
    auth : AuthReducer
})