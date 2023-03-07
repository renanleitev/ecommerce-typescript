interface Base{
    id: number,
}
export interface Product extends Base {
    name: string,
    images: string,
    price: number,
    totalPrice: number,
    quantity: number,
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