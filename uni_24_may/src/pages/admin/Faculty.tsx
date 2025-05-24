import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Upload } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Table from '../../components/shared/Table';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import { Faculty } from '../../types';

const FacultyManagement: React.FC = () => {
  const { faculty, addFaculty, deleteFaculty } = useUserContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    facultyId: '',
    department: '',
    profilePic: ''
  });
  const [csvData, setCsvData] = useState('');
  
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

  const handleCsvInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCsvData(e.target.value);
  };

  const handleAddFaculty = () => {
    setFormData({
      name: '',
      email: '',
      facultyId: '',
      department: '',
      profilePic: ''
    });
    setIsAddModalOpen(true);
  };

  const handleViewFaculty = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setIsViewModalOpen(true);
  };

  const handleDeleteFaculty = (facultyId: string) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      deleteFaculty(facultyId);
    }
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFaculty: Faculty = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: 'faculty',
      facultyId: formData.facultyId,
      department: formData.department,
      profilePic: formData.profilePic || undefined
    };
    
    addFaculty(newFaculty);
    setIsAddModalOpen(false);
  };

  const handleSubmitCsv = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse CSV data
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    
    const facultyList = lines.slice(1).map(line => {
      const values = line.split(',');
      const faculty: any = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        role: 'faculty'
      };
      
      headers.forEach((header, index) => {
        const key = header.trim();
        const value = values[index]?.trim();
        
        if (key === 'id') {
          faculty.id = value;
        } else {
          faculty[key] = value;
        }
      });
      
      return faculty as Faculty;
    });
    
    // Add each faculty
    facultyList.forEach(faculty => {
      addFaculty(faculty);
    });
    
    setIsUploadModalOpen(false);
  };

  const columns = [
    { header: 'Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Email', accessor: 'email' },
    { header: 'Faculty ID', accessor: 'facultyId' },
    { header: 'Department', accessor: 'department' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Admin Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Faculty Management</h1>
            <div className="flex space-x-3">
              <Button 
                onClick={() => setIsUploadModalOpen(true)}
                variant="outline"
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload CSV
              </Button>
              <Button 
                onClick={handleAddFaculty}
                variant="primary"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Faculty
              </Button>
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <Table
              columns={columns}
              data={faculty}
              actions={(faculty) => (
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleViewFaculty(faculty)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteFaculty(faculty.id)}
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
      
      {/* Add Faculty Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Faculty"
        size="md"
      >
        <form onSubmit={handleSubmitAdd}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="facultyId" className="block text-sm font-medium text-gray-700">
                Faculty ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="facultyId"
                  id="facultyId"
                  required
                  value={formData.facultyId}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <div className="mt-1">
                <select
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Physics">Physics</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
                Profile Picture URL (optional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="profilePic"
                  id="profilePic"
                  value={formData.profilePic}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
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
              Add Faculty
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
      
      {/* Upload CSV Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Faculty Data (CSV)"
        size="lg"
      >
        <form onSubmit={handleSubmitCsv}>
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Upload faculty data in CSV format. The first row should contain headers (name, email, facultyId, department).
            </p>
            <textarea
              rows={10}
              value={csvData}
              onChange={handleCsvInputChange}
              placeholder="name,email,facultyId,department
Dr. John Doe,john.doe@university.edu,F101,Computer Science
Dr. Jane Smith,jane.smith@university.edu,F102,Electrical Engineering"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button
              type="submit"
              variant="primary"
              className="sm:col-start-2"
              disabled={!csvData.trim()}
            >
              Upload Data
            </Button>
            <Button
              type="button"
              variant="outline"
              className="sm:col-start-1"
              onClick={() => setIsUploadModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      
      {/* View Faculty Modal */}
      {selectedFaculty && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Faculty Profile"
          size="lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="text-center">
                <div className="mx-auto w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4">
                  {selectedFaculty.profilePic ? (
                    <img
                      src={selectedFaculty.profilePic}
                      alt={selectedFaculty.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <span className="text-3xl text-blue-500 font-semibold">
                        {selectedFaculty.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{selectedFaculty.name}</h3>
                <p className="text-sm text-gray-500">{selectedFaculty.facultyId}</p>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h4 className="text-md font-medium text-gray-900 mb-2">Basic Information</h4>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedFaculty.email}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Department</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedFaculty.department}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">Work Experience</h4>
                {selectedFaculty.workExperience && selectedFaculty.workExperience.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {selectedFaculty.workExperience.map((exp) => (
                      <li key={exp.id} className="py-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{exp.position}</p>
                            <p className="text-sm text-gray-500">{exp.organizationName}</p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {exp.startYear} - {exp.endYear}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No work experience added yet.</p>
                )}
              </div>
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

export default FacultyManagement;