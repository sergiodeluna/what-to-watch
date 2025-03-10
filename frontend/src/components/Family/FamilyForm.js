import React, { useState } from 'react';
import { createFamily, updateFamily } from '../../services/api';

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
        onSave();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Family Last Name"
                required
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default FamilyForm;