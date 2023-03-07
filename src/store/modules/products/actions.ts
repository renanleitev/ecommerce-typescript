import * as types from '../types';

export function findStock(payload: any) {
    return {
        type: types.FIND_STOCK,
        payload
    };
}
export function showStock(payload: any) {
    return {
        type: types.SHOW_STOCK,
        payload
    };
}
export function findProduct(payload: any) {
    return {
        type: types.FIND_PRODUCT,
        payload
    };
}
export function showProduct(payload: any) {
    return {
        type: types.SHOW_PRODUCT,
        payload
    };
}
export function addProduct(payload: any) {
    return {
        type: types.ADD_PRODUCT,
        payload
    };
}
export function changeQuantity(payload: any) {
    return {
        type: types.CHANGE_QUANTITY,
        payload
    };
}
export function removeProduct(payload: any) {
    return {
        type: types.REMOVE_PRODUCT,
        payload
    };
}