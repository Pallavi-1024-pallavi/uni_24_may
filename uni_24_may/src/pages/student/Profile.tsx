import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Hash, Github, Linkedin, Edit, Eye } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

const StudentProfile: React.FC = () => {
  const { currentUser } = useUserContext();
  const [isViewMode, setIsViewMode] = useState(true);
  const navigate = useNavigate();
  
  const student = currentUser as any;

  const navLinks = [
    { name: 'Dashboard', path: '/student' },
    { name: 'Available Courses', path: '/student/available-courses' },
    { name: 'Enrolled Courses', path: '/student/enrolled-courses' }
  ];

  const handleEditProfile = () => {
    navigate('/student/edit-profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Student Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
            <div className="flex space-x-2">
              <Button 
                variant={isViewMode ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setIsViewMode(true)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Profile
              </Button>
              <Button 
                variant={!isViewMode ? 'primary' : 'outline'} 
                size="sm"
                onClick={handleEditProfile}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="border-b border-gray-200 px-4 py-6 sm:px-6 text-center">
              <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 mb-4">
                {student?.profilePic ? (
                  <img 
                    src={student.profilePic} 
                    alt={student.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                    <User className="h-16 w-16 text-blue-500" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{student?.name}</h2>
              <p className="text-sm text-gray-500">{student?.department} - Year {student?.year}</p>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="h-4 w-4 mr-1" /> Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{student?.email}</dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Hash className="h-4 w-4 mr-1" /> Roll Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{student?.rollNumber}</dd>
                </div>
                
                {student?.dob && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(student.dob).toLocaleDateString()}
                    </dd>
                  </div>
                )}
                
                {student?.gender && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.gender}</dd>
                  </div>
                )}
                
                {student?.fatherName && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Father's Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.fatherName}</dd>
                  </div>
                )}
                
                {student?.motherName && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Mother's Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{student.motherName}</dd>
                  </div>
                )}
                
                {student?.isFirstGraduate !== undefined && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">First Graduate</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {student.isFirstGraduate ? 'Yes' : 'No'}
                    </dd>
                  </div>
                )}
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Social Links</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex space-x-4">
                    {student?.githubLink && (
                      <a 
                        href={student.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <Github className="h-4 w-4 mr-1" /> GitHub
                      </a>
                    )}
                    
                    {student?.linkedinLink && (
                      <a 
                        href={student.linkedinLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <Linkedin className="h-4 w-4 mr-1" /> LinkedIn
                      </a>
                    )}
                    
                    {!student?.githubLink && !student?.linkedinLink && (
                      <span className="text-gray-500">No social links provided</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            
            {student?.education && (
              <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Education Details</h3>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {student.education.tenth && (
                    <Card title="10th Standard">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Institution:</span>
                          <p className="text-sm text-gray-900">{student.education.tenth.institutionName}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Duration:</span>
                          <p className="text-sm text-gray-900">{student.education.tenth.startYear} - {student.education.tenth.endYear}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Percentage:</span>
                          <p className="text-sm text-gray-900">{student.education.tenth.percentage}%</p>
                        </div>
                      </div>
                    </Card>
                  )}
                  
                  {student.education.twelfth && (
                    <Card title="12th Standard">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Institution:</span>
                          <p className="text-sm text-gray-900">{student.education.twelfth.institutionName}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Duration:</span>
                          <p className="text-sm text-gray-900">{student.education.twelfth.startYear} - {student.education.twelfth.endYear}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Percentage:</span>
                          <p className="text-sm text-gray-900">{student.education.twelfth.percentage}%</p>
                        </div>
                      </div>
                    </Card>
                  )}
                  
                  {student.education.college && (
                    <Card title="College">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Institution:</span>
                          <p className="text-sm text-gray-900">{student.education.college.institutionName}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Duration:</span>
                          <p className="text-sm text-gray-900">{student.education.college.startYear} - {student.education.college.expectedGraduationYear} (Expected)</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">CGPA:</span>
                          <p className="text-sm text-gray-900">{student.education.college.cgpa}</p>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;