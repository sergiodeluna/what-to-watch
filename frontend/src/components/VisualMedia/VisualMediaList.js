import React, { useEffect, useState } from 'react';
import { getVisualMedia, deleteVisualMedia } from '../../services/api';

const VisualMediaList = () => {
    const [visualMedia, setVisualMedia] = useState([]);

    useEffect(() => {
        const fetchVisualMedia = async () => {
            const response = await getVisualMedia();
            setVisualMedia(response.data);
        };
        fetchVisualMedia();
    }, []);

    const handleDelete = async (id) => {
        await deleteVisualMedia(id);
        setVisualMedia(visualMedia.filter(media => media.id !== id));
    };

    return (
        <div>
            <h2>Visual Media</h2>
            <ul>
                {visualMedia.map(media => (
                    <li key={media.id}>
                        {media.title} - {media.recommendedBy} (Rating: {media.star})
                        <button onClick={() => handleDelete(media.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VisualMediaList;