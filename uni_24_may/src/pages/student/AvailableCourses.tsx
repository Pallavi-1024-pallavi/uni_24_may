import React from 'react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const AvailableCourses: React.FC = () => {
  const { currentUser, courses, enrollStudent } = useUserContext();
  const studentId = currentUser?.id || '';
  
  const availableCourses = courses.filter(course => 
    !course.enrolledStudents.includes(studentId)
  );

  const handleEnroll = (courseId: string) => {
    enrollStudent(courseId, studentId);
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
          <h1 className="text-2xl font-semibold text-gray-900">Available Courses</h1>
          <p className="mt-1 text-sm text-gray-600">
            Browse and enroll in available courses
          </p>
          
          {availableCourses.length === 0 ? (
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
              <p className="text-gray-500">No available courses found. Check back later.</p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {availableCourses.map((course) => (
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
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">
                        Students: {course.enrolledStudents.length}
                      </span>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEnroll(course.id)}
                      >
                        Enroll
                      </Button>
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

export default AvailableCourses;