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
import ShoppingTable from "../pages/ShoppingTable";
import SystemAdmin from "../pages/SystemAdmin";
import CreateProduct from "../pages/CreateProduct";

export default function Routes(){
    const isLoggedIn = useSelector((state: IRootState) => state.users.isLoggedIn) || false;
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/register' component={Register}/>
            {isLoggedIn ? 
            (<Route exact path='/auth/edit' component={Login}/>) : 
            (<Route exact path='/auth/login' component={Login}/>)}
            <Route exact path='/createProduct' component={CreateProduct}/>
            <Route exact path='/shoppingCart' component={Shopping}/>
            <Route exact path='/searching' component={SearchingTable}/>
            <Route exact path='/products/:id' component={Product}/>
            <Route exact path='/shoppingList' component={ShoppingTable}/>
            <Route exact path='/admin' component={SystemAdmin}/>
            <Route path='*' component={Page404}/>
        </Switch>
    );
}