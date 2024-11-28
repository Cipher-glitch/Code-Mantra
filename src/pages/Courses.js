import React, { useState } from 'react';
import { Book, Video, FileText, Award, ChevronRight, Star } from 'lucide-react';

const Sidebar = () => (
  <div className="w-72 bg-white shadow-xl">
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-3xl font-bold text-white">Code Mantra</h1>
    </div>
    <nav className="mt-8">
      {/* Navigation items would go here, similar to the dashboard */}
    </nav>
  </div>
);

const CourseCard = ({ title, progress, totalLessons, completedLessons, color }) => (
  <div className={`bg-${color}-100 p-6 rounded-lg shadow-lg border-l-4 border-${color}-500 hover:shadow-xl transition duration-300`}>
    <h3 className={`font-bold text-xl mb-3 text-${color}-700`}>{title}</h3>
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div className={`bg-${color}-500 h-4 rounded-full transition-all duration-500 ease-out`} style={{ width: `${progress}%` }}></div>
    </div>
    <div className="flex justify-between items-center">
      <p className={`text-sm text-${color}-600 font-medium`}>{progress}% Complete</p>
      <p className={`text-sm text-${color}-600 font-medium`}>{completedLessons}/{totalLessons} Lessons</p>
    </div>
    <button className={`mt-4 px-4 py-2 bg-${color}-500 text-white rounded-full hover:bg-${color}-600 transition duration-300 flex items-center`}>
      Continue Learning
      <ChevronRight size={20} className="ml-2" />
    </button>
  </div>
);

const LessonItem = ({ title, type, completed }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'video': return <Video size={20} className="text-blue-500" />;
      case 'quiz': return <FileText size={20} className="text-green-500" />;
      case 'assignment': return <Book size={20} className="text-purple-500" />;
      default: return <Video size={20} className="text-blue-500" />;
    }
  };

  return (
    <div className={`flex items-center p-4 ${completed ? 'bg-green-100' : 'bg-white'} rounded-lg mb-2 shadow`}>
      {getIcon(type)}
      <span className="ml-4 flex-grow">{title}</span>
      {completed && <Award size={20} className="text-yellow-500" />}
    </div>
  );
};

export default function MyCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    { id: 1, title: "Python Adventure", progress: 75, totalLessons: 20, completedLessons: 15, color: "blue" },
    { id: 2, title: "Web Wizardry", progress: 40, totalLessons: 25, completedLessons: 10, color: "green" },
    { id: 3, title: "Data Dragon's Lair", progress: 20, totalLessons: 30, completedLessons: 6, color: "red" },
  ];

  const lessons = [
    { id: 1, title: "Introduction to Python", type: "video", completed: true },
    { id: 2, title: "Variables and Data Types", type: "video", completed: true },
    { id: 3, title: "Control Structures Quiz", type: "quiz", completed: true },
    { id: 4, title: "Functions and Modules", type: "video", completed: false },
    { id: 5, title: "OOP Concepts", type: "video", completed: false },
    { id: 6, title: "Final Project", type: "assignment", completed: false },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Quests <Star className="inline text-yellow-400" /></h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-500">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Current Quest: Python Adventure</h2>
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <LessonItem key={lesson.id} {...lesson} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}