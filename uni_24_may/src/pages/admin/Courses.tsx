import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Table from '../../components/shared/Table';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import { Course } from '../../types';

const CourseManagement: React.FC = () => {
  const { courses, faculty, addCourse, updateCourse, deleteCourse } = useUserContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    courseId: '',
    description: '',
    facultyId: ''
  });

  const navLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Faculty', path: '/admin/faculty' },
    { name: 'Students', path: '/admin/students' },
    { name: 'Courses', path: '/admin/courses' },
    { name: 'Assign Students', path: '/admin/assign-students' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = () => {
    setFormData({
      name: '',
      courseId: '',
      description: '',
      facultyId: ''
    });
    setIsAddModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.name,
      courseId: course.courseId,
      description: course.description,
      facultyId: course.facultyId || ''
    });
    setIsEditModalOpen(true);
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsViewModalOpen(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(courseId);
    }
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCourse: Course = {
      id: Date.now().toString(),
      name: formData.name,
      courseId: formData.courseId,
      description: formData.description,
      facultyId: formData.facultyId || undefined,
      enrolledStudents: []
    };
    
    addCourse(newCourse);
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCourse) {
      const updatedCourse: Course = {
        ...selectedCourse,
        name: formData.name,
        courseId: formData.courseId,
        description: formData.description,
        facultyId: formData.facultyId || undefined
      };
      
      updateCourse(updatedCourse);
      setIsEditModalOpen(false);
    }
  };

  const columns = [
    { header: 'Course Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Course ID', accessor: 'courseId' },
    { 
      header: 'Faculty',
      accessor: (course: Course) => {
        const assignedFaculty = faculty.find(f => f.id === course.facultyId);
        return assignedFaculty ? assignedFaculty.name : 'Not Assigned';
      }
    },
    { 
      header: 'Students Enrolled',
      accessor: (course: Course) => course.enrolledStudents.length.toString()
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Admin Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Course Management</h1>
            <Button 
              onClick={handleAddCourse}
              variant="primary"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Course
            </Button>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <Table
              columns={columns}
              data={courses}
              actions={(course) => (
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleViewCourse(course)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="text-yellow-600 hover:text-yellow-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      </main>
      
      {/* Add Course Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Course"
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
            
            <div>
              <label htmlFor="facultyId" className="block text-sm font-medium text-gray-700">
                Assign Faculty
              </label>
              <div className="mt-1">
                <select
                  id="facultyId"
                  name="facultyId"
                  value={formData.facultyId}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select faculty</option>
                  {faculty.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} - {f.department}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button
              type="submit"
              variant="primary"
              className="sm:col-start-2"
            >
              Add Course
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
            
            <div>
              <label htmlFor="edit-facultyId" className="block text-sm font-medium text-gray-700">
                Assign Faculty
              </label>
              <div className="mt-1">
                <select
                  id="edit-facultyId"
                  name="facultyId"
                  value={formData.facultyId}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select faculty</option>
                  {faculty.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} - {f.department}
                    </option>
                  ))}
                </select>
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
      
      {/* View Course Modal */}
      {selectedCourse && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Course Details"
          size="lg"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Course Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedCourse.name}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Course ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedCourse.courseId}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedCourse.description}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Assigned Faculty</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {faculty.find(f => f.id === selectedCourse.facultyId)?.name || 'Not Assigned'}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Students Enrolled</dt>
                  <dd className="mt-1 text-sm text-gray-900">{selectedCourse.enrolledStudents.length}</dd>
                </div>
              </dl>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsViewModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CourseManagement;