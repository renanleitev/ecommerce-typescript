import { searchProductByName,
    searchProductByAdditionalFeatures,
    searchProductByDescription,
    searchProductByOs, 
    showProductsPerPage, 
    searchProductByPrice,
    showShoppings
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
    console.log(pageStatus);
    
    switch(pageStatus.type){
        case 'shopping':
            dispatch(showShoppings({...pageStatus}));
            break;
        case 'product':            
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
                default:
                    dispatch(showProductsPerPage({...pageStatus}));
                    break;
                }
            break;
        case 'user':
            switch(pageStatus.option){
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
                    dispatch(showUsersPerPage({...pageStatus}));
                    break;
            }
            break;
        default:
            break;
    }
}