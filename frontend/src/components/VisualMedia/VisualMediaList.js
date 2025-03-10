import React, { useEffect, useState } from 'react';
import { getVisualMedia, deleteVisualMedia } from '../../services/api';
import { FaFilm, FaStar, FaTrash } from 'react-icons/fa';

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
        <div className="p-6">
            <h2 className="text-2xl font-bold text-futuristic-purple mb-4">Visual Media</h2>
            <ul className="space-y-4">
                {visualMedia.map(media => (
                    <li key={media.id} className="bg-white p-4 rounded-lg shadow-md animate-slide-in">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="bg-futuristic-teal p-3 rounded-full mr-4">
                                    <FaFilm className="text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">{media.title}</p>
                                    <p className="text-gray-600">Recommended by: {media.recommendedBy}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-futuristic-pink p-2 rounded-full mr-4">
                                    <FaStar className="text-white" /> {media.star}
                                </div>
                                <button
                                    onClick={() => handleDelete(media.id)}
                                    className="bg-futuristic-purple text-white px-4 py-2 rounded-lg hover:bg-futuristic-blue flex items-center"
                                >
                                    <FaTrash className="mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-futuristic-teal h-2 rounded-full"
                                    style={{ width: `${(media.star / 5) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VisualMediaList;