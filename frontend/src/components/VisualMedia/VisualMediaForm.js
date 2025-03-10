import React, { useState } from 'react';
import { createVisualMedia, updateVisualMedia } from '../../services/api';
import { FaSave } from 'react-icons/fa';

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
        <div className="min-h-screen bg-gradient-to-b from-futuristic-blue to-futuristic-purple flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-futuristic-purple mb-4">
                    {visualMedia ? 'Edit Visual Media' : 'Add Visual Media'}
                </h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    <input
                        type="number"
                        value={star}
                        onChange={(e) => setStar(e.target.value)}
                        placeholder="Rating (1-5)"
                        min="1"
                        max="5"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        value={recommendedBy}
                        onChange={(e) => setRecommendedBy(e.target.value)}
                        placeholder="Recommended By"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-futuristic-teal text-white px-4 py-2 rounded-lg hover:bg-futuristic-blue flex items-center justify-center w-full"
                >
                    <FaSave className="mr-2" /> Save
                </button>
            </form>
        </div>
    );
};

export default VisualMediaForm;