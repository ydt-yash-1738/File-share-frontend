import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="bg-white/10 shadow-lg rounded-2xl p-10 w-full max-w-xl text-center border border-white/20 transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold text-center my-6 text-white drop-shadow-lg">
          Sign Up
        </h1>
  
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-6 rounded-xl w-full"
        >
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="bg-gray-800 text-white rounded-lg p-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            onChange={handleChange}
          />
  
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-gray-800 text-white rounded-lg p-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            onChange={handleChange}
          />
  
          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-gray-800 text-white rounded-lg p-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            onChange={handleChange}
          />
  
          {/* Submit Button */}
          <button
            disabled={loading}
            className="bg-gray-700 text-white py-3 rounded-lg uppercase font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
  
        {/* Navigation to Sign In */}
        <div className="flex gap-2 mt-6 text-white justify-center">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-gray-400 hover:underline transition-all duration-300">
              Sign In
            </span>
          </Link>
        </div>
  
        {/* Error Message */}
        <p className="text-red-500 mt-5 text-center">{error && "Something went wrong!"}</p>
      </div>
    </div>
  );
  
  
}
