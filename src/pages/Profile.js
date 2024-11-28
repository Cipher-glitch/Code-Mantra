import React, { useState } from 'react';
import { User, Mail, Phone, Book, Award, Settings, Edit2, Save, Camera } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const progressData = [
  { month: 'Jan', progress: 20 },
  { month: 'Feb', progress: 35 },
  { month: 'Mar', progress: 50 },
  { month: 'Apr', progress: 65 },
  { month: 'May', progress: 80 },
  { month: 'Jun', progress: 100 },
];

const ProfileSection = ({ icon: Icon, title, value, editable, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = () => {
    onEdit(editedValue);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center mb-4 bg-white p-4 rounded-lg shadow-md">
      <Icon size={24} className="text-blue-500 mr-4" />
      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
        {isEditing ? (
          <input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="w-full border-b-2 border-blue-500 focus:outline-none"
          />
        ) : (
          <p className="text-lg">{value}</p>
        )}
      </div>
      {editable && (
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="text-blue-500 hover:text-blue-700"
        >
          {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
        </button>
      )}
    </div>
  );
};

const AchievementBadge = ({ title, description, icon: Icon }) => (
  <div className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
    <div className="bg-yellow-400 p-3 rounded-full mr-4">
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default function StudentProfile() {
  const [studentInfo, setStudentInfo] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    enrolledCourses: 3,
    completedCourses: 2,
  });

  const handleEdit = (field, value) => {
    setStudentInfo({ ...studentInfo, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-blue-600 p-4 text-white text-center relative">
            <div className="w-32 h-32 rounded-full bg-white mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg">
              <img src="/api/placeholder/128/128" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-4 right-4 bg-white text-blue-600 p-2 rounded-full shadow-md">
              <Camera size={20} />
            </button>
            <h1 className="text-3xl font-bold">{studentInfo.name}</h1>
            <p className="text-blue-200">Student</p>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <ProfileSection icon={User} title="Name" value={studentInfo.name} editable onEdit={(value) => handleEdit('name', value)} />
            <ProfileSection icon={Mail} title="Email" value={studentInfo.email} editable onEdit={(value) => handleEdit('email', value)} />
            <ProfileSection icon={Phone} title="Phone" value={studentInfo.phone} editable onEdit={(value) => handleEdit('phone', value)} />
            <ProfileSection icon={Book} title="Enrolled Courses" value={studentInfo.enrolledCourses} />
            <ProfileSection icon={Award} title="Completed Courses" value={studentInfo.completedCourses} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Learning Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
            <AchievementBadge 
              title="Quick Learner" 
              description="Completed 5 lessons in one day" 
              icon={Book} 
            />
            <AchievementBadge 
              title="Perfect Score" 
              description="Scored 100% in a quiz" 
              icon={Award} 
            />
            <AchievementBadge 
              title="Consistent Coder" 
              description="Coded for 7 days in a row" 
              icon={Settings} 
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}