export interface Product {
    id: number,
    name: string,
    images: string,
    price: number,
    totalPrice: number,
    quantity: number,
}
export interface Input {
    id?: string,
    field: string,
    setField: Function,
    placeholder: string,
}