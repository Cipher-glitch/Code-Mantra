import React, { useState } from 'react';
import { Video, Mic, MicOff, MessageSquare, Users, Share, MoreHorizontal, X } from 'lucide-react';

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white p-4">
    <h2 className="text-xl font-bold mb-4">Participants</h2>
    <ul>
      <li className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div>
        <span>John Doe (You)</span>
      </li>
      <li className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-green-500 mr-2"></div>
        <span>Jane Smith</span>
      </li>
      <li className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-yellow-500 mr-2"></div>
        <span>Bob Johnson</span>
      </li>
    </ul>
  </div>
);

const ChatBox = () => (
  <div className="w-64 bg-gray-100 p-4 flex flex-col h-full">
    <h2 className="text-xl font-bold mb-4">Chat</h2>
    <div className="flex-grow overflow-y-auto mb-4">
      <div className="mb-2"><strong>Jane:</strong> Has the class started?</div>
      <div className="mb-2"><strong>Bob:</strong> Not yet, waiting for the teacher.</div>
      <div className="mb-2"><strong>You:</strong> I'm excited for today's lesson!</div>
    </div>
    <div className="flex">
      <input type="text" placeholder="Type a message..." className="flex-grow p-2 rounded-l-lg" />
      <button className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
    </div>
  </div>
);

export default function LiveClassInterface() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      
      <div className="flex-grow flex flex-col">
        <div className="bg-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Python Adventure: Live Class</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center">
            <X size={20} className="mr-2" /> Leave Class
          </button>
        </div>
        
        <div className="flex-grow bg-black p-4 relative">
          {/* This would be replaced with the actual BigBlueButton video feed */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/api/placeholder/800/600" alt="Video placeholder" className="max-w-full max-h-full" />
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
            <button 
              className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff size={24} color="white" /> : <Mic size={24} color="white" />}
            </button>
            <button 
              className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-700' : 'bg-red-500'}`}
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              <Video size={24} color="white" />
            </button>
            <button className="p-3 rounded-full bg-gray-700">
              <MessageSquare size={24} color="white" />
            </button>
            <button className="p-3 rounded-full bg-gray-700">
              <Users size={24} color="white" />
            </button>
            <button className="p-3 rounded-full bg-gray-700">
              <Share size={24} color="white" />
            </button>
            <button className="p-3 rounded-full bg-gray-700">
              <MoreHorizontal size={24} color="white" />
            </button>
          </div>
        </div>
      </div>
      
      <ChatBox />
    </div>
  );
}