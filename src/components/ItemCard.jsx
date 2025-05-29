import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChatWindow from './ChatWindow';

const ItemCard = ({ item, type }) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 bg-gray-200">
          {item.image?.url ? (
            <img
              src={item.image.url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
          )}
          <span
            className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full text-white ${
              type === 'lost' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {type === 'lost' ? 'Lost' : 'Found'}
          </span>
        </div>
        <CardHeader>
          <CardTitle className="font-semibold text-lg">{item.title}</CardTitle>
          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
            {item.category || 'Other'}
          </span>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>By {item.postedBy?.username}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{new Date(item.createdAt).toLocaleString()}</span>
            </div>
          </div>
          <Button
            onClick={() => setShowChat(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            Chat with {type === 'lost' ? 'Owner' : 'Finder'}
          </Button>
        </CardContent>
      </Card>
      {showChat && <ChatWindow isOpen={showChat} onClose={() => setShowChat(false)} item={item} type={type} />}
    </>
  );
};

export default ItemCard;