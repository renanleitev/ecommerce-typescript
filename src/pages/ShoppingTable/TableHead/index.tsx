import React from "react";

export default function TableHead(): JSX.Element {
    return (
        <thead>
        <tr>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Date</th>
        </tr>
    </thead>
    )
}