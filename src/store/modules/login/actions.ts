import * as types from '../types';

export function loginRequest(payload: any) {
    return {
        type: types.LOGIN_REQUEST,
        payload
    };
}
export function loginSuccess(payload: any) {
    return {
        type: types.LOGIN_SUCCESS,
        payload
    };
}
export function loginFailure(payload: any) {
    return {
        type: types.LOGIN_FAILURE,
        payload
    };
}
export function editRequest(payload: any) {
    return {
        type: types.EDIT_REQUEST,
        payload
    };
}
export function editSuccess(payload: any) {
    return {
        type: types.EDIT_SUCCESS,
        payload
    };
}
export function editFailure(payload: any) {
    return {
        type: types.EDIT_FAILURE,
        payload
    };
}
export function registerRequest(payload: any){
    return {
        type: types.REGISTER_REQUEST,
        payload
    };
}
export function deleteRequest(payload: any){
    return {
        type: types.DELETE_REQUEST,
        payload
    };
}