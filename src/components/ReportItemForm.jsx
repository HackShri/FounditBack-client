import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReportItemForm = ({ type = 'lost' }) => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value
    }));
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        photo: e.target.files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageId = null;
      if (formData.photo) {
        const formDataToUpload = new FormData();
        formDataToUpload.append('image', formData.photo);
        const imageResponse = await axios.post('/api/image/upload', formDataToUpload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageId = imageResponse.data.data._id;
      }

      const itemData = {
        type,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        imageId,
        category: formData.category
      };

      await axios.post('/api/item/create', itemData);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Report {type === 'lost' ? 'Lost' : 'Found'} Item
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Item {type === 'lost' ? 'Category' : 'Type'}
            </Label>
            <Select onValueChange={handleSelectChange} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select item category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile">Mobile Phone</SelectItem>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="keychain">Key Chain</SelectItem>
                <SelectItem value="wallet">Wallet</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Item Name
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., iPhone 16 Pro, MacBook Air"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </Label>
            <textarea
              id="description"
              name="description"
              placeholder={`Describe the ${type} item in detail - color, size, distinctive features`}
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <Label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location Where {type === 'lost' ? 'Lost' : 'Found'}
            </Label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="e.g., Bus Stand, College Campus"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
              Photo of the Item
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-600 mb-2">Upload a photo of the {type} item</p>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => document.getElementById('photo').click()}
                variant="outline"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Choose File
              </Button>
              {formData.photo && (
                <p className="text-sm text-green-600 mt-2">{formData.photo.name} selected</p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-lg"
          >
            {loading ? 'Submitting...' : `Submit ${type === 'lost' ? 'Lost' : 'Found'} Item Report`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportItemForm;