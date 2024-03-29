import React, {useState, useCallback, useMemo} from 'react';
import * as interfaces from '../../interfaces';
import {startCase} from 'lodash';
import { InputContainer } from './styled';

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
        <InputContainer>
            <label htmlFor={props.keyName}>{startCase(props.keyName)}</label>
            <input
            type={type}
            defaultValue={props.keyValue}
            onChange={handleInput}
            placeholder={startCase(props.keyName)}
            />
        </InputContainer>
    );
}

export default Input;