import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import VisualMediaList from '../components/VisualMedia/VisualMediaList';
import VisualMediaForm from '../components/VisualMedia/VisualMediaForm';

const VisualMedia = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <Routes>
            <Route path="/" element={<VisualMediaList />} />
            <Route
                path="/new"
                element={<VisualMediaForm onSave={() => setRefresh(!refresh)} />}
            />
            <Route
                path="/edit/:id"
                element={<VisualMediaForm onSave={() => setRefresh(!refresh)} />}
            />
        </Routes>
    );
};

export default VisualMedia;