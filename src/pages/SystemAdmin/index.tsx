import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../store/modules/login/reducer';
import { AppThunkDispatch } from '../../store';
import * as interfaces from '../../interfaces';

// TODO: Construir uma página de Administrador
export default function SystemAdmin(): JSX.Element{
    const dispatch = useDispatch<AppThunkDispatch>();
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    useEffect(() => {
        dispatch(getAllUsers());
        console.log(user);
    }, []);
    return (
        <></>
    )
}