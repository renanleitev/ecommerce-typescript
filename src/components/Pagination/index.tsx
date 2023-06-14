import React, { useCallback, useState } from 'react';
import * as interfaces from '../../interfaces';
import { PaginationContainer, NumberContainer } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import { showShoppings } from '../../store/modules/products/reducer';
import {FaBackward, FaForward} from 'react-icons/fa';
import switchOptionSearch from '../../services/switchOptionSearch';

const Pagination: React.FC<interfaces.Pagination> = (props: interfaces.Pagination) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const pageStatus = useSelector((state: interfaces.IRootState) => state.products.pageStatus);
    const pageNumbers: Array<number> = [];
    const [numberOfPage, setNumberOfPage] = useState(0);
    for (let i = 0; i < props.data.total_pages; i++) {
        pageNumbers.push(i);        
    }
    const paginationData = useCallback((numberOfPage: number) => {
        const newPageStatus: interfaces.PageNumberStatus = {...pageStatus, currentPage: numberOfPage};
        switch(props.type){
            case 'shopping':
                dispatch(showShoppings({ ...newPageStatus }));
                break;
            default:
                switchOptionSearch(newPageStatus, dispatch);
                break;
        }
    }, [pageStatus]);
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