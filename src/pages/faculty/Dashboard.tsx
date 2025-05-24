import React from 'react';
import { Book, Users, CheckSquare, Activity } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/shared/Navbar';
import Card from '../../components/shared/Card';

const FacultyDashboard: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Faculty Portal" links={navLinks} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {currentUser?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{(currentUser as any)?.department}</p>
                <p className="text-sm text-gray-500">{(currentUser as any)?.facultyId}</p>
              </div>
              <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                {currentUser?.profilePic ? (
                  <img
                    src={currentUser.profilePic}
                    alt={currentUser.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500">
                    {currentUser?.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Book className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Assigned Courses
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {assignedCourses.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </Card>
            
            <Card className="border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Students
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {uniqueStudentIds.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </Card>
            
            <Card className="border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckSquare className="h-8 w-8 text-purple-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Attendance Rate
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        90%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </Card>
            
            <Card className="border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Sessions
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {assignedCourses.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Your Courses</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {assignedCourses.length > 0 ? (
                    assignedCourses.map((course) => (
                      <li key={course.id}>
                        <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-sm font-medium text-blue-600 truncate">
                                {course.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {course.courseId}
                              </p>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {course.enrolledStudents.length} Students
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {course.description}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>
                      <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                        No courses assigned yet
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Students</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {enrolledStudents.length > 0 ? (
                    enrolledStudents.slice(0, 5).map((student) => (
                      <li key={student.id}>
                        <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                              {student.profilePic ? (
                                <img
                                  src={student.profilePic}
                                  alt={student.name}
                                  className="h-10 w-10 object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500">
                                  {student.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                                  <p className="text-sm text-gray-500">{student.rollNumber}</p>
                                </div>
                                <p className="text-sm text-gray-500">{student.department}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>
                      <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                        No students enrolled in your courses
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;