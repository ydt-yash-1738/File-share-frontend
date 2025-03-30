import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 pt-16">
      <div className="bg-white/10 shadow-lg rounded-2xl p-8 max-w-2xl text-center border border-white/20 transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-md">
          About FileXchange
        </h1>
        <p className="mb-4 text-lg text-gray-200 leading-relaxed">
          <strong className="text-white">FileXchange</strong> is a modern and secure **file-sharing application** built with the{" "}
          <strong className="text-white">MERN (MongoDB, Express, React, Node.js)</strong> stack.
          It allows users to <strong className="text-white">upload, share, and access files</strong> effortlessly.
        </p>
        <p className="mb-4 text-lg text-gray-200 leading-relaxed">
          Users can <strong className="text-white">register and authenticate</strong> securely using JWT authentication. The platform enables file storage, secure links, and instant sharing with a clean and intuitive interface.
        </p>
        <p className="mb-4 text-lg text-gray-200 leading-relaxed">
          The front-end is built with <strong className="text-white">React (Vite & Tailwind CSS)</strong>, providing a fast and responsive UI. The back-end is powered by <strong className="text-white">Node.js, Express, and MongoDB</strong> for seamless data management and file handling.
        </p>
        <p className="text-lg text-gray-200 leading-relaxed">
          Whether you're sharing important documents or collaborating on projects, FileXchange makes it simple and efficient.  
          Feel free to use this project as a template for your own file-sharing platforms!
        </p>
      </div>
    </div>
  );
  
}
