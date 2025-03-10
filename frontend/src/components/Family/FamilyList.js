import React, { useEffect, useState } from 'react';
import { getFamilies, deleteFamily } from '../../services/api';
import { FaUsers, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FamilyList = () => {
    const [families, setFamilies] = useState([]);

    const fetchFamilies = async () => {
        const response = await getFamilies();
        setFamilies(response.data);
    };

    useEffect(() => {
        fetchFamilies();
    }, []);

    const handleDelete = async (id) => {
        await deleteFamily(id);
        fetchFamilies();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-futuristic-purple mb-4">Families</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {families.map(family => (
                    <div key={family.id} className="bg-white p-4 rounded-lg shadow-md animate-fade-in">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="bg-futuristic-teal p-3 rounded-full mr-4">
                                    <FaUsers className="text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">{family.lastName}</p>
                                    <p className="text-gray-600">{family.users.length} members</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(family.id)}
                                className="bg-futuristic-purple text-white px-4 py-2 rounded-lg hover:bg-futuristic-blue flex items-center"
                            >
                                <FaTrash className="mr-2" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Link
                to="/families/new" // Rota correta para adicionar família
                className="fixed bottom-8 right-8 bg-futuristic-pink text-white p-4 rounded-full shadow-lg hover:bg-futuristic-purple flex items-center"
            >
                <FaPlus className="mr-2" /> Add Family
            </Link>
        </div>
    );
};

export default FamilyList;