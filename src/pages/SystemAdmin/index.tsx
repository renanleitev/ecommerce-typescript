import React, { useEffect, useState } from 'react';
import {FaEdit} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { showUsersPerPage } from '../../store/modules/login/reducer';
import { AppThunkDispatch } from '../../store';
import * as interfaces from '../../interfaces';
import Pagination from '../../components/Pagination';
import { DivTable, Table } from '../SearchingTable/styled';
import Modal from '../../components/Modal';
import useModal from "../../hooks/useModal";
import { HiddenTd } from "../../components/TableBody/styled";
import EditUser from '../EditUser';
import CreateUser from '../CreateUser';

export default function SystemAdmin(): JSX.Element{
    const dispatch = useDispatch<AppThunkDispatch>();
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const usersPerPage = useSelector((state: interfaces.IRootState) => state.login.usersPerPage) || { data: [], total_pages: 0, total_items: 0 };
    const [editedUser, setEditedUser] = useState<interfaces.User>();
    const [pageStatus, setPageStatus] = useState<interfaces.PageNumberStatus>({
        currentPage: 0,
        itemsPerPage: 2
    });
    const [option, setOption] = useState('');
    const { isOpen, toggle } = useModal();
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
                    <th>Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
            {React.Children.toArray(usersPerPage.data.map((user: interfaces.User) => {
                return (
                    <tr>
                        <HiddenTd hidden={!isOpen}>
                            <Modal isOpen={isOpen} toggle={toggle}>
                                {option === 'edit' ? <EditUser user={editedUser}/>:<CreateUser/>}
                            </Modal>
                        </HiddenTd>
                        <td><p>{user.name}</p></td>
                        <td><p>{user.surname}</p></td>
                        <td><p>{user.email}</p></td>
                        <td><p>{user.address}</p></td>
                        <td><p>{user.role}</p></td>
                        <td>
                            <button
                            onClick={() => {
                                toggle();
                                setOption('edit');
                                setEditedUser(user);
                            }}
                            >
                                <FaEdit size={22}/>
                            </button>
                        </td>
                    </tr>
                )}))}
            </tbody>
            </Table>
            <button
                onClick={() => {
                    toggle();
                    setOption('create');
                    setEditedUser(user);
                }}
                >
                    Create User
            </button>
            <Pagination pageStatus={pageStatus} setPageStatus={setPageStatus} data={usersPerPage}/>
        </DivTable> : <></>}
        </>
    )
}