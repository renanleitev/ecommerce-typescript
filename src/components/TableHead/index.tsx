import React, {useCallback, useState} from "react";
import * as interfaces from '../../interfaces';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const TableHead: React.FC<interfaces.TableHead> = (props: interfaces.TableHead) => {
    const [sorting, setSorting] = useState(true);
    const isLoggedIn = useSelector((state: interfaces.IRootState) => state.login.isLoggedIn);
    const applySorting = useCallback((key: string) => {
        const sortedStock = props.stock.sort(
            (previousProduct: interfaces.Product, nextProduct: interfaces.Product) => {
            switch (key) {
                case 'name':
                    return previousProduct[key].localeCompare(nextProduct[key]);
                case 'images':
                    return previousProduct[key].localeCompare(nextProduct[key]);
                case 'price':
                    return Number.parseFloat(previousProduct[key]) - Number.parseFloat(nextProduct[key]);
                case 'quantity':
                    return previousProduct[key] - nextProduct[key];
                case 'totalPrice':
                    return previousProduct[key] - nextProduct[key];
                case 'description':
                    return previousProduct[key].localeCompare(nextProduct[key]);
                default:
                    break;
            }
        });
        props.setStock(sorting ? [...sortedStock] : [...sortedStock.reverse()]);        
        sorting ? setSorting(false) : setSorting(true);
    }, [sorting]);
    return (
        <thead>
            <tr>
                <th onClick={() => applySorting("name")}>
                    Name {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                </th>
                <th onClick={() => applySorting("images")}>
                    Images {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                </th>
                <th onClick={() => applySorting("description")}>
                    Description {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                </th>
                <th onClick={() => applySorting("price")}>
                    Price {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                </th>
                {isLoggedIn ? (
                <>
                    <th onClick={() => applySorting("quantity")}>
                        Quantity {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                    </th>
                    <th onClick={() => applySorting("totalPrice")}>
                        Total Price {sorting ? <FaArrowDown/> : <FaArrowUp/>}
                    </th>
                    <th>
                        Add/Remove
                    </th>
                </>
                ) : (<></>)}
            </tr>
        </thead>
    )
}

export default TableHead;