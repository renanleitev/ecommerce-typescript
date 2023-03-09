import React, {useCallback, useState} from 'react';
import { Form } from '../../styles/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';
import {deleteSuccess} from '../../store/modules/login/reducer';
import axios from '../../services/axios';
import history from '../../services/history';

export default function DeleteUser(){
    const user = useSelector((state: IRootState) => state.login.user);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        async function removeUser(){
            try{
                if (user.id !== undefined){
                    await axios.delete(`/users/${user.id}`);
                    toast.success('Delete successful!');
                    dispatch(deleteSuccess());
                    setConfirmDelete(false);
                    history.push('/');
                } else {
                    toast.error('You need to log in first to be able to delete your account');
                }
            }
            catch(e){console.log(e);}
        }
        if (confirmDelete) removeUser();
        else {
            toast.success('Do you want to delete your account?');
            setConfirmDelete(true);
        }
    }, [confirmDelete, dispatch, user]);
    return (
            <Form onSubmit={handleSubmit}>
                <h2>Delete account</h2>
                <button type="submit">Delete</button>
            </Form>
    );
}