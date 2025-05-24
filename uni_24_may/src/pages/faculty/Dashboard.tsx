import React from 'react';
import { Book, Users, CheckSquare } from 'lucide-react';
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
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back, {currentUser?.name}
          </p>
          
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                      Students
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
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Your Courses</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {assignedCourses.length > 0 ? (
                    assignedCourses.map((course) => (
                      <li key={course.id}>
                        <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-blue-600 truncate">
                              {course.name}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {course.courseId}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                {course.enrolledStudents.length} Students
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>
                      <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                        No courses assigned yet. Add courses from the Courses tab.
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Students</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {uniqueStudentIds.length > 0 ? (
                    uniqueStudentIds.slice(0, 5).map((studentId) => {
                      const student = students.find(s => s.id === studentId);
                      if (!student) return null;
                      
                      return (
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
                                  <Users className="h-6 w-6 m-2 text-gray-400" />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.rollNumber}</div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li>
                      <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                        No students enrolled in your courses yet.
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