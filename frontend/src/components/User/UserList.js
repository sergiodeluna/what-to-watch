import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../services/api';
import { FaUser, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-futuristic-purple mb-4">Users</h2>
            <ul className="space-y-4">
                {users.map(user => (
                    <li key={user.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center animate-fade-in">
                        <div className="flex items-center">
                            <div className="bg-futuristic-teal p-3 rounded-full mr-4">
                                <FaUser className="text-white" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold">{user.name}</p>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-futuristic-purple text-white px-4 py-2 rounded-lg hover:bg-futuristic-blue flex items-center"
                        >
                            <FaTrash className="mr-2" /> Delete
                        </button>
                    </li>
                ))}
            </ul>
            <Link
                to="/users/new" // Rota correta para adicionar usuário
                className="fixed bottom-8 right-8 bg-futuristic-pink text-white p-4 rounded-full shadow-lg hover:bg-futuristic-purple flex items-center"
            >
                <FaPlus className="mr-2" /> Add User
            </Link>
        </div>
    );
};

export default UserList;