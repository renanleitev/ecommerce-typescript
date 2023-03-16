import React, {useCallback} from 'react';
import * as interfaces from '../../interfaces';

const InputProduct: React.FC<interfaces.InputProduct> = (props: interfaces.InputProduct) => {
    const keyName = props.keyName;
    const data = props.data;
    const setData = props.setData;
    const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [keyName]: e.currentTarget.value,
        });
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