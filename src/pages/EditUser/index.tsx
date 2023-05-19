import React, {useState, useCallback} from 'react';
import { Form } from '../../styles/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import {editUser, deleteUser} from '../../store/modules/login/reducer';
import * as interfaces from '../../interfaces';
import validationUser from '../../services/validationUser';
import { ButtonContainer } from './styled';
import { AppThunkDispatch } from '../../store';

export default function EditUser(): JSX.Element {
    const dispatch = useDispatch<AppThunkDispatch>();
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const [editedUser, setEditedUser] = useState<interfaces.User>({...user});
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        const formErrors = validationUser(editedUser);
        if(formErrors){
            toast.error('Form data error. Please, try again.');
        } else if (user.id === undefined) {
            toast.error('Can not edit/delete account on first loggin. Please, logout first.');
        } else {
            dispatch(editUser(editedUser));
        }
    }, [editedUser, user.id, dispatch]);
    const handleDelete = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        dispatch(deleteUser(editedUser));
    }, [dispatch, editedUser]);
    return (
            <Form onSubmit={handleSubmit}>
                <h2>Edit</h2>
                <Input data={editedUser} setData={setEditedUser} keyName='username' keyValue={user.username}/>
                <Input data={editedUser} setData={setEditedUser} keyName='name' keyValue={user.name}/>
                <Input data={editedUser} setData={setEditedUser} keyName='surname' keyValue={user.surname}/>
                <Input data={editedUser} setData={setEditedUser} keyName='address' keyValue={user.address}/>
                <Input data={editedUser} setData={setEditedUser} keyName='email' keyValue={user.email}/>
                <Input data={editedUser} setData={setEditedUser} keyName='password' keyValue={user.password}/>
                <ButtonContainer>
                    <button type="submit">Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </ButtonContainer>
            </Form>
    );
}