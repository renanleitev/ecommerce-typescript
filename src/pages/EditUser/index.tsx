import React, {useState, useCallback} from 'react';
import { Form } from '../../styles/GlobalStyle';
import * as actions from '../../store/modules/login/actions';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import { IRootState } from '../../store/modules/rootReducer';

export default function EditUser(){
    const user = useSelector((state: IRootState) => state.login.user);
    const id = user.id;
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        if (confirmEdit) {
            dispatch(actions.editRequest({
                id, name, surname, address, email, password
            }));
            setConfirmEdit(false);
        }
        else {
            toast.success('Do you confirm the changes?');
            setConfirmEdit(true);
        }
    }, [confirmEdit, dispatch, id, name, surname, address, email, password]);
    return (
            <Form onSubmit={handleSubmit}>
                <h2>Edit</h2>
                <label htmlFor='name'>Name</label>
                <Input field={name} setField={setName} placeholder='Name'/>
                <label htmlFor='surname'>Surname</label>
                <Input field={surname} setField={setSurname} placeholder='Surname'/>
                <label htmlFor='address'>Address</label>
                <Input field={address} setField={setAddress} placeholder='Address'/>
                <label htmlFor='email'>Email</label>
                <Input field={email} setField={setEmail} placeholder='Email'/>
                <label htmlFor='password'>Password</label>
                <Input field={password} setField={setPassword} placeholder='Password'/>
                <button type="submit">Edit</button>
            </Form>
    );
}