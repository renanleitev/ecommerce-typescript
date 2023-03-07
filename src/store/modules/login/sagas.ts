import { call, put, all, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';
import * as interfaces from '../../../interfaces';

function* loginRequest(payload: any) {
    let dataUser;
    let credentialsAreValid = false;
    try {
        const users: interfaces.ResponseGenerator = yield call(axios.get, '/users');
        users.data.forEach((user: any) => {
            if (
                (!credentialsAreValid) &&
                (payload.email === user.email) && 
                (payload.password === user.password)
            ) {
                credentialsAreValid = true;
                dataUser = user;
            }  
        })
        if (credentialsAreValid) {
            toast.success('Login successful! Redirecting...');
            yield put(actions.loginSuccess(payload));
            yield put(actions.editSuccess(dataUser));
            history.push('/');
        }
        if (!credentialsAreValid) toast.error('User/password invalid.');
    } 
    catch (e) {
        toast.error('Error:', e);
        yield put(actions.loginFailure(payload));
    }
}
function* loginFailure(payload: any) {
    try {
        if (payload.isLoggedIn){
            yield put(actions.loginSuccess(payload));
        }
    } 
    catch (e) {
        toast.error('Erro', e);
        yield put(actions.loginFailure(payload));
    }
}
function* editRequest(payload: any){
    try {
        yield call(axios.put, `/users/${payload.id}`, {payload});
        toast.success('Update successful!');
        yield put(actions.editSuccess(payload));
        history.push('/');
    }
    catch (e) {
        toast.error('Error:', e);
        yield put(actions.loginFailure(payload));
    }
}
function* registerRequest(payload: any){
    yield call(axios.post, '/users', {payload});
    toast.success('Register successful!');
    yield put(actions.editSuccess(payload));
    history.push('/');
}
function* deleteRequest(payload: any){
    yield call(axios.delete, `/users/${payload.id}`);
    toast.success('Delete successful!');
    history.push('/');
}
// takeLatest = Obtém apenas o último clique do botão
export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.LOGIN_FAILURE, loginFailure),
    takeLatest(types.EDIT_REQUEST, editRequest),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
    takeLatest(types.DELETE_REQUEST, deleteRequest),
]);