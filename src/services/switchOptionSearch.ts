import { searchProductByName,
    searchProductByAdditionalFeatures,
    searchProductByDescription,
    searchProductByOs, 
    showProductsPerPage, 
    searchProductByPrice
} from '../store/modules/products/reducer';
import * as interfaces from '../interfaces';

export default function switchOptionSearch(
    pageStatus: interfaces.PageNumberStatus,
    dispatch: CallableFunction,
): void {
    if (pageStatus.searching === '' && pageStatus.option !== 'Price'){
        dispatch(showProductsPerPage(pageStatus));
    } else {
        switch(pageStatus.option){
            case 'Name':
                dispatch(searchProductByName({...pageStatus}));
                break;
            case 'Description':
                dispatch(searchProductByDescription({...pageStatus}));
                break;
            case 'Additional Features':
                dispatch(searchProductByAdditionalFeatures({...pageStatus}));
                break;
            case 'Operational System':
                dispatch(searchProductByOs({...pageStatus}));
                break;
            case 'Price':
                dispatch(searchProductByPrice({...pageStatus}));
                break;
            default:
                dispatch(showProductsPerPage({...pageStatus}));
                break;
        }
    }
}