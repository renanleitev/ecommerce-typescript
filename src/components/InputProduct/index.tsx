import React, {useCallback} from 'react';
import * as interfaces from '../../interfaces';

const InputProduct: React.FC<interfaces.InputProduct> = (props: interfaces.InputProduct) => {
    const keyName = props.keyName;
    const data = props.data;
    const setData = props.setData;
    const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        switch(keyName){
            case 'screenResolution':
                setData({
                    ...data,
                    display: {
                        ...data.display,
                        [keyName]: e.currentTarget.value,
                    }
                });
                break;
            case 'screenSize':
                setData({
                    ...data,
                display: {
                    ...data.display,
                    [keyName]: e.currentTarget.value,
                }
                });
                break;
            case 'hdd':
                setData({
                    ...data,
                    storage: {
                        ...data.storage,
                        [keyName]: e.currentTarget.value,
                    }
                });
                break;
            case 'ram':
                setData({
                    ...data,
                    storage: {
                        ...data.storage,
                        [keyName]: e.currentTarget.value,
                    }
                });
                break;
            case 'cpu':
                setData({
                    ...data,
                    hardware: {
                        ...data.hardware,
                        [keyName]: e.currentTarget.value,
                    }
                });
                break;
            case 'wifi':
                setData({
                    ...data,
                    connectivity: {
                        ...data.connectivity,
                        [keyName]: e.currentTarget.value,
                    }
                });
                break;
            default:
                setData({
                    ...data,
                    [keyName]: e.currentTarget.value,
                });
                break;
            }
    }, [data, keyName, setData]);
    return (
        <>
            <label htmlFor={keyName}>{keyName.charAt(0).toUpperCase() + keyName.slice(1)}</label>
            <input
            id={keyName}
            type='text'
            defaultValue={props.keyValue}
            onChange={handleInput}
            placeholder={keyName.charAt(0).toUpperCase() + keyName.slice(1)}
            />
        </>
    );
}

export default InputProduct;