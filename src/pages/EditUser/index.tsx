import React, {useState, useCallback, useMemo} from 'react';
import { Form } from '../../styles/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';
import {editSuccess} from '../../store/modules/login/reducer';
import * as interfaces from '../../interfaces';
import Validation from '../../services/validation';
import {editUser} from '../../api/users';

export default function EditUser(){
    const user = useSelector((state: IRootState) => state.login.user);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [repeatPassword, setRepeatPassword] = useState(user.password);
    const [confirmEdit, setConfirmEdit] = useState(false);
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
    return (
            <Form onSubmit={handleSubmit}>
                <h2>Edit</h2>
                <Input field={name} setField={setName} placeholder='name'/>
                <Input field={surname} setField={setSurname} placeholder='surname'/>
                <Input field={address} setField={setAddress} placeholder='address'/>
                <Input field={email} setField={setEmail} placeholder='email'/>
                <Input field={password} setField={setPassword} placeholder='password'/>
                <Input field={repeatPassword} setField={setRepeatPassword} placeholder='repeat password'/>
                <button type="submit">Edit</button>
            </Form>
    );
}