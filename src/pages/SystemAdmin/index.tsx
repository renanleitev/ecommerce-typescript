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

export default function SystemAdmin(): JSX.Element{
    const dispatch = useDispatch<AppThunkDispatch>();
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const usersPerPage = useSelector((state: interfaces.IRootState) => state.login.usersPerPage) || { data: [], total_pages: 0, total_items: 0 };
    const isLoading = useSelector((state: interfaces.IRootState) => state.login.status);
    const pageStatus: interfaces.PageNumberStatus = {
        currentPage: 0,
        itemsPerPage: 3
    };
    useEffect(() => {
        localStorage.setItem('optionUser', '');
        localStorage.setItem('searchingUser', '');
    }, []);
    const option = useRef<HTMLSelectElement>();
    const search = useRef<HTMLInputElement>();
    const [data, setData] = useState([...usersPerPage.data.map((user: interfaces.User) => {
        return { ...user};
    })]);
    useMemo(() => {
        setData([...usersPerPage.data.map((user: interfaces.User) => {
            return { ...user};
        })]);
    }, [usersPerPage]);
    const handleButtonSearch = useCallback(() => {
        const newPageStatus: interfaces.PageNumberStatus = {
            ...pageStatus, 
            searching: search.current.value,
            option: option.current.value,
            type: 'user'
        }
        localStorage.setItem('optionUser', option.current.value);
        localStorage.setItem('searchingUser', search.current.value);
        switchOptionSearch({...newPageStatus}, dispatch);
        option.current.value = '';
        search.current.value = '';
    }, []); 
    const defaultOptions = ['Username', 'Name User', 'Surname', 'Address', 'Email', 'Role'];
    return ( 
        <>
        {user.role === "ROLE_ADMIN" ?
        <DivTable>
            {isLoading === 'loading' ? <Loading /> : <>
            <input
            ref={search}
            placeholder={'Search for users...'}
            className='search-bar'/>
            <Select inputRef={option} options={defaultOptions}/>
            <button onClick={handleButtonSearch}>Search</button>
            <Table>
                <TableHead/>
                <TableBody data={data} setData={setData}/>
            </Table>
            <Pagination data={usersPerPage} pageStatus={{...pageStatus}} type='user'/>
            </>}
        </DivTable> : <></>}
        </>
    )
}