import React, {useCallback} from "react";

interface Select {
    onChangeFunction: CallableFunction;
    options: Array<string>
}

const Select: React.FC<Select> = ({onChangeFunction, options}) => {
    const handleChange = useCallback((e: React.FormEvent<HTMLSelectElement>) => {
        onChangeFunction(e);
    }, []);
    return(    
        <select onChange={(e) => handleChange(e)}>
            <option value='None' key='None'>-</option>
            {options.map((option) => 
                <option value={option} key={option}>{option}</option>
            )}
        </select>
    )
}

export default Select;