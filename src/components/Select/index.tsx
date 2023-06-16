import React from "react";

interface Select {
    options: Array<string>;
    inputRef: React.MutableRefObject<HTMLSelectElement>;
}

const Select: React.FC<Select> = ({inputRef, options}) => {
    return(    
        <select ref={inputRef}>
            <option value='None' key='None'>-</option>
            {options.map((option) => 
                <option value={option} key={option}>{option}</option>
            )}
        </select>
    )
}

export default Select;