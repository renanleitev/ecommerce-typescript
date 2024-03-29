import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import * as interfaces from '../../interfaces';
import Pagination from '../../components/Pagination';
import { DivTable, Table } from '../SearchingTable/styled';
import Select from '../../components/Select';
import switchOptionSearch from '../../services/switchOptionSearch';
import TableBody from './TableBody';
import TableHead from './TableHead';
import Loading from '../../components/Loading';
import { initialUser, showUsersPerPage } from '../../store/modules/users/reducer';

export default function SystemAdmin(): JSX.Element{
    const dispatch = useDispatch<AppThunkDispatch>();
    const user = useSelector((state: interfaces.IRootState) => state.users.user) || initialUser;
    const usersPerPage = useSelector((state: interfaces.IRootState) => state.users.usersPerPage) || { data: [], total_pages: 0, total_items: 0 };
    const isLoading = useSelector((state: interfaces.IRootState) => state.users.status) || 'idle';
    const pageStatus: interfaces.PageNumberStatus = {
        currentPage: 0,
        itemsPerPage: 3,
        type: 'user'
    };
    useEffect(() => {
        dispatch(showUsersPerPage({...pageStatus}));
    }, []);
    useEffect(() => {
        localStorage.setItem('optionUser', '');
        localStorage.setItem('searchingUser', '');
    }, []);
    const option = useRef<HTMLSelectElement>();
    const searching = useRef<HTMLInputElement>();
    const [data, setData] = useState([...usersPerPage.data.map((user: interfaces.User) => {
        return { ...user};
    })]);
    useMemo(() => {
        setData([...usersPerPage.data.map((user: interfaces.User) => {
            return { ...user};
        })]);
    }, [usersPerPage]);
    const handleButtonSearch = useCallback(() => {
        localStorage.setItem('optionUser', option.current.value);
        localStorage.setItem('searchingUser', searching.current.value);
        switchOptionSearch({...pageStatus,
            searching: searching.current.value,
            option: option.current.value,
        }, dispatch);
    }, []); 
    const handleResetSearch = useCallback(() => {
        localStorage.setItem('optionUser', '');
        localStorage.setItem('searchingUser', '');
        dispatch(showUsersPerPage({...pageStatus}));
    }, []);
    const defaultOptions = ['Username', 'Name User', 'Surname', 'Address', 'Email', 'Role'];
    return ( 
        <>
        {user.role === "ROLE_ADMIN" ?
        <DivTable>
            {isLoading === 'loading' ? <Loading /> : <>
            <input
            ref={searching}
            placeholder={'Search for users...'}
            className='searching-bar'/>
            <Select inputRef={option} options={defaultOptions}/>
            <button onClick={handleButtonSearch}>Search</button>
            <button onClick={handleResetSearch} className='reset'>Reset</button>
            <Table>
                <TableHead pageStatus={{...pageStatus}}/>
                <TableBody data={data} setData={setData}/>
            </Table>
            <Pagination data={usersPerPage} pageStatus={{...pageStatus}}/>
            </>}
        </DivTable> : <></>}
        </>
    )
}