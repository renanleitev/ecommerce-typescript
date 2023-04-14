import React, {useState, useCallback, useMemo} from 'react';
import * as interfaces from '../../interfaces';
import capitalizeString from '../../services/capitalizeString';

const Input: React.FC<interfaces.Input> = (props: interfaces.Input) => {
    const [type, setType] = useState('text');
    useMemo(() => {
        switch(props.keyName){
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
    }, [props.keyName]);
    const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        props.setData({
            ...props.data,
            [props.keyName]: e.currentTarget.value,
        });
    }, [props.data, props.keyName, props.setData]);
    return (
        <>
            <label htmlFor={props.keyName}>{capitalizeString(props.keyName)}</label>
            <input
            id={props.keyName}
            type={type}
            defaultValue={props.keyValue}
            onChange={handleInput}
            placeholder={capitalizeString(props.keyName)}
            />
        </>
    );
}

export default Input;