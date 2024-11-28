import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Award, TrendingUp, Clock, Target, Calendar } from 'lucide-react';

const ProgressCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${color}-500`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
      </div>
      <Icon size={24} className={`text-${color}-500`} />
    </div>
  </div>
);

const CourseProgressChart = ({ data }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="progress" fill="#3B82F6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const SkillDistributionChart = ({ data }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Skill Distribution</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const UpcomingDeadlines = ({ deadlines }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
    <ul className="space-y-2">
      {deadlines.map((deadline, index) => (
        <li key={index} className="flex items-center">
          <Calendar size={20} className="mr-2 text-blue-500" />
          <span>{deadline.task}</span>
          <span className="ml-auto text-sm text-gray-500">{deadline.date}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function ProgressTrackingDashboard() {
  const courseProgressData = [
    { name: 'Python Basics', progress: 90 },
    { name: 'Web Development', progress: 65 },
    { name: 'Data Structures', progress: 40 },
    { name: 'Machine Learning', progress: 25 },
    { name: 'Algorithms', progress: 50 },
  ];

  const skillDistributionData = [
    { name: 'Python', value: 35, color: '#3B82F6' },
    { name: 'JavaScript', value: 25, color: '#10B981' },
    { name: 'HTML/CSS', value: 20, color: '#F59E0B' },
    { name: 'SQL', value: 15, color: '#6366F1' },
    { name: 'Java', value: 5, color: '#EC4899' },
  ];

  const upcomingDeadlines = [
    { task: 'Python Project Submission', date: 'May 15, 2024' },
    { task: 'Web Dev Quiz', date: 'May 18, 2024' },
    { task: 'Data Structures Assignment', date: 'May 22, 2024' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Learning Journey</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProgressCard title="Courses Completed" value="4" icon={Award} color="green" />
          <ProgressCard title="Overall Progress" value="68%" icon={TrendingUp} color="blue" />
          <ProgressCard title="Study Time" value="87h" icon={Clock} color="purple" />
          <ProgressCard title="Goals Achieved" value="7/10" icon={Target} color="yellow" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CourseProgressChart data={courseProgressData} />
          <SkillDistributionChart data={skillDistributionData} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Learning Streaks</h3>
              <div className="flex space-x-2">
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-sm ${
                      Math.random() > 0.3 ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                    title={`Day ${i + 1}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <UpcomingDeadlines deadlines={upcomingDeadlines} />
        </div>
      </div>
    </div>
  );
}