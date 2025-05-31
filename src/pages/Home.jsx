import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const [activeTab, setActiveTab] = useState('lost');
  const [items, setItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/item', {
          params: { type: activeTab }
        });
        setItems(response.data.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch items');
      }
    };
    if (isAuthenticated) {
      fetchItems();
    }
  }, [activeTab, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="w-screen h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">FinditBack</h1>
            <p className="text-xl text-gray-600 mb-8">
              Lost something? Found something? Connect with your community to reunite lost items with their owners.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-lg">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 text-lg">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-red-500 text-2xl">📢</span>
                  Report Lost Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Lost something valuable? Create a detailed report to help others identify and return your item.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Add photos and detailed descriptions</li>
                  <li>• Specify location where item was lost</li>
                  <li>• Connect with people who found similar items</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-green-500 text-2xl">🔍</span>
                  Report Found Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Found something that doesn't belong to you? Help reunite it with its rightful owner.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Upload photos of found items</li>
                  <li>• Add location details where you found it</li>
                  <li>• Chat with potential owners</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            <Button
              variant={activeTab === 'lost' ? 'default' : 'outline'}
              onClick={() => setActiveTab('lost')}
              className={`px-6 py-3 text-lg font-medium ${
                activeTab === 'lost' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Lost Items
            </Button>
            <Button
              variant={activeTab === 'found' ? 'default' : 'outline'}
              onClick={() => setActiveTab('found')}
              className={`px-6 py-3 text-lg font-medium ${
                activeTab === 'found' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Found Items
            </Button>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {activeTab === 'lost' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Report Lost Items</h2>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/report-lost" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Report Lost Item
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard key={item._id} item={item} type="lost" />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'found' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Found Items</h2>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/report-found" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Report Found Item
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard key={item._id} item={item} type="found" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;