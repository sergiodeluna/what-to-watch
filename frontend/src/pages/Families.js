import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FamilyList from '../components/Family/FamilyList';
import FamilyForm from '../components/Family/FamilyForm';

const Families = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <Routes>
            <Route path="/" element={<FamilyList />} />
            <Route
                path="/new"
                element={<FamilyForm onSave={() => setRefresh(!refresh)} />}
            />
            <Route
                path="/edit/:id"
                element={<FamilyForm onSave={() => setRefresh(!refresh)} />}
            />
        </Routes>
    );
};

export default Families;