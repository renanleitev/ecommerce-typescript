interface Base{
    id: string,
    name: string,
}
export interface Product extends Base {
    images: string,
    price: string,
    quantity: number,
    totalPrice: number,
    os: string,
    description: string,
    additionalFeatures: string,
}
export interface StockData {
    data: Array<Product>,
}
export interface UserData {
    data: Array<User> 
}
export interface EditProduct {
    product: Product,
}
export interface User extends Base {
    surname: string,
    address: string,
    email: string,
    password: string,
}
export interface Input {
    data: Product | User,
    setData: CallableFunction,
    keyName: string,
    keyValue: string,
}
interface BaseInitialState {
    status: string,
    error: string,
}
export interface InitialStateProduct extends BaseInitialState {
    stock: {
        data: Array<Product>,
    },
    stockPerPage: {
        data: Array<Product>,
    },
    pageStatus: PageNumberStatus
    product: Product,
    cart: Array<Product>,
}
export interface InitialStateLogin extends BaseInitialState {
    isLoggedIn: boolean,
    user: User,
}
export interface IRootState {
    login: InitialStateLogin,
    products: InitialStateProduct,
}
export interface PageNumberStatus {
    currentPage: number,
    productsPerPage: number
}
export interface Pagination {
    pageStatus: PageNumberStatus,
    setPageStatus: CallableFunction
}
export interface TableHead {
    stock: Array<Product>,
    setStock: CallableFunction
}
export interface TableBody extends TableHead {
    originalStock: Array<Product>,
    setOriginalStock: CallableFunction
}