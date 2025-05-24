import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Student, Faculty, Admin, Course } from '../types';
import { mockStudents, mockFaculty, mockAdmin, mockCourses } from '../utils/mockData';

interface UserContextType {
  currentUser: User | null;
  students: Student[];
  faculty: Faculty[];
  admins: Admin[];
  courses: Course[];
  setCurrentUser: (user: User | null) => void;
  updateStudent: (student: Student) => void;
  updateFaculty: (faculty: Faculty) => void;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  enrollStudent: (courseId: string, studentId: string) => void;
  addFaculty: (faculty: Faculty) => void;
  addStudent: (student: Student) => void;
  deleteStudent: (studentId: string) => void;
  deleteFaculty: (facultyId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [faculty, setFaculty] = useState<Faculty[]>(mockFaculty);
  const [admins] = useState<Admin[]>(mockAdmin);
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    
    if (currentUser && currentUser.id === updatedStudent.id) {
      setCurrentUser(updatedStudent);
    }
  };

  const updateFaculty = (updatedFaculty: Faculty) => {
    setFaculty(prev => 
      prev.map(faculty => 
        faculty.id === updatedFaculty.id ? updatedFaculty : faculty
      )
    );
    
    if (currentUser && currentUser.id === updatedFaculty.id) {
      setCurrentUser(updatedFaculty);
    }
  };

  const addCourse = (course: Course) => {
    setCourses(prev => [...prev, course]);
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(course => course.id !== courseId));
  };

  const enrollStudent = (courseId: string, studentId: string) => {
    setCourses(prev => 
      prev.map(course => {
        if (course.id === courseId && !course.enrolledStudents.includes(studentId)) {
          return {
            ...course,
            enrolledStudents: [...course.enrolledStudents, studentId]
          };
        }
        return course;
      })
    );
  };

  const addFaculty = (newFaculty: Faculty) => {
    setFaculty(prev => [...prev, newFaculty]);
  };

  const addStudent = (newStudent: Student) => {
    setStudents(prev => [...prev, newStudent]);
  };

  const deleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(student => student.id !== studentId));
    
    // Remove student from all enrolled courses
    setCourses(prev => 
      prev.map(course => ({
        ...course,
        enrolledStudents: course.enrolledStudents.filter(id => id !== studentId)
      }))
    );
  };

  const deleteFaculty = (facultyId: string) => {
    setFaculty(prev => prev.filter(faculty => faculty.id !== facultyId));
    
    // Remove faculty from assigned courses
    setCourses(prev => 
      prev.map(course => ({
        ...course,
        facultyId: course.facultyId === facultyId ? undefined : course.facultyId
      }))
    );
  };

  return (
    <UserContext.Provider 
      value={{ 
        currentUser, 
        students, 
        faculty, 
        admins, 
        courses,
        setCurrentUser, 
        updateStudent, 
        updateFaculty, 
        addCourse, 
        updateCourse, 
        deleteCourse, 
        enrollStudent,
        addFaculty,
        addStudent,
        deleteStudent,
        deleteFaculty
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};