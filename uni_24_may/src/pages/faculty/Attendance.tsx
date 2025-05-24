import React, { useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const FacultyAttendance: React.FC = () => {
  const { currentUser, courses, students } = useUserContext();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  
  const facultyId = currentUser?.id || '';
  const assignedCourses = courses.filter(course => course.facultyId === facultyId);

  const navLinks = [
    { name: 'Dashboard', path: '/faculty' },
    { name: 'Courses', path: '/faculty/courses' },
    { name: 'Students', path: '/faculty/students' },
    { name: 'Attendance', path: '/faculty/attendance' }
  ];

  const handleCourseChange = (courseId: string) => {
    setSelectedCourse(courseId);
    // Reset attendance when course changes
    setAttendance({});
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    // Reset attendance when date changes
    setAttendance({});
  };

  const toggleAttendance = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleSubmit = () => {
    // Here you would typically save the attendance data
    console.log('Attendance Data:', {
      courseId: selectedCourse,
      date: selectedDate,
      attendance
    });
    
    alert('Attendance saved successfully!');
  };

  const getEnrolledStudents = () => {
    const course = courses.find(c => c.id === selectedCourse);
    if (!course) return [];
    return students.filter(student => course.enrolledStudents.includes(student.id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Faculty Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Attendance</h1>
          <p className="mt-1 text-sm text-gray-600">
            Mark attendance for your courses
          </p>
          
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                Select Course
              </label>
              <select
                id="course"
                value={selectedCourse}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select a course</option>
                {assignedCourses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.courseId})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              />
            </div>
          </div>
          
          {selectedCourse && (
            <div className="mt-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {getEnrolledStudents().map(student => (
                    <li key={student.id}>
                      <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                            {student.profilePic ? (
                              <img
                                src={student.profilePic}
                                alt={student.name}
                                className="h-10 w-10 object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-500">
                                {student.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.rollNumber}</div>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => toggleAttendance(student.id)}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              attendance[student.id]
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {attendance[student.id] ? 'Present' : 'Absent'}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={!selectedCourse || !selectedDate}
                >
                  Save Attendance
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FacultyAttendance;