import { searchProductByName,
    searchProductByAdditionalFeatures,
    searchProductByDescription,
    searchProductByOs, 
    searchProductByPrice,
    showProductsPerPage,
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
import { useSelector } from 'react-redux';

export default function switchOptionSearch(
    type: string,
    dispatch: CallableFunction,
): void {
    const productsPageStatus = useSelector((state: interfaces.IRootState) => state.products.pageStatus);
    const usersPageStatus = useSelector((state: interfaces.IRootState) => state.login.pageStatus);
    switch(type){
        case 'user':
            switch(usersPageStatus.option){
                // searchUserBy
                case 'Username':
                    dispatch(searchUserByUsername({...usersPageStatus}));
                    break;
                case 'Name User':
                    dispatch(searchUserByName({...usersPageStatus}));
                    break;
                case 'Surname':
                    dispatch(searchUserBySurname({...usersPageStatus}));
                    break;
                case 'Address':
                    dispatch(searchUserByAddress({...usersPageStatus}));
                    break;
                case 'Email':
                    dispatch(searchUserByEmail({...usersPageStatus}));
                    break;
                case 'Role':
                    dispatch(searchUserByRole({...usersPageStatus}));
                    break;
                default:
                    break;
            }
            break;
        case 'product':
            switch(productsPageStatus.option){
                // Initial Page Home
                case 'Initial Page Home':
                    dispatch(showProductsPerPage({...productsPageStatus}));
                    break;
                // Initial Page SystemAdmin
                case 'Initial Page SystemAdmin':
                    dispatch(showUsersPerPage({...productsPageStatus}));
                    break;
                // searchProductBy
                case 'Name Product':
                    dispatch(searchProductByName({...productsPageStatus}));
                    break;
                case 'Description':
                    dispatch(searchProductByDescription({...productsPageStatus}));
                    break;
                case 'Additional Features':
                    dispatch(searchProductByAdditionalFeatures({...productsPageStatus}));
                    break;
                case 'Operational System':
                    dispatch(searchProductByOs({...productsPageStatus}));
                    break;
                case 'Price':
                    dispatch(searchProductByPrice({...productsPageStatus}));
                    break;
                case '':
                    dispatch(showProductsPerPage({...productsPageStatus}));
                    break;
            }
            break;
        default:
            break;
    }
}
