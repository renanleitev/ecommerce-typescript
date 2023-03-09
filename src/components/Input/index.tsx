import React from 'react';
import * as interfaces from '../../interfaces';

export default function Input(props: interfaces.Input){
    const id = props.placeholder;
    const field = props.field;
    const setField = props.setField;
    const placeholder = props.placeholder;
    let type: string;
    switch(placeholder){
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
        <input
        id={id}
        type={type}
        value={field}
        onChange={e => setField(e.target.value)}
        placeholder={placeholder.charAt(0).toUpperCase() + placeholder.slice(1)}
        />
    );
}