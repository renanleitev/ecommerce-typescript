import { combineReducers } from "redux";
import loginReducer from './login/reducer';
import productsReducer from "./products/reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    products: productsReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

export default rootReducer;