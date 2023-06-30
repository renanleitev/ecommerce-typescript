import React from "react";
import * as interfaces from '../../../interfaces';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';
import { AppThunkDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import searchByColumnAndOrder from "../../../services/searchByColumnAndOrder";
import { startCase } from "lodash";
import * as text from '../../../services/variablesText';

const TableHead: React.FC<interfaces.TableProduct> = (props: interfaces.TableProduct) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const columns = ['name', 'surname', 'email', 'address', 'role'];
    return (
        <thead>
            <tr>
                {React.Children.toArray(columns.map((column) => {
                    return (
                        <th>
                            {startCase(column)}
                            <FaArrowUp onClick={() => searchByColumnAndOrder(column, 'ASC', 'user', dispatch)}/> 
                            <FaArrowDown onClick={() => searchByColumnAndOrder(column, 'DESC', 'user', dispatch)}/>
                        </th>
                    )
                }))}
                <th>{text.editUser}</th>
                <th>{text.createUser}</th>
            </tr>
        </thead>
    )
}

export default TableHead;