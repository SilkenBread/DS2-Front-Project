import React from 'react';

import { Route, Routes } from 'react-router-dom';

import AuthenticatedLayout from "../components/Layouts/authLayout";

import { Users } from "../views/users";
import { Inventory } from "../views/inventory";

export function RoutesMenu(){
    return(
        <AuthenticatedLayout>
            <Routes>
                <Route path = "/users" element={<Users />} /> 
                <Route path = "/inventory" element={<Inventory />} />   
            </Routes>
        </AuthenticatedLayout>
    );
}