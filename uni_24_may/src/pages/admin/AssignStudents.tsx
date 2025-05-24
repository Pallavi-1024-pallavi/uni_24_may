import React, { useState, useMemo } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Button from '../../components/shared/Button';

const AssignStudents: React.FC = () => {
  const { faculty, students, courses, updateCourse } = useUserContext();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const navLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Faculty', path: '/admin/faculty' },
    { name: 'Students', path: '/admin/students' },
    { name: 'Courses', path: '/admin/courses' },
    { name: 'Assign Students', path: '/admin/assign-students' }
  ];

  const departments = useMemo(() => {
    const depts = new Set([...faculty.map(f => f.department), ...students.map(s => s.department)]);
    return Array.from(depts).sort();
  }, [faculty, students]);

  const filteredCourses = useMemo(() => {
    if (!selectedDepartment) return [];
    return courses.filter(course => {
      const courseFaculty = faculty.find(f => f.id === course.facultyId);
      return courseFaculty?.department === selectedDepartment;
    });
  }, [selectedDepartment, courses, faculty]);

  const filteredStudents = useMemo(() => {
    if (!selectedDepartment) return [];
    return students.filter(student => student.department === selectedDepartment);
  }, [selectedDepartment, students]);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
    setSelectedCourse('');
    setSelectedStudents([]);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
    setSelectedStudents([]);
  };

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        if (prev.length >= 30) {
          alert('Maximum 30 students can be assigned to a course');
          return prev;
        }
        return [...prev, studentId];
      }
    });
  };

  const handleSelectAll = () => {
    const availableStudents = filteredStudents
      .filter(student => !courses.find(c => c.id === selectedCourse)?.enrolledStudents.includes(student.id))
      .slice(0, 30)
      .map(student => student.id);
    setSelectedStudents(availableStudents);
  };

  const handleDeselectAll = () => {
    setSelectedStudents([]);
  };

  const handleAssignStudents = () => {
    if (!selectedCourse || selectedStudents.length === 0) return;
    
    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return;
    
    const updatedCourse = {
      ...course,
      enrolledStudents: [...new Set([...course.enrolledStudents, ...selectedStudents])]
    };
    
    updateCourse(updatedCourse);
    alert('Students assigned successfully!');
    setSelectedStudents([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Admin Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Assign Students</h1>
          <p className="mt-1 text-sm text-gray-600">
            Assign students to courses based on department
          </p>
          
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Select Department
              </label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select a department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                Select Course
              </label>
              <select
                id="course"
                value={selectedCourse}
                onChange={handleCourseChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                disabled={!selectedDepartment}
              >
                <option value="">Select a course</option>
                {filteredCourses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.courseId})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {selectedCourse && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Students</h2>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeselectAll}
                  >
                    Deselect All
                  </Button>
                </div>
              </div>
              
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredStudents.map(student => {
                    const isEnrolled = courses.find(c => c.id === selectedCourse)?.enrolledStudents.includes(student.id);
                    const isSelected = selectedStudents.includes(student.id);
                    
                    return (
                      <li key={student.id}>
                        <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleStudentToggle(student.id)}
                              disabled={isEnrolled}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{student.name}</p>
                              <p className="text-sm text-gray-500">{student.rollNumber}</p>
                            </div>
                          </div>
                          {isEnrolled && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Already Enrolled
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleAssignStudents}
                  disabled={selectedStudents.length === 0}
                >
                  Assign Selected Students ({selectedStudents.length})
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AssignStudents;