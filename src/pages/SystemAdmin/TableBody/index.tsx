import React from "react";
import {FaEdit, FaDatabase} from 'react-icons/fa';
import * as interfaces from '../../../interfaces';
import EditUser from '../../EditUser';
import CreateUser from '../../CreateUser';
import ModalDialog from "../../../components/ModalDialog";

const TableBody: React.FC<interfaces.TableUser> = (props: interfaces.TableUser) => {
    return (
        <tbody>
        {React.Children.toArray(props.data.map((user: interfaces.User) => {
            return (
                <tr data-item={user}>
                    <td><p>{user.name}</p></td>
                    <td><p>{user.surname}</p></td>
                    <td><p>{user.email}</p></td>
                    <td><p>{user.address}</p></td>
                    <td><p>{user.role}</p></td>
                    <td>      
                        <ModalDialog iconToOpenModal={FaEdit} onClickFunction={() => 'null'}>
                            <EditUser user={user}/>
                        </ModalDialog>
                    </td>
                    <td>
                        <ModalDialog iconToOpenModal={FaDatabase} onClickFunction={() => 'null'}>
                            <CreateUser/>
                        </ModalDialog>
                    </td>
                </tr>
            )}))}
        </tbody>
    )
}

export default TableBody;