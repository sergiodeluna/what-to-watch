import React, { useState, useEffect } from 'react';
import { createVisualMedia, updateVisualMedia, getVisualMediaById } from '../../services/api';
import { FaSave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const VisualMediaForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [star, setStar] = useState('');
    const [recommendedBy, setRecommendedBy] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchVisualMedia = async () => {
                const response = await getVisualMediaById(id);
                const media = response.data;
                setTitle(media.title);
                setStar(media.star);
                setRecommendedBy(media.recommendedBy);
            };
            fetchVisualMedia();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mediaData = { title, star, recommendedBy };
        try {
            if (id) {
                await updateVisualMedia(id, mediaData);
            } else {
                await createVisualMedia(mediaData);
            }
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: id ? 'Media updated successfully!' : 'Media created successfully!',
                confirmButtonColor: '#6D28D9',
            }).then(() => {
                navigate('/visual-media');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonColor: '#6D28D9',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-purple-600 mb-6">
                    {id ? 'Edit Visual Media' : 'Add Visual Media'}
                </h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="number"
                        value={star}
                        onChange={(e) => setStar(e.target.value)}
                        placeholder="Rating (1-5)"
                        min="1"
                        max="5"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="text"
                        value={recommendedBy}
                        onChange={(e) => setRecommendedBy(e.target.value)}
                        placeholder="Recommended By"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center w-full transition-colors"
                >
                    <FaSave className="mr-2" /> Save
                </button>
            </form>
        </div>
    );
};

export default VisualMediaForm;