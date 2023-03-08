import { combineReducers } from "redux";
import loginReducer from './login/reducer';
import {inventoryReducer} from "./products/reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    products: inventoryReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

export default rootReducer;