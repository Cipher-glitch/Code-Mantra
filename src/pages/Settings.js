import React, { useState } from 'react';
import { User, Bell, Lock, Palette, Globe, Volume2, Moon, Sun, ToggleLeft, ToggleRight } from 'lucide-react';

const SettingsSection = ({ title, icon, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-2xl font-bold mb-4 flex items-center">
      {icon}
      <span className="ml-2">{title}</span>
    </h2>
    {children}
  </div>
);

const ToggleSwitch = ({ label, isChecked, onChange }) => (
  <div className="flex items-center justify-between py-2">
    <span>{label}</span>
    <button
      className={`w-14 h-8 flex items-center rounded-full p-1 ${
        isChecked ? 'bg-green-400' : 'bg-gray-300'
      }`}
      onClick={() => onChange(!isChecked)}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          isChecked ? 'translate-x-6' : ''
        }`}
      ></div>
    </button>
  </div>
);

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState('english');
  const [theme, setTheme] = useState('default');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Settings</h1>

        <SettingsSection title="Account" icon={<User className="text-blue-500" />}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="CodeNinja2024" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="student@example.com" />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Update Profile
            </button>
          </div>
        </SettingsSection>

        <SettingsSection title="Notifications" icon={<Bell className="text-yellow-500" />}>
          <ToggleSwitch
            label="Email Notifications"
            isChecked={emailNotifications}
            onChange={setEmailNotifications}
          />
          <ToggleSwitch
            label="SMS Notifications"
            isChecked={smsNotifications}
            onChange={setSmsNotifications}
          />
        </SettingsSection>

        <SettingsSection title="Privacy" icon={<Lock className="text-green-500" />}>
          <ToggleSwitch
            label="Make profile visible to other students"
            isChecked={false}
            onChange={() => {}}
          />
          <ToggleSwitch
            label="Allow teachers to see my progress"
            isChecked={true}
            onChange={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="Appearance" icon={<Palette className="text-purple-500" />}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Theme</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="ocean">Ocean</option>
                <option value="forest">Forest</option>
                <option value="sunset">Sunset</option>
              </select>
            </div>
            <ToggleSwitch
              label="Dark Mode"
              isChecked={darkMode}
              onChange={setDarkMode}
            />
          </div>
        </SettingsSection>

        <SettingsSection title="Language" icon={<Globe className="text-indigo-500" />}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>
        </SettingsSection>

        <SettingsSection title="Accessibility" icon={<Volume2 className="text-red-500" />}>
          <ToggleSwitch
            label="Screen Reader Support"
            isChecked={false}
            onChange={() => {}}
          />
          <ToggleSwitch
            label="High Contrast Mode"
            isChecked={false}
            onChange={() => {}}
          />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Text Size</label>
            <input type="range" min="1" max="3" step="1" className="w-full" />
          </div>
        </SettingsSection>

        <div className="mt-8 text-center">
          <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300 text-lg font-semibold">
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}