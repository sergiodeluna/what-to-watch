import React, { useEffect, useState } from 'react';
import { getVisualMedia, deleteVisualMedia, getVisualMediaById } from '../../services/api';
import { FaFilm, FaTrash, FaPlus, FaEdit, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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

    const handleViewDetails = async (id) => {
        try {
            const response = await getVisualMediaById(id);
            const media = response.data;
            Swal.fire({
                title: 'Media Details',
                html: `
                    <p><strong>Title:</strong> ${media.title}</p>
                    <p><strong>Rating:</strong> ${media.star} / 5</p>
                    <p><strong>Recommended By:</strong> ${media.recommendedBy}</p>
                `,
                confirmButtonColor: '#6D28D9',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to fetch media details!',
                confirmButtonColor: '#6D28D9',
            });
        }
    };

    return (
        <div className="p-6 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
            <h2 className="text-2xl font-bold text-purple-600 mb-6">Visual Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visualMedia.map(media => (
                    <div key={media.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center cursor-pointer" onClick={() => handleViewDetails(media.id)}>
                                <div className="bg-purple-100 p-3 rounded-full mr-4">
                                    <FaFilm className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-purple-800">{media.title}</p>
                                    <p className="text-gray-600">Recommended by: {media.recommendedBy}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Link
                                    to={`/visual-media/edit/${media.id}`}
                                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 flex items-center justify-center transition-colors"
                                    title="Edit"
                                >
                                    <FaEdit className="text-lg" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(media.id)}
                                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 flex items-center justify-center transition-colors"
                                    title="Delete"
                                >
                                    <FaTrash className="text-lg" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-pink-500 h-2 rounded-full"
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
                to="/visual-media/new"
                className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 flex items-center justify-center transition-colors"
                title="Add Media"
            >
                <FaPlus className="text-lg" />
            </Link>
        </div>
    );
};

export default VisualMediaList;