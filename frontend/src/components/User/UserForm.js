import React, { useState, useEffect } from 'react';
import { createUser, updateUser, getUser } from '../../services/api';
import { FaSave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
    const { id } = useParams(); // Obtém o ID da URL (se estiver editando)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    // Carrega os dados do usuário se estiver em modo de edição
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
        <div className="min-h-screen bg-gradient-to-b from-futuristic-blue to-futuristic-purple flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-futuristic-purple mb-4">
                    {id ? 'Edit User' : 'Add User'}
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