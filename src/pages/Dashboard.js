import React from 'react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, Book, Calendar, Home, MessageCircle, Settings, User, Star } from 'lucide-react';

const progressData = [
  { name: 'Week 1', progress: 20 },
  { name: 'Week 2', progress: 35 },
  { name: 'Week 3', progress: 50 },
  { name: 'Week 4', progress: 65 },
  { name: 'Week 5', progress: 80 },
  { name: 'Week 6', progress: 100 },
];

const NavItem = ({ Icon, label, color }) => (
  <div className={`flex items-center space-x-2 p-3 hover:bg-${color}-100 rounded cursor-pointer transition duration-300`}>
    <Icon size={24} className={`text-${color}-500`} />
    <span className={`text-${color}-700 font-medium`}>{label}</span>
  </div>
);

const CourseCard = ({ title, progress, color }) => (
  <div className={`bg-${color}-100 p-6 rounded-lg shadow-lg border-l-4 border-${color}-500 transform hover:scale-105 transition duration-300`}>
    <h3 className={`font-bold text-xl mb-3 text-${color}-700`}>{title}</h3>
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div className={`bg-${color}-500 h-4 rounded-full transition-all duration-500 ease-out`} style={{ width: `${progress}%` }}></div>
    </div>
    <p className={`text-sm text-${color}-600 mt-2 font-medium`}>{progress}% Complete</p>
  </div>
);

export default function Dashboard() {
  const [studentName, setStudentName] = useState("Alex");

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-xl">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
          <h1 className="text-3xl font-bold text-white">Code Mantra</h1>
        </div>
        <nav className="mt-8">
          <NavItem Icon={Home} label="Dashboard" color="blue" />
          <NavItem Icon={Book} label="My Courses" color="green" />
          <NavItem Icon={Calendar} label="Schedule" color="yellow" />
          <NavItem Icon={MessageCircle} label="Messages" color="pink" />
          <NavItem Icon={User} label="Profile" color="purple" />
          <NavItem Icon={Settings} label="Settings" color="gray" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-6 px-8 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">Welcome back, {studentName}! <span className="text-yellow-400">⭐</span></h1>
            <Bell className="text-gray-600 cursor-pointer hover:text-yellow-500 transition duration-300" size={28} />
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-8 px-8">
          {/* Progress Overview */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border-t-4 border-blue-500">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Learning Journey</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Current Courses */}
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Current Quests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CourseCard title="Python Adventure" progress={75} color="blue" />
            <CourseCard title="Web Wizardry" progress={40} color="green" />
            <CourseCard title="Data Dragon's Lair" progress={20} color="red" />
          </div>

          {/* Upcoming Classes */}
          <h2 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">Upcoming Quests</h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-purple-500">
            <ul className="divide-y divide-gray-200">
              <li className="py-4 flex items-center">
                <Star className="text-yellow-400 mr-3" />
                <span className="font-medium text-purple-600">Advanced Python</span>
                <span className="ml-auto text-gray-500">Today, 4:00 PM</span>
              </li>
              <li className="py-4 flex items-center">
                <Star className="text-yellow-400 mr-3" />
                <span className="font-medium text-green-600">JavaScript Fundamentals</span>
                <span className="ml-auto text-gray-500">Tomorrow, 2:00 PM</span>
              </li>
              <li className="py-4 flex items-center">
                <Star className="text-yellow-400 mr-3" />
                <span className="font-medium text-red-600">Algorithm Design</span>
                <span className="ml-auto text-gray-500">Friday, 3:30 PM</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}