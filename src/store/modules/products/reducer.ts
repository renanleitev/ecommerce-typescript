import * as types from '../types';

interface InitialState {
    stock: {
        data: Array<string>,
    },
    product: any,
    cart: [{}],
}

const initialState: (InitialState) = {
    stock: {
        data: [],
    },
    product: {},
    cart: [{
        quantity: 0,
        totalPrice: 0,
    }],
};

// type ActionProduct
// ! Trocar o tipo any por outro tipo
export default function productsReducer (state = initialState, action: any) {
    switch(action.type) {
        case types.FIND_STOCK:
            return state;
        case types.SHOW_STOCK: {
            const newState = { ...state };
            newState.stock.data = action.payload;
            return newState;
        }
        case types.FIND_PRODUCT:
            return state;
        case types.SHOW_PRODUCT: {
            const newState = { ...state };
            newState.product = action.payload;
            return newState;
        }
        case types.ADD_PRODUCT: {
            const newState = { ...state };
            newState.cart.push({ ...action.payload });
            return newState;
        }
        case types.CHANGE_QUANTITY: {
            const newState = { ...state };
            // TODO Pesquisar: forEach é assíncrono/síncrono?
            // TODO Pesquisar: map é assíncrono/síncrono?
            newState.cart.forEach((item: any) =>{
                if (item.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                    item.totalPrice = action.payload.totalPrice;
                }
            });
            return newState;
        }
        case types.REMOVE_PRODUCT: {
            const newState = { ...state };
            const removeItem = newState.cart.filter((item: any) => item.id !== action.payload);
            newState.cart = [{...removeItem}];
            return newState;
        }
        default:
            return state;
    }
};