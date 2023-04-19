import { combineReducers } from "redux";
import {userReducer} from './login/reducer';
import {inventoryReducer} from "./products/reducer";

const rootReducer = combineReducers({
    login: userReducer,
    products: inventoryReducer,
});

export type IRootReducer = typeof rootReducer;

export default rootReducer;