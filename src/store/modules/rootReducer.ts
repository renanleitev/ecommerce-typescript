import { combineReducers } from "redux";
import {usersReducer} from './users/reducer';
import {productsReducer} from "./products/reducer";

const rootReducer = combineReducers({
    users: usersReducer,
    products: productsReducer,
});

export type IRootReducer = typeof rootReducer;

export default rootReducer;