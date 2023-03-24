import {addItem} from '../modules/products/reducer';

describe('Products Reducer', () => {
    it('should be function', () => {
        expect(addItem).toBeDefined();
    });
});