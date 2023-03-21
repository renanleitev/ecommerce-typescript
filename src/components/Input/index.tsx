import React, {useState, useCallback, useMemo} from 'react';
import * as interfaces from '../../interfaces';

const Input: React.FC<interfaces.Input> = (props: interfaces.Input) => {
    const keyName = props.keyName;
    const keyValue = props.keyValue;
    const data = props.data;
    const setData = props.setData;
    const [type, setType] = useState('text');
    useMemo(() => {
        switch(keyName){
            case 'password':
                setType('password');
                break;
            case 'email':
                setType('email');
                break;
            default:
                setType('text');
                break;
        }
    }, [keyName]);
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
            type={type}
            defaultValue={keyValue}
            onChange={handleInput}
            placeholder={keyName.charAt(0).toUpperCase() + keyName.slice(1)}
            />
        </>
    );
}

export default Input;