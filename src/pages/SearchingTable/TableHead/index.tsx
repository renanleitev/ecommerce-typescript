import React from "react";
import * as interfaces from '../../../interfaces';
import { useSelector } from 'react-redux';

export default function TableHead(): JSX.Element {
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                {isLoggedIn ? (
                <>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Options</th>
                </>
                ) : (<></>)}
            </tr>
        </thead>
    )
}