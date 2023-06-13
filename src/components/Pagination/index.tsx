import React, { useCallback, useState } from 'react';
import * as interfaces from '../../interfaces';
import { PaginationContainer, NumberContainer, OptionContainer } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import { showUsersPerPage } from '../../store/modules/login/reducer';
import {FaBackward, FaForward} from 'react-icons/fa';
import { searchProductByName,
    searchProductByAdditionalFeatures,
    searchProductByDescription,
    searchProductByOs, 
    showProductsPerPage 
} from '../../store/modules/products/reducer';

const Pagination: React.FC<interfaces.Pagination> = (props: interfaces.Pagination) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const pageStatus = useSelector((state: interfaces.IRootState) => state.products.pageStatus);
    const pageNumbers: Array<number> = [];
    const [numberOfPage, setNumberOfPage] = useState(0);
    function isProductDataType(object: interfaces.ProductData | interfaces.UserData): object is interfaces.ProductData {
        return true;
    }
    for (let i = 0; i < props.data.total_pages; i++) {
        pageNumbers.push(i);        
    }
    const paginationData = useCallback((numberOfPage: number) => {
        const newPageStatus: interfaces.PageNumberStatus = {...pageStatus, currentPage: numberOfPage};
        if (isProductDataType(props.data)){
            if (newPageStatus.searching === ''){
                dispatch(showProductsPerPage(newPageStatus));
            } else {
                switch(newPageStatus.option){
                    case 'Name':
                        dispatch(searchProductByName({...newPageStatus}));
                        break;
                    case 'Description':
                        dispatch(searchProductByDescription({...newPageStatus}));
                        break;
                    case 'Additional Features':
                        dispatch(searchProductByAdditionalFeatures({...newPageStatus}));
                        break;
                    case 'Operational System':
                        dispatch(searchProductByOs({...newPageStatus}));
                        break;
                    default:
                        dispatch(showProductsPerPage({...newPageStatus}));
                        break;
                }
            }
        } else {
            dispatch(showUsersPerPage({ ...newPageStatus }));
        }
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
            {props.data.total_pages > 1 && 
            <button
            key={numberOfPage+2}
            onClick={() => paginationData(numberOfPage+1)}>
                {numberOfPage+2}
            </button>
            }
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
            <p>Page</p>
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
                    <option value={page} key={page}>{page+1}</option>
                    )}
            </select>
        </OptionContainer>
        </PaginationContainer>
    )
}

export default Pagination;