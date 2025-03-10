import React, { useState } from 'react';
import { createVisualMedia, updateVisualMedia } from '../../services/api';

const VisualMediaForm = ({ visualMedia, onSave }) => {
    const [title, setTitle] = useState(visualMedia ? visualMedia.title : '');
    const [star, setStar] = useState(visualMedia ? visualMedia.star : '');
    const [recommendedBy, setRecommendedBy] = useState(visualMedia ? visualMedia.recommendedBy : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mediaData = { title, star, recommendedBy };
        if (visualMedia) {
            await updateVisualMedia(visualMedia.id, mediaData);
        } else {
            await createVisualMedia(mediaData);
        }
        onSave();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <input
                type="number"
                value={star}
                onChange={(e) => setStar(e.target.value)}
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                required
            />
            <input
                type="text"
                value={recommendedBy}
                onChange={(e) => setRecommendedBy(e.target.value)}
                placeholder="Recommended By"
                required
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default VisualMediaForm;