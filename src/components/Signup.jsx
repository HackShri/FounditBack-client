import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function Signup({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', formData);
      setSuccess(response.data.message);
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up - FinditBack</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="block text-sm font-medium">Username</Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
          <div>
            <Label className="block text-sm font-medium">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
          <div>
            <Label className="block text-sm font-medium">Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;