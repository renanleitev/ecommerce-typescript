import React, { useEffect, useState } from 'react';
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

export default function SystemAdmin(): JSX.Element{
    const dispatch = useDispatch<AppThunkDispatch>();
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const usersPerPage = useSelector((state: interfaces.IRootState) => state.login.usersPerPage) || { data: [], total_pages: 0, total_items: 0 };
    const [editedUser, setEditedUser] = useState<interfaces.User>(initialUser);
    const [pageStatus, setPageStatus] = useState<interfaces.PageNumberStatus>({
        currentPage: 0,
        itemsPerPage: 2
    });
    useEffect(() => {
        dispatch(showUsersPerPage(pageStatus));
    }, [pageStatus]);
    return ( 
        <>
        {user.role === "ROLE_ADMIN" ?
        <DivTable>
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
            <Pagination pageStatus={pageStatus} setPageStatus={setPageStatus} data={usersPerPage}/>
        </DivTable> : <></>}
        </>
    )
}