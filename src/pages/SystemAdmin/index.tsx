import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showUsersPerPage, changeUserPageStatus } from '../../store/modules/login/reducer';
import { AppThunkDispatch } from '../../store';
import * as interfaces from '../../interfaces';
import Pagination from '../../components/Pagination';
import { DivTable, Table } from '../SearchingTable/styled';
import Select from '../../components/Select';
import { debounce } from 'lodash';
import switchOptionSearch from '../../services/switchOptionSearch';
import TableBody from './TableBody';
import TableHead from './TableHead';

export default function SystemAdmin(): JSX.Element{
    const dispatch = useDispatch<AppThunkDispatch>();
    const user = useSelector((state: interfaces.IRootState) => state.login.user);
    const usersPerPage = useSelector((state: interfaces.IRootState) => state.login.usersPerPage) || { data: [], total_pages: 0, total_items: 0 };
    const pageStatus = useSelector((state: interfaces.IRootState) => state.login.pageStatus);
    const [data, setData] = useState([...usersPerPage.data.map((user: interfaces.User) => {
        return { ...user};
    })]);
    useMemo(() => {
        setData([...usersPerPage.data.map((user: interfaces.User) => {
            return { ...user};
        })]);
    }, [usersPerPage]);
    useEffect(() => {
        dispatch(showUsersPerPage(pageStatus));
    }, []);
    let option = '';
    let search = '';
    const handleDefaultOptions = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
        option = event.currentTarget.value;
    }, []);
    const handleInputSearch = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        // 1000 = 1 second
        const delayTime = 1000;
        const searching = debounce((value) => {
            search = value;
        }, delayTime);
        searching(e.currentTarget.value.toString().toLowerCase());        
    }, []);
    const handleButtonSearch = useCallback(() => {
        const newPageStatus: interfaces.PageNumberStatus = {
            ...pageStatus, 
            searching: search,
            option: option,
            type: 'user'
        }
        dispatch(changeUserPageStatus({...newPageStatus}));
        switchOptionSearch({...newPageStatus}, dispatch);
    }, []); 
    const defaultOptions = ['Username', 'Name User', 'Surname', 'Address', 'Email', 'Role'];
    return ( 
        <>
        {user.role === "ROLE_ADMIN" ?
        <DivTable>
            <input
            onChange={handleInputSearch}
            placeholder={'Search for users...'}
            className='search-bar'/>
            <Select onChangeFunction={handleDefaultOptions} options={defaultOptions}/>
            <button onClick={handleButtonSearch}>Search</button>
            <Table>
                <TableHead data={data} setData={setData}/>
                <TableBody data={data} setData={setData}/>
            </Table>
            <Pagination data={usersPerPage} type='user'/>
        </DivTable> : <></>}
        </>
    )
}