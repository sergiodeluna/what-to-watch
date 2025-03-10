import React, { useState } from 'react';
import UserList from '../components/User/UserList';
import UserForm from '../components/User/UserForm';

const Users = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h1>Users</h1>
            <UserForm onSave={() => setRefresh(!refresh)} />
            <UserList />
        </div>
    );
};

export default Users;