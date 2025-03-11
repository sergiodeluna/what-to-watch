import React, { useState, useEffect } from 'react';
import { createVisualMedia, updateVisualMedia, getVisualMediaById } from '../../services/api';
import { FaSave } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const VisualMediaForm = () => {
    const { id } = useParams(); // Obtém o ID da URL (se estiver editando)
    const [title, setTitle] = useState('');
    const [star, setStar] = useState('');
    const [recommendedBy, setRecommendedBy] = useState('');
    const navigate = useNavigate();

    // Carrega os dados da mídia visual se estiver em modo de edição
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
                await updateVisualMedia(id, mediaData); // Atualiza a mídia visual existente
            } else {
                await createVisualMedia(mediaData); // Cria uma nova mídia visual
            }
            // Exibe o pop-up de sucesso
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: id ? 'Media updated successfully!' : 'Media created successfully!',
                confirmButtonColor: '#6D28D9',
            }).then(() => {
                // Redireciona para a lista de mídias visuais
                navigate('/visual-media');
            });
        } catch (error) {
            // Exibe o pop-up de erro
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonColor: '#6D28D9',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-futuristic-blue to-futuristic-purple flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-futuristic-purple mb-4">
                    {id ? 'Edit Visual Media' : 'Add Visual Media'}
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