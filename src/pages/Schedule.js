import React, { useState } from 'react';
import { Calendar, Clock, Video, Book, FileText, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const EventCard = ({ event }) => {
  const getEventColor = (type) => {
    switch (type) {
      case 'class': return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'assignment': return 'bg-green-100 border-green-500 text-green-700';
      case 'exam': return 'bg-red-100 border-red-500 text-red-700';
      default: return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'class': return <Video size={16} />;
      case 'assignment': return <FileText size={16} />;
      case 'exam': return <Book size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  return (
    <div className={`p-2 rounded-lg border-l-4 mb-2 flex items-center ${getEventColor(event.type)}`}>
      {getEventIcon(event.type)}
      <span className="ml-2 flex-grow">{event.title}</span>
      <span className="text-sm">{event.time}</span>
    </div>
  );
};

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    { date: new Date(2024, 9, 15), type: 'class', title: 'Python Basics', time: '10:00 AM' },
    { date: new Date(2024, 9, 15), type: 'assignment', title: 'JavaScript Homework', time: '11:59 PM' },
    { date: new Date(2024, 9, 17), type: 'exam', title: 'Data Structures Quiz', time: '2:00 PM' },
    { date: new Date(2024, 9, 18), type: 'class', title: 'Web Development', time: '3:00 PM' },
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const hasEvents = events.some(event => event.date.toDateString() === date.toDateString());

      days.push(
        <div
          key={day}
          className={`p-2 text-center cursor-pointer hover:bg-blue-100 rounded-full ${isSelected ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          {day}
          {hasEvents && <div className="w-1 h-1 bg-red-500 rounded-full mx-auto mt-1"></div>}
        </div>
      );
    }

    return days;
  };

  const filteredEvents = events.filter(event => event.date.toDateString() === selectedDate.toDateString());

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">My Schedule</h1>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <div className="flex space-x-2">
              <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200">
                <ChevronLeft size={24} />
              </button>
              <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {DAYS.map(day => (
              <div key={day} className="text-center font-semibold text-gray-500">{day}</div>
            ))}
            {renderCalendar()}
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Events for {selectedDate.toDateString()}</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                <Plus size={20} className="mr-2" /> Add Event
              </button>
            </div>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))
            ) : (
              <p className="text-gray-500">No events scheduled for this day.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}