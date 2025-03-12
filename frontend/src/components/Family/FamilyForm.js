import React, { useState, useEffect } from 'react';
import { createFamily, updateFamily, getFamily } from '../../services/api';
import { FaSave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const FamilyForm = () => {
    const { id } = useParams();
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

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
                await updateFamily(id, familyData);
            } else {
                await createFamily(familyData);
            }
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: id ? 'Family updated successfully!' : 'Family created successfully!',
                confirmButtonColor: '#6D28D9',
            }).then(() => {
                navigate('/families');
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
                    {id ? 'Edit Family' : 'Add Family'}
                </h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Family Last Name"
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

export default FamilyForm;