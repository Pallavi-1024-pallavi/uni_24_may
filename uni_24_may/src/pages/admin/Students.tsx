import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Upload } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Table from '../../components/shared/Table';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import { Student } from '../../types';

const StudentManagement: React.FC = () => {
  const { students, addStudent, deleteStudent } = useUserContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    department: '',
    year: '',
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

  const handleAddStudent = () => {
    setFormData({
      name: '',
      email: '',
      rollNumber: '',
      department: '',
      year: '',
      profilePic: ''
    });
    setIsAddModalOpen(true);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(studentId);
    }
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStudent: Student = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: 'student',
      rollNumber: formData.rollNumber,
      department: formData.department,
      year: formData.year,
      profilePic: formData.profilePic || undefined
    };
    
    addStudent(newStudent);
    setIsAddModalOpen(false);
  };

  const handleSubmitCsv = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse CSV data
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    
    const studentList = lines.slice(1).map(line => {
      const values = line.split(',');
      const student: any = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        role: 'student'
      };
      
      headers.forEach((header, index) => {
        const key = header.trim();
        const value = values[index]?.trim();
        
        if (key === 'id') {
          student.id = value;
        } else {
          student[key] = value;
        }
      });
      
      return student as Student;
    });
    
    // Add each student
    studentList.forEach(student => {
      addStudent(student);
    });
    
    setIsUploadModalOpen(false);
  };

  const columns = [
    { header: 'Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Email', accessor: 'email' },
    { header: 'Roll Number', accessor: 'rollNumber' },
    { header: 'Department', accessor: 'department' },
    { header: 'Year', accessor: 'year' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Admin Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Student Management</h1>
            <div className="flex space-x-3">
              <Button 
                onClick={() => setIsUploadModalOpen(true)}
                variant="outline"
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload CSV
              </Button>
              <Button 
                onClick={handleAddStudent}
                variant="primary"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Student
              </Button>
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <Table
              columns={columns}
              data={students}
              actions={(student) => (
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleViewStudent(student)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
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
      
      {/* Add Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Student"
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
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
                Roll Number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="rollNumber"
                  id="rollNumber"
                  required
                  value={formData.rollNumber}
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
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <div className="mt-1">
                <select
                  id="year"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select year</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
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
              Add Student
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
        title="Upload Student Data (CSV)"
        size="lg"
      >
        <form onSubmit={handleSubmitCsv}>
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Upload student data in CSV format. The first row should contain headers (name, email, rollNumber, department, year).
            </p>
            <textarea
              rows={10}
              value={csvData}
              onChange={handleCsvInputChange}
              placeholder="name,email,rollNumber,department,year
John Doe,john.doe@university.edu,S2023001,Computer Science,2
Jane Smith,jane.smith@university.edu,S2023002,Electrical Engineering,3"
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
      
      {/* View Student Modal */}
      {selectedStudent && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Student Profile"
          size="lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="text-center">
                <div className="mx-auto w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4">
                  {selectedStudent.profilePic ? (
                    <img
                      src={selectedStudent.profilePic}
                      alt={selectedStudent.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <span className="text-3xl text-blue-500 font-semibold">
                        {selectedStudent.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-500">{selectedStudent.rollNumber}</p>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h4 className="text-md font-medium text-gray-900 mb-2">Basic Information</h4>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedStudent.email}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Department</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedStudent.department}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Year</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedStudent.year}</dd>
                  </div>
                  {selectedStudent.dob && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(selectedStudent.dob).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                  {selectedStudent.gender && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Gender</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedStudent.gender}</dd>
                    </div>
                  )}
                </dl>
              </div>
              
              {selectedStudent.education && (
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">Education</h4>
                  <div className="space-y-4">
                    {selectedStudent.education.tenth && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700">10th Standard</h5>
                        <dl className="mt-1 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <dt className="text-xs text-gray-500">Institution</dt>
                            <dd className="text-sm text-gray-900">{selectedStudent.education.tenth.institutionName}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-xs text-gray-500">Years</dt>
                            <dd className="text-sm text-gray-900">
                              {selectedStudent.education.tenth.startYear} - {selectedStudent.education.tenth.endYear}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-xs text-gray-500">Percentage</dt>
                            <dd className="text-sm text-gray-900">{selectedStudent.education.tenth.percentage}%</dd>
                          </div>
                        </dl>
                      </div>
                    )}
                    
                    {selectedStudent.education.twelfth && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700">12th Standard</h5>
                        <dl className="mt-1 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <dt className="text-xs text-gray-500">Institution</dt>
                            <dd className="text-sm text-gray-900">{selectedStudent.education.twelfth.institutionName}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-xs text-gray-500">Years</dt>
                            <dd className="text-sm text-gray-900">
                              {selectedStudent.education.twelfth.startYear} - {selectedStudent.education.twelfth.endYear}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-xs text-gray-500">Percentage</dt>
                            <dd className="text-sm text-gray-900">{selectedStudent.education.twelfth.percentage}%</dd>
                          </div>
                        </dl>
                      </div>
                    )}
                    
                    {selectedStudent.education.college && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700">College</h5>
                        <dl className="mt-1 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <dt className="text-xs text-gray-500">Institution</dt>
                            <dd className="text-sm text-gray-900">{selectedStudent.education.college.institutionName}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-xs text-gray-500">Years</dt>
                            <dd className="text-sm text-gray-900">
                              {selectedStudent.education.college.startYear} - {selectedStudent.education.college.expectedGraduationYear} (Expected)
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-xs text-gray-500">CGPA</dt>
                            <dd className="text-sm text-gray-900">{selectedStudent.education.college.cgpa}</dd>
                          </div>
                        </dl>
                      </div>
                    )}
                  </div>
                </div>
              )}
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

export default StudentManagement;