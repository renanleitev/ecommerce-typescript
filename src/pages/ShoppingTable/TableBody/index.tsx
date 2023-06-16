import React from "react";
import * as interfaces from '../../../interfaces';

const TableBody: React.FC<interfaces.TableShopping> = (props: interfaces.TableShopping) => {
    return (
        <tbody>
        {React.Children.toArray(props.data.map((item: interfaces.ShoppingList) => {
            return (
                <tr>
                    <td><p>{item.userName}</p></td>
                    <td><p>{item.productName}</p></td>
                    <td><p>{item.quantity}</p></td>
                    <td><p>{item.totalPrice}</p></td>
                    <td><p>{item.dateCreated}</p></td>
                </tr>
            )}))}
        </tbody>
    )
}

export default TableBody;