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
interface BaseData {
    total_pages: number,
    total_items: number
}
export interface ProductData extends BaseData {
    data: Array<Product>
}
export interface EditProduct {
    product: Product,
}
export interface EditUser {
    user: User,
}
export interface User extends Base {
    username: string,
    surname: string,
    address: string,
    email: string,
    password: string,
    role: string,
}
export interface UserData extends BaseData {
    data: Array<User>
}
export interface Input {
    data: Product | User,
    setData: CallableFunction,
    keyName: string,
    keyValue: string,
}
export interface PageNumberStatus {
    currentPage: number,
    itemsPerPage: number
}
interface BaseInitialState {
    status: string,
    error: string,
}
export interface InitialStateProduct extends BaseInitialState {
    product: Product,
    productsPerPage: ProductData,
    pageStatus: PageNumberStatus,
    shoppingCart: Array<Product>,
    shoppingList: Array<ShoppingList>
}
export interface InitialStateLogin extends BaseInitialState {
    isLoggedIn: boolean,
    user: User,
    usersPerPage: UserData,
    pageStatus: PageNumberStatus
}
export interface IRootState {
    login: InitialStateLogin,
    products: InitialStateProduct,
}

export interface Pagination {
    pageStatus: PageNumberStatus,
    setPageStatus: CallableFunction,
    data: ProductData | UserData
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