import internal from "stream"

interface Base {
    id: string,
    name: string,
}
export interface Product extends Base {
    image: string,
    price: string,
    quantity: number,
    totalPrice: number,
    os: string,
    description: string,
    additionalFeatures: string,
}
export interface StockData {
    data: Array<Product>,
    total_pages: number,
    total_items: number
}
export interface UserData {
    data: Array<User>
}
export interface EditProduct {
    product: Product,
}
export interface User extends Base {
    username: string,
    surname: string,
    address: string,
    email: string,
    password: string,
    role: string,
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
    stockPerPage: StockData,
    pageStatus: PageNumberStatus
    product: Product,
    cart: Array<Product>,
    shoppingList: Array<ShoppingList>
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
export interface ShoppingCart {
    quantity: number,
    totalPrice: number,
    userId: number,
    productId: number,
}
export interface ShoppingList{
    userName: string,
    productName: string,
    quantity: number,
    totalPrice: number,
    dateCreated: string
}