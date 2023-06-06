import React from 'react';
import {IconType} from 'react-icons';

interface FaIconProps {
    Icon: IconType;
}
  
export const FontAwesomeIcon = ({ Icon }: FaIconProps): JSX.Element => {
    return (
        <>
            <Icon/>
        </>
    );
};
