import React from 'react';
import * as interfaces from '../../interfaces';

const InputUser: React.FC<interfaces.InputUser> = (props: interfaces.InputUser) => {
    const id = props.placeholder;
    const field = props.data;
    const setField = props.setData;
    const placeholder = props.placeholder;
    let type: string;
    switch(placeholder){
        case 'repeat password':
            type = 'password';
            break;
        case 'password':
            type = 'password';
            break;
        case 'email':
            type = 'email';
            break;
        default:
            type = 'text';
            break;
    }
    return (
        <>
            <label htmlFor={placeholder}>{placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}</label>
            <input
            id={id}
            type={type}
            value={field}
            onChange={e => setField(e.target.value)}
            placeholder={placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}
            />
        </>
    )
}

export default InputUser;
