import React from "react";
import * as interfaces from '../../../interfaces';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';
import { AppThunkDispatch } from '../../../store';
import { useSelector, useDispatch } from 'react-redux';
import searchByColumnAndOrder from "../../../services/searchByColumnAndOrder";
import { startCase } from "lodash";
import * as text from '../../../services/variablesText';

const TableHead: React.FC<interfaces.TableProduct> = (props: interfaces.TableProduct) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.users.isLoggedIn) || false;
    const columns = ['name', 'image', 'description', 'price'];
    return (
        <thead>
            <tr>
                {React.Children.toArray(columns.map((column) => {
                    return (
                        <th>
                            {startCase(column)}
                            <FaArrowUp onClick={() => searchByColumnAndOrder(column, 'ASC', 'product', dispatch)}/> 
                            <FaArrowDown onClick={() => searchByColumnAndOrder(column, 'DESC', 'product', dispatch)}/>
                        </th>
                    )
                }))}
                {isLoggedIn ? (
                <>
                    <th>{text.quantity}</th>
                    <th>{text.totalPrice}</th>
                    <th>{text.options}</th>
                </>
                ) : (<></>)}
            </tr>
        </thead>
    )
}

export default TableHead;