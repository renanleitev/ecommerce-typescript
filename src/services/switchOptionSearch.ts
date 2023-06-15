import { searchProductByName,
    searchProductByAdditionalFeatures,
    searchProductByDescription,
    searchProductByOs, 
    showProductsPerPage, 
    searchProductByPrice
} from '../store/modules/products/reducer';
import { searchUserByAddress,
    searchUserByEmail,
    searchUserByName,
    searchUserByRole,
    searchUserByUsername,
    searchUserBySurname,
    showUsersPerPage
} from '../store/modules/login/reducer';
import * as interfaces from '../interfaces';

export default function switchOptionSearch(
    pageStatus: interfaces.PageNumberStatus,
    dispatch: CallableFunction,
): void {
    if (pageStatus.searching === '' && pageStatus.option !== 'Price' && pageStatus.type === 'product'){
        dispatch(showProductsPerPage(pageStatus));
    } else if (pageStatus.searching === '' && pageStatus.type === 'user') {
        dispatch(showUsersPerPage(pageStatus));
    }
    else {
        switch(pageStatus.option){
            // searchProductBy
            case 'Name Product':
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
            // searchUserBy
            case 'Username':
                dispatch(searchUserByUsername({...pageStatus}));
                break;
            case 'Name User':
                dispatch(searchUserByName({...pageStatus}));
                break;
            case 'Surname':
                dispatch(searchUserBySurname({...pageStatus}));
                break;
            case 'Address':
                dispatch(searchUserByAddress({...pageStatus}));
                break;
            case 'Email':
                dispatch(searchUserByEmail({...pageStatus}));
                break;
            case 'Role':
                dispatch(searchUserByRole({...pageStatus}));
                break;
            default:
                dispatch(showProductsPerPage({...pageStatus}));
                break;
        }
    }
}