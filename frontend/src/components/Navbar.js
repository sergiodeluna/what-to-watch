import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaFilm, FaRocket } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-futuristic-purple to-futuristic-blue p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold flex items-center">
                    <FaRocket className="mr-2 animate-pulse-slow" /> What to Watch?
                </Link>
                <div className="space-x-4 flex items-center">
                    <Link to="/" className="text-white hover:text-futuristic-teal flex items-center">
                        <FaHome className="mr-1" /> Home
                    </Link>
                    <Link to="/users" className="text-white hover:text-futuristic-teal flex items-center">
                        <FaUsers className="mr-1" /> Users
                    </Link>
                    <Link to="/visual-media" className="text-white hover:text-futuristic-teal flex items-center">
                        <FaFilm className="mr-1" /> Visual Media
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;