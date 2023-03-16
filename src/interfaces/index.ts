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