import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ChevronDown, LogOut } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';

interface NavbarProps {
  title: string;
  links: { name: string; path: string }[];
  showProfile?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ title, links, showProfile = true }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, setCurrentUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const handleProfileClick = () => {
    if (currentUser?.role === 'student') {
      navigate('/student/profile');
    } else if (currentUser?.role === 'faculty') {
      navigate('/faculty/profile');
    }
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white hover:text-blue-200 px-3 py-2 text-sm font-medium border-transparent hover:border-blue-200 transition duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {showProfile && currentUser && (
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
                  >
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-blue-200 flex items-center justify-center">
                      {currentUser.profilePic ? (
                        <img
                          src={currentUser.profilePic}
                          alt={currentUser.name}
                          className="h-8 w-8 object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-blue-700" />
                      )}
                    </div>
                    <span className="text-white">{currentUser.name}</span>
                    <ChevronDown className="h-4 w-4 text-white" />
                  </button>
                </div>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                    {currentUser.role !== 'admin' && (
                      <button
                        onClick={handleProfileClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:text-blue-200 hover:bg-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {showProfile && currentUser && (
          <div className="pt-4 pb-3 border-t border-blue-600">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-blue-200 flex items-center justify-center">
                {currentUser.profilePic ? (
                  <img
                    src={currentUser.profilePic}
                    alt={currentUser.name}
                    className="h-10 w-10 object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-blue-700" />
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{currentUser.name}</div>
                <div className="text-sm font-medium text-blue-200">{currentUser.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              {currentUser.role !== 'admin' && (
                <button
                  onClick={() => {
                    handleProfileClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-white hover:text-blue-200 hover:bg-blue-600"
                >
                  My Profile
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-base font-medium text-white hover:text-blue-200 hover:bg-blue-600"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;