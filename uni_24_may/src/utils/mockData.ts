import { Student, Faculty, Admin, Course } from '../types';

// Mock Students
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    role: 'student',
    rollNumber: 'S2023001',
    department: 'Computer Science',
    year: '2',
    profilePic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    dob: '2000-05-15',
    gender: 'Male',
    fatherName: 'Robert Johnson',
    motherName: 'Sarah Johnson',
    isFirstGraduate: false,
    githubLink: 'https://github.com/alexj',
    linkedinLink: 'https://linkedin.com/in/alexj',
    education: {
      tenth: {
        institutionName: 'City High School',
        startYear: '2015',
        endYear: '2016',
        percentage: '92'
      },
      twelfth: {
        institutionName: 'City Senior Secondary',
        startYear: '2017',
        endYear: '2018',
        percentage: '88'
      },
      college: {
        institutionName: 'University of Technology',
        startYear: '2019',
        expectedGraduationYear: '2023',
        cgpa: '8.5'
      }
    }
  },
  {
    id: '2',
    name: 'Samantha Lee',
    email: 'samantha.lee@university.edu',
    role: 'student',
    rollNumber: 'S2023002',
    department: 'Electrical Engineering',
    year: '3',
    profilePic: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    name: 'David Kim',
    email: 'david.kim@university.edu',
    role: 'student',
    rollNumber: 'S2023003',
    department: 'Mechanical Engineering',
    year: '1',
    profilePic: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
  }
];

// Mock Faculty
export const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Emily Watson',
    email: 'emily.watson@university.edu',
    role: 'faculty',
    facultyId: 'F001',
    department: 'Computer Science',
    profilePic: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
    workExperience: [
      {
        id: '1',
        organizationName: 'Tech Institute',
        position: 'Assistant Professor',
        startYear: '2015',
        endYear: '2018'
      },
      {
        id: '2',
        organizationName: 'University of Technology',
        position: 'Associate Professor',
        startYear: '2018',
        endYear: 'Present'
      }
    ]
  },
  {
    id: '2',
    name: 'Prof. James Miller',
    email: 'james.miller@university.edu',
    role: 'faculty',
    facultyId: 'F002',
    department: 'Electrical Engineering',
    profilePic: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
  }
];

// Mock Admin
export const mockAdmin: Admin[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@university.edu',
    role: 'admin',
    profilePic: 'https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=600',
  }
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    courseId: 'CS101',
    description: 'Fundamental concepts of programming and computer science',
    facultyId: '1',
    enrolledStudents: ['1']
  },
  {
    id: '2',
    name: 'Data Structures and Algorithms',
    courseId: 'CS201',
    description: 'Advanced data structures and algorithm design',
    facultyId: '1',
    enrolledStudents: ['1', '2']
  },
  {
    id: '3',
    name: 'Circuit Theory',
    courseId: 'EE101',
    description: 'Fundamentals of electrical circuits',
    facultyId: '2',
    enrolledStudents: ['2']
  }
];

export const mockUsers = [...mockStudents, ...mockFaculty, ...mockAdmin];