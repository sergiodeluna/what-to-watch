import React, { useState } from 'react';
import { createUser, updateUser } from '../../services/api';

const UserForm = ({ user, onSave }) => {
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [age, setAge] = useState(user ? user.age : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, age };
        if (user) {
            await updateUser(user.id, userData);
        } else {
            await createUser(userData);
        }
        onSave();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
            <button type="submit">Save</button>
        </form>
    );
};

export default UserForm;