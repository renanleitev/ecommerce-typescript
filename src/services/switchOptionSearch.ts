import { searchProductByName,
    searchProductByAdditionalFeatures,
    searchProductByDescription,
    searchProductByOs, 
    showProductsPerPage 
} from '../store/modules/products/reducer';
import * as interfaces from '../interfaces';

export default function switchOptionSearch(
    pageStatus: interfaces.PageNumberStatus,
    dispatch: CallableFunction,
    option: string
): void {
    if (pageStatus.searching === ''){
        dispatch(showProductsPerPage(pageStatus));
    } else {
        switch(option){
            case 'Name':
                dispatch(searchProductByName({...pageStatus}));
                break;
            case 'Description':
                dispatch(searchProductByDescription({...pageStatus}));
                break;
            case 'Additional Features':
                dispatch(searchProductByAdditionalFeatures({...pageStatus}));
                break;
            case 'Os':
                dispatch(searchProductByOs({...pageStatus}));
                break;
            default:
                dispatch(showProductsPerPage({...pageStatus}));
                break;
        }
    }
}