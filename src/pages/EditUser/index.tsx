import React, {useState, useCallback} from 'react';
import { Form } from '../../styles/GlobalStyle';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import {editUser, deleteUser} from '../../store/modules/login/reducer';
import * as interfaces from '../../interfaces';
import validationUser from '../../services/validationUser';
import { ButtonContainer } from './styled';
import { AppThunkDispatch } from '../../store';

export default function EditUser(props: interfaces.EditUser): JSX.Element {
    const dispatch = useDispatch<AppThunkDispatch>();
    const [editedUser, setEditedUser] = useState<interfaces.User>(props.user);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        const formErrors = validationUser({...editedUser});
        if(formErrors){
            toast.error('Form data error. Please, try again.');
        } else {
            dispatch(editUser({...editedUser}));
        }
    }, [editedUser, dispatch]);
    const handleDelete = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        dispatch(deleteUser({...editedUser}));
    }, [dispatch, editedUser]);
    return (
            <Form onSubmit={handleSubmit}>
                <h2>Edit/Delete User</h2>
                <Input data={editedUser} setData={setEditedUser} keyName='username' keyValue={props.user.username}/>
                <Input data={editedUser} setData={setEditedUser} keyName='name' keyValue={props.user.name}/>
                <Input data={editedUser} setData={setEditedUser} keyName='surname' keyValue={props.user.surname}/>
                <Input data={editedUser} setData={setEditedUser} keyName='address' keyValue={props.user.address}/>
                <Input data={editedUser} setData={setEditedUser} keyName='email' keyValue={props.user.email}/>
                <Input data={editedUser} setData={setEditedUser} keyName='password' keyValue={props.user.password}/>
                <ButtonContainer>
                    <button type="submit">Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </ButtonContainer>
            </Form>
    );
}