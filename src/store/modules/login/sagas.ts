import { call, put, all, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import history from '../../../services/history';
import * as interfaces from '../../../interfaces';

function* deleteRequest(payload: any){
    yield call(axios.delete, `/users/${payload.id}`);
    toast.success('Delete successful!');
    history.push('/');
}