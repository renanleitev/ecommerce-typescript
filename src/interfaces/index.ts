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
export interface Stock {
    data: Array<object>,
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
    setData: Function,
    keyName: string,
    keyValue: string,
}
export interface ResponseGenerator{
    config?:any,
    data?:any,
    headers?:any,
    request?:any,
    status?:number,
    statusText?:string
}
interface BaseInitialState {
    status: string,
    error: string,
}
export interface InitialStateProducts extends BaseInitialState {
    stock: {
        data: Array<object>,
    },
    product: Product,
    cart: Array<object>,
}
export interface InitialStateLogin extends BaseInitialState {
    isLoggedIn: boolean,
    user: User,
}
export interface IRootState {
    login: InitialStateLogin,
    products: InitialStateProducts,
};