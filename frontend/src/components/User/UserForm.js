import React, { useState, useEffect } from 'react';
import { createUser, updateUser, getUser } from '../../services/api';
import { FaSave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                const response = await getUser(id);
                const user = response.data;
                setName(user.name);
                setEmail(user.email);
                setAge(user.age);
            };
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, age };
        try {
            if (id) {
                await updateUser(id, userData);
            } else {
                await createUser(userData);
            }
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: id ? 'User updated successfully!' : 'User created successfully!',
                confirmButtonColor: '#6D28D9',
            }).then(() => {
                navigate('/users');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonColor: '#6D28D9',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-purple-600 mb-6">
                    {id ? 'Edit User' : 'Add User'}
                </h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Age"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center w-full transition-colors"
                >
                    <FaSave className="mr-2" /> Save
                </button>
            </form>
        </div>
    );
};

export default UserForm;