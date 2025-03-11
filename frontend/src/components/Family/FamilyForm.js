import React, { useState, useEffect } from 'react';
import { createFamily, updateFamily, getFamily } from '../../services/api';
import { FaSave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const FamilyForm = () => {
    const { id } = useParams(); // Obtém o ID da URL (se estiver editando)
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    // Carrega os dados da família se estiver em modo de edição
    useEffect(() => {
        if (id) {
            const fetchFamily = async () => {
                const response = await getFamily(id);
                const family = response.data;
                setLastName(family.lastName);
            };
            fetchFamily();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const familyData = { lastName };
        try {
            if (id) {
                await updateFamily(id, familyData); // Atualiza a família existente
            } else {
                await createFamily(familyData); // Cria uma nova família
            }
            // Exibe o pop-up de sucesso
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: id ? 'Family updated successfully!' : 'Family created successfully!',
                confirmButtonColor: '#6D28D9',
            }).then(() => {
                // Redireciona para a lista de famílias
                navigate('/families');
            });
        } catch (error) {
            // Exibe o pop-up de erro
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
                    {id ? 'Edit Family' : 'Add Family'}
                </h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Family Last Name"
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

export default FamilyForm;