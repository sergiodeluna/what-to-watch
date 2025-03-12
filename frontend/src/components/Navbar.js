import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaFilm, FaRocket, FaUserFriends } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold flex items-center hover:text-purple-200 transition-colors">
                    <FaRocket className="mr-2 animate-pulse-slow" /> What to Watch?
                </Link>
                <div className="space-x-4 flex items-center">
                    <Link to="/" className="text-white hover:text-purple-200 flex items-center transition-colors">
                        <FaHome className="mr-1" /> Home
                    </Link>
                    <Link to="/users" className="text-white hover:text-purple-200 flex items-center transition-colors">
                        <FaUsers className="mr-1" /> Users
                    </Link>
                    <Link to="/families" className="text-white hover:text-purple-200 flex items-center transition-colors">
                        <FaUserFriends className="mr-1" /> Families
                    </Link>
                    <Link to="/visual-media" className="text-white hover:text-purple-200 flex items-center transition-colors">
                        <FaFilm className="mr-1" /> Visual Media
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;