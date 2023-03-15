import React, {useState, useCallback, useMemo} from 'react';
import { Form } from '../../styles/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import InputUser from '../../components/InputUser';
import { toast } from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';
import {editSuccess} from '../../store/modules/login/reducer';
import * as interfaces from '../../interfaces';
import Validation from '../../services/validation';
import {editUser} from '../../api/users';
import {deleteSuccess} from '../../store/modules/login/reducer';
import {removeUser} from '../../api/users';
import { ButtonContainer } from './styled';

export default function EditUser(){
    const user = useSelector((state: IRootState) => state.login.user);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [repeatPassword, setRepeatPassword] = useState(user.password);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const dispatch = useDispatch();
    const [editedUser, setEditedUser] = useState<interfaces.User>({...user});
    useMemo(() => {
        setEditedUser({
            id: user.id,
            name: name,
            surname: surname,
            address: address,
            email: email,
            password: password,
        })
    }, [address, email, name, password, surname, user.id]);
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        const formErrors = Validation(editedUser, repeatPassword);
        if(confirmEdit && !formErrors){
            editUser(editedUser);
            dispatch(editSuccess(editedUser));
        } else {
            toast.success('Do you confirm the changes?');
            setConfirmEdit(true);
        }
    }, [editedUser, repeatPassword, confirmEdit, dispatch]);
    const handleDelete = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        if (confirmDelete){
            dispatch(deleteSuccess());
            removeUser(user);
        } 
        else {
            toast.success('Do you want to delete your account?');
            setConfirmDelete(true);
        }
    }, [confirmDelete, dispatch, user]);
    return (
            <Form onSubmit={handleSubmit}>
                <h2>Edit</h2>
                <InputUser data={name} setData={setName} placeholder='name'/>
                <InputUser data={surname} setData={setSurname} placeholder='surname'/>
                <InputUser data={address} setData={setAddress} placeholder='address'/>
                <InputUser data={email} setData={setEmail} placeholder='email'/>
                <InputUser data={password} setData={setPassword} placeholder='password'/>
                <InputUser data={repeatPassword} setData={setRepeatPassword} placeholder='repeat password'/>
                <ButtonContainer>
                    <button type="submit">Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </ButtonContainer>
            </Form>
    );
}