import React, {useCallback, useState} from "react";
import * as interfaces from '../../../interfaces';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TableHead: React.FC<interfaces.TableShopping> = (props: interfaces.TableShopping) => {
    const [sorting, setSorting] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);
    const applySorting = useCallback((key: string) => {
        if (!firstLoad){
            const sortedStock = props.data.sort(
                (previousItem: interfaces.ShoppingList, nextItem: interfaces.ShoppingList) => {
                switch (key) {
                    case 'userName':
                        return previousItem[key].localeCompare(nextItem[key]);
                    case 'productName':
                        return previousItem[key].localeCompare(nextItem[key]);
                    case 'quantity':
                        return previousItem[key] - nextItem[key];
                    case 'totalPrice':
                        return previousItem[key] - nextItem[key];
                    case 'dateCreated':
                        return previousItem[key].localeCompare(nextItem[key]);
                    default:
                        break;
                }
            });
            props.setData(sorting ? [...sortedStock] : [...sortedStock.reverse()]);        
            sorting ? setSorting(false) : setSorting(true);
        }
        setFirstLoad(false);
    }, [sorting, firstLoad]);
    return (
        <thead>
        <tr>
            <th onClick={() => applySorting("userName")}>
                User {sorting ? <FaArrowDown/> : <FaArrowUp/>}
            </th>
            <th onClick={() => applySorting("productName")}>
                Product {sorting ? <FaArrowDown/> : <FaArrowUp/>}
            </th>
            <th onClick={() => applySorting("quantity")}>
                Quantity {sorting ? <FaArrowDown/> : <FaArrowUp/>}
            </th>
            <th onClick={() => applySorting("totalPrice")}>
                Total Price {sorting ? <FaArrowDown/> : <FaArrowUp/>}
            </th>
            <th onClick={() => applySorting("dateCreated")}>
                Date {sorting ? <FaArrowDown/> : <FaArrowUp/>}
            </th>
        </tr>
    </thead>
    )
}

export default TableHead;