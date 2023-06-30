import React, { useCallback, useState } from 'react';
import * as interfaces from '../../interfaces';
import { PaginationContainer, NumberContainer } from './styled';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import {FaBackward, FaForward} from 'react-icons/fa';
import switchOptionSearch from '../../services/switchOptionSearch';

const Pagination: React.FC<interfaces.Pagination> = (props: interfaces.Pagination) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const pageNumbers: Array<number> = [];
    const [numberOfPage, setNumberOfPage] = useState(0);
    for (let i = 0; i < props.data.total_pages; i++) {
        pageNumbers.push(i);        
    }
    const paginationData = useCallback((numberOfPage: number) => {
        switch(props.pageStatus.type){
            case 'product': {
                const newProductPageStatus: interfaces.PageNumberStatus = {
                    ...props.pageStatus, 
                    searching: localStorage.getItem('searchingProduct'),
                    option: localStorage.getItem('optionProduct'),
                    operator: localStorage.getItem('operatorProduct'),
                    price: localStorage.getItem('priceProduct'),
                    column: localStorage.getItem('columnProduct'),
                    order: localStorage.getItem('orderProduct'),
                    currentPage: numberOfPage
                };
                switchOptionSearch({...newProductPageStatus}, dispatch);
                break;
            }
            case 'user': {
                const newUserPageStatus: interfaces.PageNumberStatus = {
                    ...props.pageStatus, 
                    searching: localStorage.getItem('searchingUser'),
                    option: localStorage.getItem('optionUser'),
                    column: localStorage.getItem('columnUser'),
                    order: localStorage.getItem('orderUser'),
                    currentPage: numberOfPage
                };
                switchOptionSearch(newUserPageStatus, dispatch);
                break;
            }
            case 'shopping': {
                const newShoppingPageStatus: interfaces.PageNumberStatus = {
                    ...props.pageStatus,
                    currentPage: numberOfPage
                };
                switchOptionSearch(newShoppingPageStatus, dispatch);
                break;
            }
            default:
                break;   
        }
    }, []);
    return (
        <PaginationContainer>
            <NumberContainer>
                <button
                    onClick={() => {
                        if(numberOfPage !== 0){
                            setNumberOfPage(numberOfPage-1);
                        }
                    }}>
                        <FaBackward/>
                </button>
                <button
                    key={numberOfPage+1}
                    onClick={() => paginationData(numberOfPage)}>
                    {numberOfPage+1}
                </button>
                {props.data.total_pages > 1 && 
                <button
                key={numberOfPage+2}
                onClick={() => paginationData(numberOfPage+1)}>
                    {numberOfPage+2}
                </button>}
                <button
                    onClick={() => {
                        if((numberOfPage+2) <= pageNumbers.at(-1)){
                            setNumberOfPage(numberOfPage+1);
                        }
                    }}>
                    <FaForward/>
                </button>
            </NumberContainer>
        </PaginationContainer>
    )
}

export default Pagination;