import React, { useEffect, useState } from 'react';
import { getVisualMedia, deleteVisualMedia } from '../../services/api';
import { FaFilm, FaTrash, FaPlus, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const VisualMediaList = () => {
    const [visualMedia, setVisualMedia] = useState([]);

    const fetchVisualMedia = async () => {
        const response = await getVisualMedia();
        setVisualMedia(response.data);
    };

    useEffect(() => {
        fetchVisualMedia();
    }, []);

    const handleDelete = async (id) => {
        await deleteVisualMedia(id);
        fetchVisualMedia();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-futuristic-purple mb-4">Visual Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visualMedia.map(media => (
                    <div key={media.id} className="bg-white p-4 rounded-lg shadow-md animate-fade-in">
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
                            <button
                                onClick={() => handleDelete(media.id)}
                                className="bg-futuristic-purple text-white px-4 py-2 rounded-lg hover:bg-futuristic-blue flex items-center"
                            >
                                <FaTrash className="mr-2" /> Delete
                            </button>
                        </div>
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-futuristic-pink h-2 rounded-full"
                                    style={{ width: `${(media.star / 5) * 100}%` }}
                                ></div>
                            </div>
                            <div className="flex items-center mt-2">
                                <FaStar className="text-yellow-500 mr-2" />
                                <span className="text-gray-600">{media.star} / 5</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link
                to="/visual-media/new" // Rota correta para adicionar mídia visual
                className="fixed bottom-8 right-8 bg-futuristic-pink text-white p-4 rounded-full shadow-lg hover:bg-futuristic-purple flex items-center"
            >
                <FaPlus className="mr-2" /> Add Media
            </Link>
        </div>
    );
};

export default VisualMediaList;