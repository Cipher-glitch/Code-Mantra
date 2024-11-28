import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import LiveClass from './pages/LiveClass';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings'; // Import the new Settings component

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/live-class" element={<LiveClass />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/settings" element={<Settings />} /> {/* Add new route for Settings */}
      </Routes>
    </Router>
  );
}

export default App;
