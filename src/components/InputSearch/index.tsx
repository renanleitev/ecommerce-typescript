import React, {useCallback} from "react";
import * as interfaces from '../../interfaces';
import { debounce } from "lodash";
import { searchProductByName, showProductsPerPage } from "../../store/modules/products/reducer";
import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';

const InputSearch: React.FC<interfaces.InputSearch> = (props: interfaces.InputSearch) => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const searchTable = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        const searchTerm = e.currentTarget.value.toString().toLowerCase();
        const inputSearch: interfaces.PageNumberStatus = {
            searching: searchTerm,
            currentPage: props.pageStatus.currentPage,
            itemsPerPage: props.pageStatus.itemsPerPage
        }
        // 1000 = 1 second
        const searchDelayTime = 1000;
        const searching = debounce((value) => {
            searchTerm === '' ? 
            dispatch(showProductsPerPage(props.pageStatus)) : 
            dispatch(searchProductByName(value));
        }, searchDelayTime);
        searching(inputSearch);
        props.setSearchTerm(searchTerm);
    }, []);
    return (
        <input
        onKeyUp={(event) => {
                if (event.key === "Enter") searchTable(event);
                }}
        placeholder={'Search for products...'}/>
    )
}

export default InputSearch