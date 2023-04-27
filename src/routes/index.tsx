import React from "react";
import { Switch, Route } from 'react-router-dom';
import Register from "../pages/Register";
import Login from '../pages/Login';
import Home from '../pages/Home';
import Shopping from "../pages/Shopping";
import Product from "../pages/Product";
import Page404 from '../pages/Page404';
import SearchingTable from "../pages/SearchingTable";
import { useSelector } from 'react-redux';
import { IRootState } from "../interfaces";

export default function Routes(){
    const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/register' component={Register}/>
            {isLoggedIn ? 
            (<Route exact path='/edit' component={Login}/>) : 
            (<Route exact path='/login' component={Login}/>)}
            <Route exact path='/shopping' component={Shopping}/>
            <Route exact path='/searching' component={SearchingTable}/>
            <Route exact path='/product/:id' component={Product}/>
            <Route path='*' component={Page404}/>
        </Switch>
    );
}