import React, { useEffect, useState } from 'react';
import { getFamilies, deleteFamily } from '../../services/api';

const FamilyList = () => {
    const [families, setFamilies] = useState([]);

    useEffect(() => {
        const fetchFamilies = async () => {
            const response = await getFamilies();
            setFamilies(response.data);
        };
        fetchFamilies();
    }, []);

    const handleDelete = async (id) => {
        await deleteFamily(id);
        setFamilies(families.filter(family => family.id !== id));
    };

    return (
        <div>
            <h2>Families</h2>
            <ul>
                {families.map(family => (
                    <li key={family.id}>
                        {family.lastName}
                        <button onClick={() => handleDelete(family.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FamilyList;