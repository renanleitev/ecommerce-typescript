import React, { useCallback, useState } from 'react';
import * as interfaces from '../../interfaces';
import { PaginationContainer, NumberContainer, OptionContainer } from './styled';
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import { searchProductByName, showProductsPerPage } from '../../store/modules/products/reducer';
import { showUsersPerPage } from '../../store/modules/login/reducer';
import {FaBackward, FaForward} from 'react-icons/fa';

const Pagination: React.FC<interfaces.Pagination> = (props: interfaces.Pagination) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const pageStatus = props.pageStatus;
    const pageNumbers: Array<number> = [];
    const [numberOfPage, setNumberOfPage] = useState(0);
    function isProductDataType(object: interfaces.ProductData | interfaces.UserData): object is interfaces.ProductData {
        return true;
    }
    for (let i = 0; i < props.data.total_pages; i++) {
        pageNumbers.push(i);        
    }
    const paginationData = useCallback((numberOfPage: number) => {
        pageStatus.currentPage = numberOfPage;
        if (isProductDataType(props.data)){
            if (props.pageStatus.searching === '') {
                dispatch(showProductsPerPage({ ...pageStatus }));
            } else {
                dispatch(searchProductByName({...pageStatus}));
            }
        } else {
            dispatch(showUsersPerPage({ ...pageStatus }));
        }
        props.setPageStatus({ ...pageStatus });
    }, [pageStatus]);
    const handleChange = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
        setNumberOfPage(Number.parseInt(event.currentTarget.value));
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
            <button
                key={numberOfPage+2}
                onClick={() => paginationData(numberOfPage+1)}>
                {numberOfPage+2}
            </button>
            <button
                onClick={() => {
                    if((numberOfPage+2) <= pageNumbers.at(-1)){
                        setNumberOfPage(numberOfPage+1);
                    }
                }}>
                <FaForward/>
            </button>
        </NumberContainer>
        <OptionContainer>
            <p>Page Number</p>
            <input
            onChange={(event) => {
                if (event.currentTarget.value !== ''){
                    setNumberOfPage(Number.parseInt(event.currentTarget.value)-1);
                }
            }}
            type="number" 
            min={1} 
            max={pageNumbers.length} 
            defaultValue={1}
            placeholder={'Page...'}/>
            <select onChange={handleChange} size={2}>
                {pageNumbers.map(page => 
                    <option value={page}>{page+1}</option>
                    )}
            </select>
        </OptionContainer>
        </PaginationContainer>
    )
}

export default Pagination;