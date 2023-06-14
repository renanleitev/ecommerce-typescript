import React, { useEffect, useState, useCallback } from 'react';
import {FaDatabase, FaEdit} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { showUsersPerPage } from '../../store/modules/login/reducer';
import { AppThunkDispatch } from '../../store';
import * as interfaces from '../../interfaces';
import Pagination from '../../components/Pagination';
import { DivTable, Table } from '../SearchingTable/styled';
import EditUser from '../EditUser';
import CreateUser from '../CreateUser';
import ModalDialog from '../../components/ModalDialog';
import { initialUser } from '../../store/modules/login/reducer';
import Select from '../../components/Select';
import { debounce } from 'lodash';
import { changePageStatus } from '../../store/modules/products/reducer';
import switchOptionSearch from '../../services/switchOptionSearch';

export default function SystemAdmin(): JSX.Element{
    const dispatch = useDispatch<AppThunkDispatch>();
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const usersPerPage = useSelector((state: interfaces.IRootState) => state.login.usersPerPage) || { data: [], total_pages: 0, total_items: 0 };
    const [editedUser, setEditedUser] = useState<interfaces.User>(initialUser);
    const pageStatus: interfaces.PageNumberStatus = {
        currentPage: 0,
        itemsPerPage: 3
    };
    useEffect(() => {
        dispatch(showUsersPerPage(pageStatus));
    }, []);
    let option = '';
    let search = '';
    const handleDefaultOptions = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
        option = event.currentTarget.value;
    }, []);
    const handleInputSearch = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        // 1000 = 1 second
        const delayTime = 1000;
        const searching = debounce((value) => {
            search = value;
        }, delayTime);
        searching(e.currentTarget.value.toString().toLowerCase());        
    }, []);
    const handleButtonSearch = useCallback(() => {
        const newPageStatus: interfaces.PageNumberStatus = {
            ...pageStatus, 
            searching: search,
            option: option,
            type: 'user'
        }
        dispatch(changePageStatus(newPageStatus));
        switchOptionSearch(newPageStatus, dispatch);
    }, []); 
    const defaultOptions = ['Username', 'Name User', 'Surname', 'Address', 'Email', 'Role'];
    return ( 
        <>
        {user.role === "ROLE_ADMIN" ?
        <DivTable>
            <input
            onChange={handleInputSearch}
            placeholder={'Search for users...'}
            className='search-bar'/>
            <Select onChangeFunction={handleDefaultOptions} options={defaultOptions}/>
            <button onClick={handleButtonSearch}>Search</button>
            <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Role</th>
                    <th>Edit User</th>
                    <th>Create User</th>
                </tr>
            </thead>
            <tbody>
            {React.Children.toArray(usersPerPage.data.map((user: interfaces.User) => {
                return (
                    <tr>
                        <td><p>{user.name}</p></td>
                        <td><p>{user.surname}</p></td>
                        <td><p>{user.email}</p></td>
                        <td><p>{user.address}</p></td>
                        <td><p>{user.role}</p></td>
                        <td>      
                            <ModalDialog iconToOpenModal={FaEdit} onClickFunction={() => setEditedUser(user)}>
                                <EditUser user={user}/>
                            </ModalDialog>
                        </td>
                        <td>
                            <ModalDialog iconToOpenModal={FaDatabase} onClickFunction={() => setEditedUser(editedUser)}>
                                <CreateUser/>
                            </ModalDialog>
                        </td>
                    </tr>
                )}))}
            </tbody>
            </Table>
            <Pagination data={usersPerPage}/>
        </DivTable> : <></>}
        </>
    )
}