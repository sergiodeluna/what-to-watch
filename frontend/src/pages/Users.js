import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from '../components/User/UserList';
import UserForm from '../components/User/UserForm';

const Users = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route
                path="/new"
                element={<UserForm onSave={() => setRefresh(!refresh)} />}
            />
            <Route
                path="/edit/:id"
                element={<UserForm onSave={() => setRefresh(!refresh)} />}
            />
        </Routes>
    );
};

export default Users;