import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="bg-white/20 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-white drop-shadow-md tracking-wide">
          FileXchange
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-6 items-center text-white text-lg">
          <Link to="/" className="hover:text-blue-200 transition duration-300">
            <li>Home</li>
          </Link>
          <Link to="/about" className="hover:text-blue-200 transition duration-300">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover border-2 border-white shadow-md transition-transform transform hover:scale-110"
              />
            ) : (
              <li className="bg-blue-500 px-4 py-1.5 rounded-full hover:bg-blue-600 transition duration-300 shadow-lg">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </nav>
  );
}
