import React from 'react'; 

type SelectProps = { 
    options: Array<string>; 
    defaultValue?: string; 
    inputRef?: React.MutableRefObject<HTMLSelectElement>; 
}; 

const Select: React.FC<SelectProps> = ({ options, defaultValue, inputRef, }) => 
{ return ( 
        <select defaultValue={defaultValue} ref={inputRef} > 
            <option key='None' value='-'>-</option>
            {options.map((option) => ( 
                <option key={option} value={option}> 
                    {option} 
                </option> ))} 
        </select> 
)}; 

export default Select;