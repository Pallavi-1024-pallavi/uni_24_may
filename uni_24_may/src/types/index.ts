export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  profilePic?: string;
}

export interface Student extends User {
  role: 'student';
  rollNumber: string;
  department: string;
  year: string;
  dob?: string;
  gender?: 'Female' | 'Male' | 'Others';
  fatherName?: string;
  motherName?: string;
  isFirstGraduate?: boolean;
  githubLink?: string;
  linkedinLink?: string;
  education?: {
    tenth?: Education;
    twelfth?: Education;
    college?: CollegeEducation;
  };
}

export interface Faculty extends User {
  role: 'faculty';
  facultyId: string;
  department: string;
  workExperience?: WorkExperience[];
}

export interface Admin extends User {
  role: 'admin';
}

export interface Education {
  institutionName: string;
  startYear: string;
  endYear: string;
  percentage: string;
}

export interface CollegeEducation {
  institutionName: string;
  startYear: string;
  expectedGraduationYear: string;
  cgpa: string;
}

export interface WorkExperience {
  id: string;
  organizationName: string;
  position: string;
  startYear: string;
  endYear: string;
}

export interface Course {
  id: string;
  name: string;
  courseId: string;
  description: string;
  facultyId?: string;
  enrolledStudents: string[];
}