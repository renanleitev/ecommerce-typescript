import React, {useCallback} from "react";
import * as interfaces from '../../interfaces';
import { debounce } from "lodash";
// rxjs

const InputSearch: React.FC<interfaces.TableBody> = (props: interfaces.TableBody) => {
    const searchTable = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        const searchTerm = e.currentTarget.value.toString().toLowerCase();
        const searching = debounce((value) => {
            value === '' ? 
            props.setStock(props.originalStock) : 
            props.setStock(props.stock.filter(
                product =>
                product.description.toLowerCase().indexOf(value) > -1,
            ));
        }, 3000);
        searching(searchTerm);
    }, [props.stock]);
    return (
        <input
        onChange={searchTable}
        placeholder={'Search for products...'}/>
    )
}

export default InputSearch