import React, { useState } from "react";
import {FaEdit, FaDatabase} from 'react-icons/fa';
import * as interfaces from '../../../interfaces';
import ModalDialog from "../../../components/ModalDialog";
import { initialUser } from "../../../store/modules/login/reducer";
import EditUser from "../../EditUser";
import CreateUser from "../../CreateUser";

const TableBody: React.FC<interfaces.TableUser> = (props: interfaces.TableUser) => {
    const [editedUser, setEditedUser] = useState<interfaces.User>(initialUser);
    return (
            <tbody>
            {React.Children.toArray(props.data.map((user: interfaces.User) => {
                return (
                    <tr>
                        <td><p>{user.name}</p></td>
                        <td><p>{user.surname}</p></td>
                        <td><p>{user.email}</p></td>
                        <td><p>{user.address}</p></td>
                        <td><p>{user.role}</p></td>
                        <td>      
                            <ModalDialog iconToOpenModal={FaEdit} onClickFunction={() => setEditedUser({...user})}>
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
    )
}

export default TableBody;