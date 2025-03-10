import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-futuristic-blue to-futuristic-purple flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in">
                <h1 className="text-4xl font-bold text-futuristic-purple mb-4">
                    Welcome to What to Watch!
                </h1>
                <p className="text-gray-700 mb-6">
                    Manage your families, users, and visual media in a futuristic and interactive way.
                </p>
                <div className="space-y-4">
                    <div className="bg-futuristic-teal p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-white">Daily Challenge</h2>
                        <p className="text-white">Add 3 new users to earn a badge!</p>
                    </div>
                    <div className="bg-futuristic-pink p-4 rounded-lg">
                        <h2 className="text-xl font-semibold text-white">Leaderboard</h2>
                        <p className="text-white">See who's contributing the most.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;