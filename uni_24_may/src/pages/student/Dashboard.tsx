import React from 'react';
import { BookOpen, CheckSquare, Clock } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Card from '../../components/shared/Card';

const StudentDashboard: React.FC = () => {
  const { currentUser, courses } = useUserContext();
  const studentId = currentUser?.id || '';
  
  const enrolledCourses = courses.filter(course => 
    course.enrolledStudents.includes(studentId)
  );

  // Mock data for the dashboard
  const attendancePercentage = 85;
  const assignmentCount = 5;

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
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back, {currentUser?.name}
          </p>
          
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Enrolled Courses
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {enrolledCourses.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </Card>
            
            <Card className="border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckSquare className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Attendance
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {attendancePercentage}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </Card>
            
            <Card className="border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Assignments
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {assignmentCount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {enrolledCourses.length > 0 ? (
                  enrolledCourses.map((course) => (
                    <li key={course.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {course.name}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Enrolled
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              {course.courseId}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>
                    <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                      No courses enrolled yet. Check available courses to enroll.
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;