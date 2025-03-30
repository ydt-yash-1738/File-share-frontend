import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user); // Get user state from Redux

  const handleStartSharing = () => {
    if (currentUser) {
      navigate('/share'); // If user is signed in, go to file sharing page
    } else {
      navigate('/sign-in'); // If not, go to sign-in page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-8 max-w-2xl text-center border border-white/30 transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-md">
          FileXchange!
        </h1>
        <p className="mb-4 text-lg text-gray-200 leading-relaxed">
          A platform exclusively made for{" "}
          <strong className="text-white">File Sharing</strong>.
        </p>
        <div className="flex items-center justify-center">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            onClick={handleStartSharing}
          >
            Start Sharing
          </button>
        </div>
      </div>
    </div>
  );
}
