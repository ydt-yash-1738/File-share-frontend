import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="bg-white/10 shadow-lg rounded-2xl p-10 w-full max-w-xl text-center border border-white/20 transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold text-white text-center my-6">
          Sign In
        </h1>
  
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 rounded-xl w-full max-w-md mx-auto">
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
  
          {/* Sign-In Button */}
          <button
            disabled={loading}
            className="bg-gray-700 text-white py-3 rounded-lg uppercase font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
  
        {/* Sign-Up Link */}
        <div className="flex gap-2 mt-5 justify-center">
          <p className="text-gray-300">Don't have an account?</p>
          <Link to="/sign-up">
            <span className="text-gray-400 hover:underline transition-all duration-300">
              Sign Up
            </span>
          </Link>
        </div>
  
        {/* Error Message */}
        <p className="text-red-500 mt-5 text-center">
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </div>
    </div>
  );
  
  
}
