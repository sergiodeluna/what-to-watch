import React, { useEffect, useState } from 'react';
import { getFamilies, deleteFamily, getFamily } from '../../services/api';
import { FaUsers, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const FamilyList = () => {
    const [families, setFamilies] = useState([]);

    // Função para carregar as famílias
    const fetchFamilies = async () => {
        const response = await getFamilies();
        setFamilies(response.data);
    };

    // Carrega as famílias ao montar o componente
    useEffect(() => {
        fetchFamilies();
    }, []);

    const handleDelete = async (id) => {
        await deleteFamily(id);
        fetchFamilies();
    };

    const handleViewDetails = async (id) => {
        try {
            const response = await getFamily(id);
            const family = response.data;
            // Exibe os detalhes da família e a lista de usuários em um pop-up
            Swal.fire({
                title: `Family: ${family.lastName}`,
                html: `
                    <p><strong>Last Name:</strong> ${family.lastName}</p>
                    <p><strong>Members:</strong></p>
                    <ul>
                        ${family.users.map(user => `
                            <li>
                                <strong>Name:</strong> ${user.name}, 
                                <strong>Email:</strong> ${user.email}, 
                                <strong>Age:</strong> ${user.age}
                            </li>
                        `).join('')}
                    </ul>
                `,
                confirmButtonColor: '#6D28D9',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to fetch family details!',
                confirmButtonColor: '#6D28D9',
            });
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-futuristic-purple mb-4">Families</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {families.map(family => (
                    <div key={family.id} className="bg-white p-4 rounded-lg shadow-md animate-fade-in">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center cursor-pointer" onClick={() => handleViewDetails(family.id)}>
                                <div className="bg-futuristic-teal p-3 rounded-full mr-4">
                                    <FaUsers className="text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">{family.lastName}</p>
                                    <p className="text-gray-600">{family.users.length} members</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link
                                    to={`/families/edit/${family.id}`}
                                    className="bg-futuristic-blue text-white px-4 py-2 rounded-lg hover:bg-futuristic-purple flex items-center"
                                >
                                    <FaEdit className="mr-2" /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(family.id)}
                                    className="bg-futuristic-purple text-white px-4 py-2 rounded-lg hover:bg-futuristic-blue flex items-center"
                                >
                                    <FaTrash className="mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link
                to="/families/new"
                className="fixed bottom-8 right-8 bg-futuristic-pink text-white p-4 rounded-full shadow-lg hover:bg-futuristic-purple flex items-center"
            >
                <FaPlus className="mr-2" /> Add Family
            </Link>
        </div>
    );
};

export default FamilyList;