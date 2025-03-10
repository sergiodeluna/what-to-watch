import React, { useState } from 'react';
import VisualMediaList from '../components/VisualMedia/VisualMediaList';
import VisualMediaForm from '../components/VisualMedia/VisualMediaForm';

const VisualMedia = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h1>Visual Media</h1>
            <VisualMediaForm onSave={() => setRefresh(!refresh)} />
            <VisualMediaList />
        </div>
    );
};

export default VisualMedia;