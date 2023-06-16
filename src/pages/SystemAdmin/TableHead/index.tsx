import React, {useCallback, useState} from "react";
import * as interfaces from '../../../interfaces';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TableHead: React.FC<interfaces.TableUser> = (props: interfaces.TableUser) => {
    const [sorting, setSorting] = useState(true);
    const applySorting = useCallback((key: string) => {
        const sortedData = props.data.sort(
            (previousUser: interfaces.User, nextUser: interfaces.User) => {
            switch (key) {
                case 'username':
                    return previousUser[key].localeCompare(nextUser[key]);
                case 'name':
                    return previousUser[key].localeCompare(nextUser[key]);
                case 'surname':
                    return previousUser[key].localeCompare(nextUser[key]);
                case 'address':
                    return previousUser[key].localeCompare(nextUser[key]);
                case 'email':
                    return previousUser[key].localeCompare(nextUser[key]);
                case 'role':
                    return previousUser[key].localeCompare(nextUser[key]);
                default:
                    break;
            }
        });
        props.setData(sorting ? [...sortedData] : [...sortedData.reverse()]);        
        sorting ? setSorting(false) : setSorting(true);
    }, [sorting]);
    return (
        <thead>
            <tr>
                <th onClick={() => applySorting("name")}>
                    Name {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                </th>
                <th onClick={() => applySorting("surname")}>
                    Surname {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                </th>
                <th onClick={() => applySorting("email")}>
                    Email {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                </th>
                <th onClick={() => applySorting("address")}>
                    Address {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                </th>
                <th onClick={() => applySorting("role")}>
                    Role {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                </th>
                <th>Edit User</th>
                <th>Create User</th>
            </tr>
        </thead>
    )
}

export default TableHead;