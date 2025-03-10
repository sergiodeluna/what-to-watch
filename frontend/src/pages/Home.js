import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaFilm, FaUserFriends } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
                <h1 className="text-4xl font-bold text-purple-600 mb-4">
                    Welcome to What To Watch!
                </h1>
                <p className="text-gray-700 mb-6">
                    Manage your families, users, and visual media in a fun and interactive way.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                        to="/users"
                        className="bg-purple-100 p-6 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                        <FaUsers className="text-purple-600 text-4xl mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-purple-800">Users</h2>
                        <p className="text-gray-700">Manage users and their details.</p>
                    </Link>
                    <Link
                        to="/families"
                        className="bg-blue-100 p-6 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                        <FaUserFriends className="text-blue-600 text-4xl mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-blue-800">Families</h2>
                        <p className="text-gray-700">Manage families and their members.</p>
                    </Link>
                    <Link
                        to="/visual-media"
                        className="bg-pink-100 p-6 rounded-lg hover:bg-pink-200 transition-colors"
                    >
                        <FaFilm className="text-pink-600 text-4xl mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-pink-800">Visual Media</h2>
                        <p className="text-gray-700">Manage shared visual media.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;