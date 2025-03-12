import React, { useState, useEffect } from 'react';
import { getFamilies, deleteFamily, getFamily } from '../../services/api';
import { FaUsers, FaTrash, FaPlus, FaEdit, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AddUsersModal from './AddUsersModal';
import RemoveUsersModal from './RemoveUsersModal';

const FamilyList = () => {
    const [families, setFamilies] = useState([]);
    const [showAddUsersModal, setShowAddUsersModal] = useState(false);
    const [showRemoveUsersModal, setShowRemoveUsersModal] = useState(false);
    const [selectedFamilyId, setSelectedFamilyId] = useState(null);

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

    const handleViewDetails = async (id) => {
        try {
            const response = await getFamily(id);
            const family = response.data;
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
        <div className="p-6 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
            <h2 className="text-2xl font-bold text-purple-600 mb-6">Families</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {families.map(family => (
                    <div key={family.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center cursor-pointer" onClick={() => handleViewDetails(family.id)}>
                                <div className="bg-purple-100 p-3 rounded-full mr-4">
                                    <FaUsers className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-purple-800">{family.lastName}</p>
                                    <p className="text-gray-600">{family.users.length} members</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => {
                                        setSelectedFamilyId(family.id);
                                        setShowAddUsersModal(true);
                                    }}
                                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 flex items-center justify-center transition-colors"
                                    title="Add Users"
                                >
                                    <FaUserPlus className="text-lg" />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedFamilyId(family.id);
                                        setShowRemoveUsersModal(true);
                                    }}
                                    className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center transition-colors"
                                    title="Remove Users"
                                >
                                    <FaUserMinus className="text-lg" />
                                </button>
                                <Link
                                    to={`/families/edit/${family.id}`}
                                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 flex items-center justify-center transition-colors"
                                    title="Edit"
                                >
                                    <FaEdit className="text-lg" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(family.id)}
                                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 flex items-center justify-center transition-colors"
                                    title="Delete"
                                >
                                    <FaTrash className="text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link
                to="/families/new"
                className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 flex items-center justify-center transition-colors"
                title="Add Family"
            >
                <FaPlus className="text-lg" />
            </Link>
            {showAddUsersModal && (
                <AddUsersModal
                    familyId={selectedFamilyId}
                    onClose={() => setShowAddUsersModal(false)}
                    onSaveSuccess={fetchFamilies}
                />
            )}
            {showRemoveUsersModal && (
                <RemoveUsersModal
                    familyId={selectedFamilyId}
                    onClose={() => setShowRemoveUsersModal(false)}
                    onSaveSuccess={fetchFamilies}
                />
            )}
        </div>
    );
};

export default FamilyList;