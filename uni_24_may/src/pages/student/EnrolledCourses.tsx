import React from 'react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Card from '../../components/shared/Card';

const EnrolledCourses: React.FC = () => {
  const { currentUser, courses, faculty } = useUserContext();
  const studentId = currentUser?.id || '';
  
  const enrolledCourses = courses.filter(course => 
    course.enrolledStudents.includes(studentId)
  );

  const getFacultyName = (facultyId?: string) => {
    if (!facultyId) return 'Not Assigned';
    const facultyMember = faculty.find(f => f.id === facultyId);
    return facultyMember ? facultyMember.name : 'Not Assigned';
  };

  const navLinks = [
    { name: 'Dashboard', path: '/student' },
    { name: 'Available Courses', path: '/student/available-courses' },
    { name: 'Enrolled Courses', path: '/student/enrolled-courses' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Student Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Enrolled Courses</h1>
          <p className="mt-1 text-sm text-gray-600">
            Courses you are currently enrolled in
          </p>
          
          {enrolledCourses.length === 0 ? (
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
              <p className="text-gray-500">You are not enrolled in any courses yet.</p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <Card key={course.id} title={course.name}>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Course ID:</span>
                      <span className="text-sm text-gray-900">{course.courseId}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Description:</span>
                      <p className="mt-1 text-sm text-gray-600">{course.description}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Faculty:</span>
                      <p className="mt-1 text-sm text-gray-600">{getFacultyName(course.facultyId)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">
                        Students: {course.enrolledStudents.length}
                      </span>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Enrolled
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EnrolledCourses;