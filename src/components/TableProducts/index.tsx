import React, {useState, useMemo, useCallback} from "react";
import { Table } from "./styled";
import * as interfaces from '../../interfaces';
import { AppThunkDispatch } from '../../store';
import { showStock } from '../../store/modules/products/reducer';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TableProducts: React.FC<interfaces.TableProducts> = (props: interfaces.TableProducts) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const [sorting, setSorting] = useState(true);
    useMemo(() => {
        dispatch(showStock());
    }, [dispatch]);
    const applySorting = useCallback((key: string) => {
        const currentStockCopy = [...props.stock];
        const sortedCurrentStock = currentStockCopy.sort(
            (a: interfaces.Product, b: interfaces.Product) => {
            switch (key) {
                case 'name':
                    return a[key].localeCompare(b[key]);
                case 'images':
                    return a[key].localeCompare(b[key]);
                case 'price':
                    return Number.parseFloat(a[key]) - Number.parseFloat(b[key]);
                case 'description':
                    return a[key].localeCompare(b[key]);
                default:
                    break;
            }
        });
        props.setStock(
            sorting ? sortedCurrentStock : sortedCurrentStock.reverse()
        );
        sorting ? setSorting(false) : setSorting(true);
    }, [sorting]);
    return (
        <Table>
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
                </tr>
            </thead>
            <tbody>
                {props.stock
                .map((product: interfaces.Product, index: number) => {
                    return (
                        <tr className='product' key={index}> 
                            <td key={index+1}>
                                <Link key={index+2} to={`product/${product.id}`}>
                                    {product.name}
                                </Link>
                            </td>
                            <td key={index+3}>
                                <img key={index+4} src={product.images} alt=''/>
                            </td>
                            <td key={index+5}>
                                <p key={index+6}>{product.description}</p>
                            </td>
                            <td key={index+7}>
                                <p key={index+8}>${product.price}</p>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default TableProducts;