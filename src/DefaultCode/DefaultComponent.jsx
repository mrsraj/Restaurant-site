import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 text-center px-4">
            <h1 className="text-7xl font-bold mb-2">404</h1>
            <p className="text-lg mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="px-5 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-200"
            >
                Go back home
            </Link>
        </div>
    );
};

export default NotFound;
