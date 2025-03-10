import React, { useState } from 'react';
import { createUser, updateUser } from '../../services/api';
import { FaSave } from 'react-icons/fa';

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
        onSave(); // Chama a função de callback para atualizar a lista
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-futuristic-blue to-futuristic-purple flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-futuristic-purple mb-4">
                    {user ? 'Edit User' : 'Add User'}
                </h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Age"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-futuristic-teal text-white px-4 py-2 rounded-lg hover:bg-futuristic-blue flex items-center justify-center w-full"
                >
                    <FaSave className="mr-2" /> Save
                </button>
            </form>
        </div>
    );
};

export default UserForm;