import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaUserFriends, FaFilm } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-4xl w-full mx-4">
                <h1 className="text-4xl font-bold text-purple-600 mb-6">
                    Welcome to "What to Watch?"!
                </h1>
                <p className="text-gray-700 mb-8">
                    Manage your families, users, and visual media in a fun and interactive way.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        to="/users"
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
                    >
                        <div className="bg-purple-100 p-4 rounded-full mb-4">
                            <FaUsers className="text-purple-600 text-3xl" />
                        </div>
                        <h2 className="text-xl font-semibold text-purple-800 mb-2">Users</h2>
                        <p className="text-gray-600">Manage users and their details.</p>
                    </Link>
                    <Link
                        to="/families"
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
                    >
                        <div className="bg-blue-100 p-4 rounded-full mb-4">
                            <FaUserFriends className="text-blue-600 text-3xl" />
                        </div>
                        <h2 className="text-xl font-semibold text-blue-800 mb-2">Families</h2>
                        <p className="text-gray-600">Manage families and their members.</p>
                    </Link>
                    <Link
                        to="/visual-media"
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
                    >
                        <div className="bg-pink-100 p-4 rounded-full mb-4">
                            <FaFilm className="text-pink-600 text-3xl" />
                        </div>
                        <h2 className="text-xl font-semibold text-pink-800 mb-2">Visual Media</h2>
                        <p className="text-gray-600">Manage shared visual media.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;