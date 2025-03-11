import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, getUser } from '../../services/api';
import { FaUser, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Função para carregar os usuários
    const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response.data);
    };

    // Carrega os usuários ao montar o componente
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
            // Exibe os detalhes do usuário em um pop-up
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
        <div className="p-6">
            <h2 className="text-2xl font-bold text-futuristic-purple mb-4">Users</h2>
            <ul className="space-y-4">
                {users.map(user => (
                    <li key={user.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center animate-fade-in">
                        <div className="flex items-center cursor-pointer" onClick={() => handleViewDetails(user.id)}>
                            <div className="bg-futuristic-teal p-3 rounded-full mr-4">
                                <FaUser className="text-white" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold">{user.name}</p>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to={`/users/edit/${user.id}`}
                                className="bg-futuristic-blue text-white px-4 py-2 rounded-lg hover:bg-futuristic-purple flex items-center"
                            >
                                <FaEdit className="mr-2" /> Edit
                            </Link>
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
            <Link
                to="/users/new"
                className="fixed bottom-8 right-8 bg-futuristic-pink text-white p-4 rounded-full shadow-lg hover:bg-futuristic-purple flex items-center"
            >
                <FaPlus className="mr-2" /> Add User
            </Link>
        </div>
    );
};

export default UserList;