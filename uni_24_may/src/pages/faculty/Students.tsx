import React from 'react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Table from '../../components/shared/Table';

const FacultyStudents: React.FC = () => {
  const { currentUser, courses, students } = useUserContext();
  const facultyId = currentUser?.id || '';
  
  // Get courses assigned to this faculty
  const assignedCourses = courses.filter(course => course.facultyId === facultyId);
  
  // Get all students enrolled in the faculty's courses
  const enrolledStudentIds = assignedCourses.flatMap(course => course.enrolledStudents);
  const uniqueStudentIds = [...new Set(enrolledStudentIds)];
  const enrolledStudents = students.filter(student => uniqueStudentIds.includes(student.id));

  const navLinks = [
    { name: 'Dashboard', path: '/faculty' },
    { name: 'Courses', path: '/faculty/courses' },
    { name: 'Students', path: '/faculty/students' },
    { name: 'Attendance', path: '/faculty/attendance' }
  ];

  const columns = [
    { header: 'Name', accessor: 'name', className: 'font-medium text-gray-900' },
    { header: 'Roll Number', accessor: 'rollNumber' },
    { header: 'Email', accessor: 'email' },
    { header: 'Department', accessor: 'department' },
    { header: 'Year', accessor: 'year' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Faculty Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Students</h1>
          <p className="mt-1 text-sm text-gray-600">
            Students enrolled in your courses
          </p>
          
          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <Table
              columns={columns}
              data={enrolledStudents}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyStudents;