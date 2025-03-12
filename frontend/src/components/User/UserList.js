import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, getUser } from '../../services/api';
import { FaUser, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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

    const handleViewDetails = async (id) => {
        try {
            const response = await getUser(id);
            const user = response.data;
            Swal.fire({
                title: 'User Details',
                html: `
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Age:</strong> ${user.age}</p>
                `,
                confirmButtonColor: '#6D28D9',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to fetch user details!',
                confirmButtonColor: '#6D28D9',
            });
        }
    };

    return (
        <div className="p-6 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
            <h2 className="text-2xl font-bold text-purple-600 mb-6">Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <div key={user.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center cursor-pointer" onClick={() => handleViewDetails(user.id)}>
                                <div className="bg-purple-100 p-3 rounded-full mr-4">
                                    <FaUser className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-purple-800">{user.name}</p>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link
                                    to={`/users/edit/${user.id}`}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center transition-colors"
                                >
                                    <FaEdit className="mr-2" /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center transition-colors"
                                >
                                    <FaTrash className="mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link
                to="/users/new"
                className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 flex items-center transition-colors"
            >
                <FaPlus className="mr-2" /> Add User
            </Link>
        </div>
    );
};

export default UserList;