interface Base{
    id: string,
}
export interface Product extends Base {
    name: string,
    images: string,
    price: string,
    quantity: number,
    totalPrice: number,
    os: string,
    display: {
        screenResolution: string,
        screenSize: string,
    },
    storage: {
        hdd: string,
        ram: string,
    },
    hardware: {
        cpu: string,
    },
    connectivity: {
        wifi: string,
    },
    description: string,
}
export interface Stock {
    data: Array<object>,
}
export interface User extends Base {
    name: string,
    surname: string,
    address: string,
    email: string,
    password: string,
}
export interface Input {
    field: string,
    setField: Function,
    placeholder: string,
}
export interface ResponseGenerator{
    config?:any,
    data?:any,
    headers?:any,
    request?:any,
    status?:number,
    statusText?:string
}