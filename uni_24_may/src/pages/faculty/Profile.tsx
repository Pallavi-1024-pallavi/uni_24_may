import React, { useState } from 'react';
import { User, Mail, Hash, Plus, Edit, Trash2 } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Modal from '../../components/shared/Modal';
import { WorkExperience } from '../../types';

const FacultyProfile: React.FC = () => {
  const { currentUser, updateFaculty } = useUserContext();
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] = useState(false);
  const [isEditExperienceModalOpen, setIsEditExperienceModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<WorkExperience | null>(null);
  const [formData, setFormData] = useState({
    organizationName: '',
    position: '',
    startYear: '',
    endYear: ''
  });
  
  const faculty = currentUser as any;
  const experiences = faculty?.workExperience || [];

  const navLinks = [
    { name: 'Dashboard', path: '/faculty' },
    { name: 'Courses', path: '/faculty/courses' },
    { name: 'Students', path: '/faculty/students' },
    { name: 'Attendance', path: '/faculty/attendance' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExperience = () => {
    setFormData({
      organizationName: '',
      position: '',
      startYear: '',
      endYear: ''
    });
    setIsAddExperienceModalOpen(true);
  };

  const handleEditExperience = (experience: WorkExperience) => {
    setSelectedExperience(experience);
    setFormData({
      organizationName: experience.organizationName,
      position: experience.position,
      startYear: experience.startYear,
      endYear: experience.endYear
    });
    setIsEditExperienceModalOpen(true);
  };

  const handleDeleteExperience = (experienceId: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      const updatedExperiences = experiences.filter((exp: WorkExperience) => exp.id !== experienceId);
      
      const updatedFaculty = {
        ...faculty,
        workExperience: updatedExperiences
      };
      
      updateFaculty(updatedFaculty);
    }
  };

  const handleSubmitAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      ...formData
    };
    
    const updatedExperiences = [...experiences, newExperience];
    
    const updatedFaculty = {
      ...faculty,
      workExperience: updatedExperiences
    };
    
    updateFaculty(updatedFaculty);
    setIsAddExperienceModalOpen(false);
  };

  const handleSubmitEditExperience = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedExperience) {
      const updatedExperiences = experiences.map((exp: WorkExperience) =>
        exp.id === selectedExperience.id
          ? { ...exp, ...formData }
          : exp
      );
      
      const updatedFaculty = {
        ...faculty,
        workExperience: updatedExperiences
      };
      
      updateFaculty(updatedFaculty);
      setIsEditExperienceModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Faculty Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Profile</h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="border-b border-gray-200 px-4 py-6 sm:px-6 text-center">
              <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 mb-4">
                {faculty?.profilePic ? (
                  <img 
                    src={faculty.profilePic} 
                    alt={faculty.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                    <User className="h-16 w-16 text-blue-500" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{faculty?.name}</h2>
              <p className="text-sm text-gray-500">{faculty?.department}</p>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="h-4 w-4 mr-1" /> Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{faculty?.email}</dd>
                </div>
                
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Hash className="h-4 w-4 mr-1" /> Faculty ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{faculty?.facultyId}</dd>
                </div>
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="mt-1 text-sm text-gray-900">{faculty?.department}</dd>
                </div>
              </dl>
            </div>
            
            <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
                <Button 
                  onClick={handleAddExperience}
                  variant="primary"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Experience
                </Button>
              </div>
              
              {experiences.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">No work experience added yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {experiences.map((experience: WorkExperience) => (
                    <Card key={experience.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-md font-medium text-gray-900">{experience.position}</h4>
                          <p className="text-sm text-gray-600">{experience.organizationName}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {experience.startYear} - {experience.endYear}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditExperience(experience)}
                            className="p-1 rounded-full text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(experience.id)}
                            className="p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Add Experience Modal */}
      <Modal
        isOpen={isAddExperienceModalOpen}
        onClose={() => setIsAddExperienceModalOpen(false)}
        title="Add Work Experience"
        size="md"
      >
        <form onSubmit={handleSubmitAddExperience}>
          <div className="space-y-4">
            <div>
              <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="organizationName"
                  id="organizationName"
                  required
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="position"
                  id="position"
                  required
                  value={formData.position}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="startYear" className="block text-sm font-medium text-gray-700">
                  Start Year
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="startYear"
                    id="startYear"
                    required
                    value={formData.startYear}
                    onChange={handleInputChange}
                    placeholder="YYYY"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="endYear" className="block text-sm font-medium text-gray-700">
                  End Year
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="endYear"
                    id="endYear"
                    value={formData.endYear}
                    onChange={handleInputChange}
                    placeholder="YYYY or Present"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button
              type="submit"
              variant="primary"
              className="sm:col-start-2"
            >
              Add
            </Button>
            <Button
              type="button"
              variant="outline"
              className="sm:col-start-1"
              onClick={() => setIsAddExperienceModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      
      {/* Edit Experience Modal */}
      <Modal
        isOpen={isEditExperienceModalOpen}
        onClose={() => setIsEditExperienceModalOpen(false)}
        title="Edit Work Experience"
        size="md"
      >
        <form onSubmit={handleSubmitEditExperience}>
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-organizationName" className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="organizationName"
                  id="edit-organizationName"
                  required
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="edit-position" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="position"
                  id="edit-position"
                  required
                  value={formData.position}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="edit-startYear" className="block text-sm font-medium text-gray-700">
                  Start Year
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="startYear"
                    id="edit-startYear"
                    required
                    value={formData.startYear}
                    onChange={handleInputChange}
                    placeholder="YYYY"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="edit-endYear" className="block text-sm font-medium text-gray-700">
                  End Year
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="endYear"
                    id="edit-endYear"
                    value={formData.endYear}
                    onChange={handleInputChange}
                    placeholder="YYYY or Present"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button
              type="submit"
              variant="primary"
              className="sm:col-start-2"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              className="sm:col-start-1"
              onClick={() => setIsEditExperienceModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FacultyProfile;