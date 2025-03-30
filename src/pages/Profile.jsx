import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="bg-white/10 shadow-lg rounded-2xl p-8 max-w-xl w-full text-center border border-white/20 transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold text-center my-6 text-white drop-shadow-lg">
          Profile
        </h1>
  
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-xl max-w-2xl mx-auto">
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
            onChange={handleChange}
          />
  
          <button className="bg-gray-700 text-white py-3 rounded-lg uppercase font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50">
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
  
        <div className="flex justify-between mt-6 w-full max-w-2xl mx-auto">
          <span
            onClick={handleDeleteAccount}
            className="text-red-500 cursor-pointer hover:underline transition-all duration-300"
          >
            Delete Account
          </span>
          <span
            onClick={handleSignOut}
            className="text-red-500 cursor-pointer hover:underline transition-all duration-300"
          >
            Sign Out
          </span>
        </div>
  
        <p className="text-red-500 mt-5 text-center">{error && "Something went wrong!"}</p>
        <p className="text-green-400 mt-5 text-center">{updateSuccess && "User updated successfully!"}</p>
      </div>
    </div>
  );
  
  
}
