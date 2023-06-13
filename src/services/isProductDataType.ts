import * as interfaces from '../interfaces';

export default function isProductDataType(object: interfaces.ProductData | interfaces.UserData): 
object is interfaces.ProductData {
    return true;
}