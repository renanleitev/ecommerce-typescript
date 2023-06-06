import React from "react";
import {IconType} from 'react-icons';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { ContainerButton } from "./styled";

interface FaButtonProps{
    icon: IconType;
    onClickFunction: CallableFunction;
}

const FontAwesomeButton: React.FC<FaButtonProps> = ({icon, onClickFunction}) => {
    return (
        <ContainerButton onClick={() => onClickFunction()}>
            <FontAwesomeIcon Icon={icon}/>
        </ContainerButton>
    );
} 

export default FontAwesomeButton;
