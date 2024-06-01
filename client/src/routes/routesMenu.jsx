import React from 'react';

import { Route, Routes } from 'react-router-dom';

import AuthenticatedLayout from "../components/Layouts/authLayout";

import { Users } from "../views/users";

export function RoutesMenu(){
    return(
        <AuthenticatedLayout>
            <Routes>
                <Route path = "/users" element={<Users />} />    
            </Routes>
        </AuthenticatedLayout>
    );
}