import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, User } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Button from '../../components/shared/Button';

const EditProfile: React.FC = () => {
  const { currentUser, updateStudent } = useUserContext();
  const [activeTab, setActiveTab] = useState<'basic' | 'education'>('basic');
  const [formData, setFormData] = useState({
    dob: currentUser?.dob || '',
    gender: (currentUser as any)?.gender || '',
    fatherName: (currentUser as any)?.fatherName || '',
    motherName: (currentUser as any)?.motherName || '',
    isFirstGraduate: (currentUser as any)?.isFirstGraduate || false,
    githubLink: (currentUser as any)?.githubLink || '',
    linkedinLink: (currentUser as any)?.linkedinLink || '',
    profilePic: (currentUser as any)?.profilePic || '',
    education: {
      tenth: {
        institutionName: (currentUser as any)?.education?.tenth?.institutionName || '',
        startYear: (currentUser as any)?.education?.tenth?.startYear || '',
        endYear: (currentUser as any)?.education?.tenth?.endYear || '',
        percentage: (currentUser as any)?.education?.tenth?.percentage || '',
      },
      twelfth: {
        institutionName: (currentUser as any)?.education?.twelfth?.institutionName || '',
        startYear: (currentUser as any)?.education?.twelfth?.startYear || '',
        endYear: (currentUser as any)?.education?.twelfth?.endYear || '',
        percentage: (currentUser as any)?.education?.twelfth?.percentage || '',
      },
      college: {
        institutionName: (currentUser as any)?.education?.college?.institutionName || '',
        startYear: (currentUser as any)?.education?.college?.startYear || '',
        expectedGraduationYear: (currentUser as any)?.education?.college?.expectedGraduationYear || '',
        cgpa: (currentUser as any)?.education?.college?.cgpa || '',
      },
    },
  });
  
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Dashboard', path: '/student' },
    { name: 'Available Courses', path: '/student/available-courses' },
    { name: 'Enrolled Courses', path: '/student/enrolled-courses' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.includes('.')) {
      // Handle nested objects (education fields)
      const [category, field, subfield] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [field]: {
            ...(prev[category as keyof typeof prev] as any)[field],
            [subfield]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentUser) {
      const updatedStudent = {
        ...currentUser,
        ...formData,
      };
      
      updateStudent(updatedStudent as any);
      navigate('/student/profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Student Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center mb-6">
            <Link to="/student/profile" className="text-blue-600 hover:text-blue-800">Profile</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
            <span className="text-gray-500">Edit Profile</span>
          </div>
          
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit Profile</h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="sm:flex">
              {/* Sidebar Navigation */}
              <div className="w-full sm:w-64 bg-gray-50 p-6 border-r border-gray-200">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('basic')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'basic'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    Basic Details
                  </button>
                  <button
                    onClick={() => setActiveTab('education')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'education'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    Education Details
                  </button>
                </nav>
              </div>
              
              {/* Main Content Area */}
              <div className="w-full p-6">
                <form onSubmit={handleSubmit}>
                  {/* Basic Details Tab */}
                  {activeTab === 'basic' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Details</h3>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Picture
                          </label>
                          <div className="flex items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mr-4 flex items-center justify-center">
                              {formData.profilePic ? (
                                <img
                                  src={formData.profilePic}
                                  alt="Profile"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="h-10 w-10 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <input
                                type="text"
                                name="profilePic"
                                value={formData.profilePic}
                                onChange={handleInputChange}
                                placeholder="Enter image URL"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <p className="mt-1 text-xs text-gray-500">
                                Enter the URL of your profile image
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                value={currentUser?.name}
                                disabled
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                              />
                            </div>
                          </div>
                          
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <div className="mt-1">
                              <input
                                type="email"
                                value={currentUser?.email}
                                disabled
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                              />
                            </div>
                          </div>
                          
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Roll Number
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                value={(currentUser as any)?.rollNumber}
                                disabled
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                              />
                            </div>
                          </div>
                          
                          <div className="sm:col-span-3">
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                              Date of Birth
                            </label>
                            <div className="mt-1">
                              <input
                                type="date"
                                name="dob"
                                id="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div className="sm:col-span-3">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                              Gender
                            </label>
                            <div className="mt-1">
                              <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option value="">Select gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Others">Others</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="sm:col-span-3">
                            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
                              Father's Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="fatherName"
                                id="fatherName"
                                value={formData.fatherName}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div className="sm:col-span-3">
                            <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">
                              Mother's Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="motherName"
                                id="motherName"
                                value={formData.motherName}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                              First Graduate
                            </label>
                            <div className="mt-1">
                              <div className="flex items-center">
                                <input
                                  id="isFirstGraduate"
                                  name="isFirstGraduate"
                                  type="checkbox"
                                  checked={formData.isFirstGraduate}
                                  onChange={handleInputChange}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isFirstGraduate" className="ml-2 block text-sm text-gray-700">
                                  Yes, I am the first graduate in my family
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="sm:col-span-3">
                            <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">
                              GitHub Link
                            </label>
                            <div className="mt-1">
                              <input
                                type="url"
                                name="githubLink"
                                id="githubLink"
                                value={formData.githubLink}
                                onChange={handleInputChange}
                                placeholder="https://github.com/username"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div className="sm:col-span-3">
                            <label htmlFor="linkedinLink" className="block text-sm font-medium text-gray-700">
                              LinkedIn Link
                            </label>
                            <div className="mt-1">
                              <input
                                type="url"
                                name="linkedinLink"
                                id="linkedinLink"
                                value={formData.linkedinLink}
                                onChange={handleInputChange}
                                placeholder="https://linkedin.com/in/username"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Education Details Tab */}
                  {activeTab === 'education' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Education Details</h3>
                        
                        <div className="mb-8">
                          <h4 className="text-md font-medium text-gray-800 mb-4">10th Standard</h4>
                          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                              <label htmlFor="education.tenth.institutionName" className="block text-sm font-medium text-gray-700">
                                Institution Name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.tenth.institutionName"
                                  id="education.tenth.institutionName"
                                  value={formData.education.tenth.institutionName}
                                  onChange={handleInputChange}
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="sm:col-span-3">
                              <label htmlFor="education.tenth.startYear" className="block text-sm font-medium text-gray-700">
                                Start Year
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.tenth.startYear"
                                  id="education.tenth.startYear"
                                  value={formData.education.tenth.startYear}
                                  onChange={handleInputChange}
                                  placeholder="YYYY"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="sm:col-span-3">
                              <label htmlFor="education.tenth.endYear" className="block text-sm font-medium text-gray-700">
                                End Year
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.tenth.endYear"
                                  id="education.tenth.endYear"
                                  value={formData.education.tenth.endYear}
                                  onChange={handleInputChange}
                                  placeholder="YYYY"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="sm:col-span-6">
                              <label htmlFor="education.tenth.percentage" className="block text-sm font-medium text-gray-700">
                                Percentage
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.tenth.percentage"
                                  id="education.tenth.percentage"
                                  value={formData.education.tenth.percentage}
                                  onChange={handleInputChange}
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-8">
                          <h4 className="text-md font-medium text-gray-800 mb-4">12th Standard</h4>
                          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                              <label htmlFor="education.twelfth.institutionName" className="block text-sm font-medium text-gray-700">
                                Institution Name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.twelfth.institutionName"
                                  id="education.twelfth.institutionName"
                                  value={formData.education.twelfth.institutionName}
                                  onChange={handleInputChange}
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="sm:col-span-3">
                              <label htmlFor="education.twelfth.startYear" className="block text-sm font-medium text-gray-700">
                                Start Year
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.twelfth.startYear"
                                  id="education.twelfth.startYear"
                                  value={formData.education.twelfth.startYear}
                                  onChange={handleInputChange}
                                  placeholder="YYYY"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="sm:col-span-3">
                              <label htmlFor="education.twelfth.endYear" className="block text-sm font-medium text-gray-700">
                                End Year
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.twelfth.endYear"
                                  id="education.twelfth.endYear"
                                  value={formData.education.twelfth.endYear}
                                  onChange={handleInputChange}
                                  placeholder="YYYY"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="sm:col-span-6">
                              <label htmlFor="education.twelfth.percentage" className="block text-sm font-medium text-gray-700">
                                Percentage
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.twelfth.percentage"
                                  id="education.twelfth.percentage"
                                  value={formData.education.twelfth.percentage}
                                  onChange={handleInputChange}
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-md font-medium text-gray-800 mb-4">College</h4>
                          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                              <label htmlFor="education.college.institutionName" className="block text-sm font-medium text-gray-700">
                                Institution Name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.college.institutionName"
                                  id="education.college.institutionName"
                                  value={formData.education.college.institutionName}
                                  onChange={handleInputChange}
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="sm:col-span-3">
                              <label htmlFor="education.college.startYear" className="block text-sm font-medium text-gray-700">
                                Start Year
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.college.startYear"
                                  id="education.college.startYear"
                                  value={formData.education.college.startYear}
                                  onChange={handleInputChange}
                                  placeholder="YYYY"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="sm:col-span-3">
                              <label htmlFor="education.college.expectedGraduationYear" className="block text-sm font-medium text-gray-700">
                                Expected Graduation Year
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.college.expectedGraduationYear"
                                  id="education.college.expectedGraduationYear"
                                  value={formData.education.college.expectedGraduationYear}
                                  onChange={handleInputChange}
                                  placeholder="YYYY"
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="sm:col-span-6">
                              <label htmlFor="education.college.cgpa" className="block text-sm font-medium text-gray-700">
                                CGPA / Percentage
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="education.college.cgpa"
                                  id="education.college.cgpa"
                                  value={formData.education.college.cgpa}
                                  onChange={handleInputChange}
                                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="mr-3"
                      onClick={() => navigate('/student/profile')}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;