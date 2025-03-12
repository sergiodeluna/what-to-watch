import React, { useState, useEffect } from 'react';
import { getUsers, addUsersToFamily } from '../../services/api';
import Swal from 'sweetalert2';

const AddUsersModal = ({ familyId, onClose, onSaveSuccess }) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [page, setPage] = useState(1);

    // Busca os usuários
    const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response.data);
    };

    // Busca os usuários ao carregar o modal
    useEffect(() => {
        fetchUsers();
    }, [page]);

    // Função para selecionar/deselecionar um usuário
    const handleSelectUser = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    // Função para salvar as alterações
    const handleSave = async () => {
        try {
            await addUsersToFamily(familyId, selectedUsers);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Users added to the family successfully.',
                confirmButtonColor: '#6D28D9',
            });
            onClose(); // Fecha o modal
            onSaveSuccess(); // Recarrega a lista de famílias
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to add users to the family!',
                confirmButtonColor: '#6D28D9',
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Add Users to Family</h2>
                <div className="max-h-64 overflow-y-auto">
                    {users.map(user => (
                        <div key={user.id} className="flex justify-between items-center p-2 border-b">
                            <span>{user.name} ({user.email})</span>
                            <button
                                onClick={() => handleSelectUser(user.id)}
                                className={`p-2 rounded-full ${selectedUsers.includes(user.id) ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
                            >
                                +
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleSave}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUsersModal;