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
export interface Item {
    item: Product,
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
export interface TableProducts {
    stock: Array<Product>,
}
interface BaseInitialState {
    status: string,
    error: string,
}
export interface InitialStateProducts extends BaseInitialState {
    stock: {
        data: Array<Product>,
    },
    product: Product,
    cart: Array<Product>,
}
export interface InitialStateLogin extends BaseInitialState {
    isLoggedIn: boolean,
    user: User,
}
export interface IRootState {
    login: InitialStateLogin,
    products: InitialStateProducts,
}
export interface ProductPagination {
    data: Array<Product>,
    currentPage: number,
    productsPerPage: number,
    setIndexOfFirstProduct: CallableFunction,
    setIndexOfLastProduct: CallableFunction
}