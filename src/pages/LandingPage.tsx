import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, ShieldCheck, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center">University Portal</h1>
          <p className="mt-2 text-blue-100 text-center max-w-2xl mx-auto">
            A comprehensive platform for students, faculty, and administrators
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Welcome to the Portal
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Select your role to access personalized features and manage your academic journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card 
            className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-t-4 border-blue-500"
            onClick={() => handleRoleSelect('student')}
          >
            <div className="flex flex-col items-center p-6">
              <div className="p-4 rounded-full bg-blue-100 mb-6">
                <GraduationCap className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Student Portal</h3>
              <p className="text-gray-600 text-center mb-8">
                Access your courses, track attendance, and manage your academic profile
              </p>
              <button
                onClick={() => handleRoleSelect('student')}
                className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login as Student
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Card>
          
          <Card 
            className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-t-4 border-green-500"
            onClick={() => handleRoleSelect('faculty')}
          >
            <div className="flex flex-col items-center p-6">
              <div className="p-4 rounded-full bg-green-100 mb-6">
                <Users className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Faculty Portal</h3>
              <p className="text-gray-600 text-center mb-8">
                Manage courses, track student progress, and update your professional profile
              </p>
              <button
                onClick={() => handleRoleSelect('faculty')}
                className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Login as Faculty
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Card>
          
          <Card 
            className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-t-4 border-purple-500"
            onClick={() => handleRoleSelect('admin')}
          >
            <div className="flex flex-col items-center p-6">
              <div className="p-4 rounded-full bg-purple-100 mb-6">
                <ShieldCheck className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Admin Portal</h3>
              <p className="text-gray-600 text-center mb-8">
                Oversee operations, manage users, and maintain academic standards
              </p>
              <button
                onClick={() => handleRoleSelect('admin')}
                className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Login as Admin
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Card>
        </div>
      </main>
      
      <footer className="bg-white mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-500">
            &copy; 2025 University Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;