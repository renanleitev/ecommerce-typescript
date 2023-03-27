import { combineReducers } from "redux";
import {userReducer} from './login/reducer';
import {inventoryReducer} from "./products/reducer";
import { InitialStateLogin, InitialStateProducts } from "../../interfaces";

const rootReducer = combineReducers({
    login: userReducer,
    products: inventoryReducer,
});

export default rootReducer;