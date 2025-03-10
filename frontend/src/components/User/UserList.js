import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../services/api';
import { FaUser, FaTrash, FaTrophy } from 'react-icons/fa';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers();
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-futuristic-purple mb-4">Users</h2>
            <ul className="space-y-4">
                {users.map(user => (
                    <li key={user.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center animate-slide-in">
                        <div className="flex items-center">
                            <div className="bg-futuristic-teal p-3 rounded-full mr-4">
                                <FaUser className="text-white" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold">{user.name}</p>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-futuristic-pink p-2 rounded-full mr-4">
                                <FaTrophy className="text-white" /> {user.age}
                            </div>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="bg-futuristic-purple text-white px-4 py-2 rounded-lg hover:bg-futuristic-blue flex items-center"
                            >
                                <FaTrash className="mr-2" /> Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;