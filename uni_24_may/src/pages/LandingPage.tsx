import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, ShieldCheck } from 'lucide-react';
import { useUserContext } from '../contexts/UserContext';
import Card from '../components/shared/Card';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { students, faculty, admins, setCurrentUser } = useUserContext();

  const handleRoleSelect = (role: 'student' | 'faculty' | 'admin') => {
    let user = null;
    
    if (role === 'student' && students.length > 0) {
      user = students[0];
    } else if (role === 'faculty' && faculty.length > 0) {
      user = faculty[0];
    } else if (role === 'admin' && admins.length > 0) {
      user = admins[0];
    }
    
    if (user) {
      setCurrentUser(user);
      navigate(`/${role}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="bg-blue-700 shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">University Portal</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Welcome to the University Portal
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Please select your role to continue
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card 
            className="border-t-4 border-blue-500 h-full"
            onClick={() => handleRoleSelect('student')}
          >
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-blue-100 mb-4">
                <GraduationCap className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Portal</h3>
              <p className="text-gray-600 text-center">
                Access your courses, check attendance, and manage your academic profile.
              </p>
              <button
                onClick={() => handleRoleSelect('student')}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login as Student
              </button>
            </div>
          </Card>
          
          <Card 
            className="border-t-4 border-green-500 h-full"
            onClick={() => handleRoleSelect('faculty')}
          >
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-green-100 mb-4">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Faculty Portal</h3>
              <p className="text-gray-600 text-center">
                Manage courses, track student attendance, and update your professional profile.
              </p>
              <button
                onClick={() => handleRoleSelect('faculty')}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Login as Faculty
              </button>
            </div>
          </Card>
          
          <Card 
            className="border-t-4 border-purple-500 h-full"
            onClick={() => handleRoleSelect('admin')}
          >
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-purple-100 mb-4">
                <ShieldCheck className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Portal</h3>
              <p className="text-gray-600 text-center">
                Manage users, assign courses, and oversee the entire university system.
              </p>
              <button
                onClick={() => handleRoleSelect('admin')}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Login as Admin
              </button>
            </div>
          </Card>
        </div>
      </main>
      
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-500">
            &copy; 2025 University Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;