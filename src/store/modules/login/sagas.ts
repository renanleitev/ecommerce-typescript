import { call, put, all, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import history from '../../../services/history';
import * as interfaces from '../../../interfaces';

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