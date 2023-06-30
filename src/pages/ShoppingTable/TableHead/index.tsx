import React from "react";
import * as text from '../../../services/variablesText';

export default function TableHead(): JSX.Element {
    return (
        <thead>
            <tr>
                <th>{text.user}</th>
                <th>{text.product}</th>
                <th>{text.quantity}</th>
                <th>{text.totalPrice}</th>
                <th>{text.dateText}</th>
            </tr>
        </thead>
    )
}