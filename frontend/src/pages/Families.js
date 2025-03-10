import React, { useState } from 'react';
import FamilyList from '../components/Family/FamilyList';
import FamilyForm from '../components/Family/FamilyForm';

const Families = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h1>Families</h1>
            <FamilyForm onSave={() => setRefresh(!refresh)} />
            <FamilyList />
        </div>
    );
};

export default Families;