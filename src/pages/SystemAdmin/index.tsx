import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import * as interfaces from '../../interfaces';
import Pagination from '../../components/Pagination';
import { DivTable, Table } from '../SearchingTable/styled';
import Select from '../../components/Select';
import { changeUsersPageStatus, showUsersPerPage } from '../../store/modules/login/reducer';
import TableHead from './TableHead';
import TableBody from './TableBody';
import switchOptionSearch from '../../services/switchOptionSearch';
import Loading from '../../components/Loading';

export default function SystemAdmin(): JSX.Element{
    const dispatch = useDispatch<AppThunkDispatch>();
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const usersPerPage = useSelector((state: interfaces.IRootState) => state.login.usersPerPage) || { data: [], total_pages: 0, total_items: 0 };
    const isLoading = useSelector((state: interfaces.IRootState) => state.login.status);
    const searchingRef = useRef<HTMLInputElement>();
    const optionRef = useRef<HTMLSelectElement>();
    const [pageStatus, setPageStatus] = useState<interfaces.PageNumberStatus>({
        currentPage: 0,
        itemsPerPage: 3,
        searching: '',
        option: 'Initial Page SystemAdmin',
        type: 'user'
    });
    useEffect(() => {
        dispatch(changeUsersPageStatus(pageStatus));
        dispatch(showUsersPerPage(pageStatus));
    }, []);
    const [userData, setUserData] = useState([...usersPerPage.data.map((user: interfaces.User) => {
        return { ...user };
    })]);
    const handleButtonSearch = useCallback(() => {
        const newPageStatus = {
            ...pageStatus, 
            searching: searchingRef.current.value, 
            option: optionRef.current.value
        };
        setPageStatus({...newPageStatus});
        dispatch(changeUsersPageStatus(newPageStatus));
        switchOptionSearch('user', dispatch);
    }, []);
    const defaultOptions = ['Username', 'Name User', 'Surname', 'Address', 'Email', 'Role'];
    return ( 
        <>
        {user.role === "ROLE_ADMIN" ?
        <DivTable>
            {isLoading === 'loading' ? <Loading /> : <>
            <input
            ref={searchingRef}
            placeholder={'Search for users...'}
            className='search-bar'/>
            <Select inputRef={optionRef} options={defaultOptions}/>
            <button onClick={handleButtonSearch}>Search</button>
            <Table>
                <TableHead data={userData} setData={setUserData}/>
                <TableBody data={userData} setData={setUserData}/>
            </Table>
            <Pagination data={usersPerPage} type={'user'}/>
            </>}
        </DivTable> : <></>}
        </>
    )
}