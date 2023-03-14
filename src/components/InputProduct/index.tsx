import React, {useEffect, useState, useCallback} from 'react';
import * as interfaces from '../../interfaces';

const InputProduct: React.FC<interfaces.InputProduct> = (props: interfaces.InputProduct) => {
    const [keyValue, setKeyValue] = useState(props.keyValue);
    const keyName = props.keyName;
    const data = props.data;
    const setData = props.setData;
    const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setKeyValue(e.currentTarget.value);
    }, []);
    useEffect(() => {
        switch(keyName){
            case 'screenResolution':
                setData({
                    ...data,
                    display: {
                        ...data.display,
                        [keyName]: keyValue,
                    }
                });
                break;
            case 'screenSize':
                setData({
                    ...data,
                display: {
                    ...data.display,
                    [keyName]: keyValue,
                }
                });
                break;
            case 'hdd':
                setData({
                    ...data,
                    storage: {
                        ...data.storage,
                        [keyName]: keyValue,
                    }
                });
                break;
            case 'ram':
                setData({
                    ...data,
                    storage: {
                        ...data.storage,
                        [keyName]: keyValue,
                    }
                });
                break;
            case 'cpu':
                setData({
                    ...data,
                    hardware: {
                        ...data.hardware,
                        [keyName]: keyValue,
                    }
                });
                break;
            case 'wifi':
                setData({
                    ...data,
                    connectivity: {
                        ...data.connectivity,
                        [keyName]: keyValue,
                    }
                });
                break;
            default:
                setData({
                    ...data,
                    [keyName]: keyValue,
                });
                break;
            }
    }, [data, keyName, keyValue, setData]);
    return (
        <>
            <label htmlFor={keyName}>{keyName.charAt(0).toUpperCase() + keyName.slice(1)}</label>
            <input
            id={keyName}
            type='text'
            defaultValue={keyValue}
            onChange={handleInput}
            placeholder={keyName.charAt(0).toUpperCase() + keyName.slice(1)}
            />
        </>
    );
}

export default InputProduct;