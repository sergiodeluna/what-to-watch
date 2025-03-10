import React, { useState } from 'react';
import { createFamily, updateFamily } from '../../services/api';
import { FaSave } from 'react-icons/fa';

const FamilyForm = ({ family, onSave }) => {
    const [lastName, setLastName] = useState(family ? family.lastName : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const familyData = { lastName };
        if (family) {
            await updateFamily(family.id, familyData);
        } else {
            await createFamily(familyData);
        }
        onSave(); // Chama a função de callback para atualizar a lista
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-futuristic-blue to-futuristic-purple flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-futuristic-purple mb-4">
                    {family ? 'Edit Family' : 'Add Family'}
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