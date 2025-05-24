import React, { useState } from 'react';
import { Book, Edit, Trash2, Plus } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';

const FacultyCourses: React.FC = () => {
  const { currentUser, courses, addCourse, updateCourse, deleteCourse } = useUserContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    courseId: '',
    description: ''
  });
  
  const facultyId = currentUser?.id || '';
  const facultyCourses = courses.filter(course => course.facultyId === facultyId);

  const navLinks = [
    { name: 'Dashboard', path: '/faculty' },
    { name: 'Courses', path: '/faculty/courses' },
    { name: 'Students', path: '/faculty/students' },
    { name: 'Attendance', path: '/faculty/attendance' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = () => {
    setFormData({ name: '', courseId: '', description: '' });
    setIsAddModalOpen(true);
  };

  const handleEditCourse = (course: any) => {
    setCurrentCourse(course);
    setFormData({
      name: course.name,
      courseId: course.courseId,
      description: course.description
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(courseId);
    }
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCourse = {
      id: Date.now().toString(),
      ...formData,
      facultyId,
      enrolledStudents: []
    };
    
    addCourse(newCourse);
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentCourse) {
      const updatedCourse = {
        ...currentCourse,
        name: formData.name,
        courseId: formData.courseId,
        description: formData.description
      };
      
      updateCourse(updatedCourse);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Faculty Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
            <Button 
              onClick={handleAddCourse}
              variant="primary"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Course
            </Button>
          </div>
          
          {facultyCourses.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Courses Yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first course</p>
              <Button 
                onClick={handleAddCourse}
                variant="primary"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Your First Course
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {facultyCourses.map(course => (
                <Card key={course.id} title={course.name}>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Course ID:</span>
                      <span className="text-sm text-gray-900">{course.courseId}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-500">Description:</span>
                      <p className="mt-1 text-sm text-gray-600">{course.description}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">
                        {course.enrolledStudents.length} Students Enrolled
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="p-1 rounded-full text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* Add Course Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Course"
        size="md"
      >
        <form onSubmit={handleSubmitAdd}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Course Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">
                Course ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="courseId"
                  id="courseId"
                  required
                  value={formData.courseId}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button
              type="submit"
              variant="primary"
              className="sm:col-start-2"
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              className="sm:col-start-1"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      
      {/* Edit Course Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Course"
        size="md"
      >
        <form onSubmit={handleSubmitEdit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                Course Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="edit-name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="edit-courseId" className="block text-sm font-medium text-gray-700">
                Course ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="courseId"
                  id="edit-courseId"
                  required
                  value={formData.courseId}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  name="description"
                  id="edit-description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
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
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FacultyCourses;