import React, {useState, useEffect} from 'react';
import { LoadingContainer } from './styled';

export default function Loading(){
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    return (
        <>
        {loading ? (<LoadingContainer/>): (<></>)}
        </>
    )
}