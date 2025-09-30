// Mock data for the application
export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: "student" | "faculty" | "admin";
}

export interface Achievement {
  id: number;
  title: string;
  type: string;
  organization: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  description?: string;
  skills?: string[];
  feedback?: string;
}

export interface Student {
  id: number;
  name: string;
  roll_no: string;
  email: string;
  phone?: string;
  year: string;
  attendance: number;
  achievements_count: number;
  department?: number;
  status: string;
  cgpa?: number;
  branch?: string;
  mentor?: string;
  avatar?: string;
  lastActive?: string;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  head?: string;
}

export interface Faculty {
  id: number;
  name: string;
  email: string;
  department: string;
  specialization: string;
  experience: number;
}

export interface AcademicRecord {
  id: number;
  student_id: number;
  semester: string;
  subject: string;
  credits: number;
  grade: string;
  marks: number;
}

export interface Portfolio {
  id: number;
  student_id: number;
  title: string;
  template: string;
  created_at: string;
  updated_at: string;
  public_url?: string;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  created_at: string;
  updated_at: string;
  category: string;
  assigned_to?: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 1,
    username: "student1",
    email: "student1@university.edu",
    first_name: "John",
    last_name: "Doe",
    role: "student"
  },
  {
    id: 2,
    username: "faculty1",
    email: "faculty1@university.edu",
    first_name: "Dr. Jane",
    last_name: "Smith",
    role: "faculty"
  },
  {
    id: 3,
    username: "admin1",
    email: "admin@university.edu",
    first_name: "Admin",
    last_name: "User",
    role: "admin"
  }
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: "Web Development Workshop",
    type: "Workshop",
    organization: "Tech Club",
    date: "2024-01-15",
    status: "Approved",
    description: "Completed advanced React.js workshop covering hooks, context, and state management.",
    skills: ["React", "JavaScript", "Frontend"],
    feedback: undefined,
  },
  {
    id: 2,
    title: "Summer Internship at TechCorp",
    type: "Internship",
    organization: "TechCorp Inc.",
    date: "2024-01-10",
    status: "Pending",
    description: "Full-stack development internship working on e-commerce platform.",
    skills: ["Node.js", "MongoDB", "React"],
    feedback: undefined,
  },
  {
    id: 3,
    title: "Community Service Project",
    type: "Volunteer Work",
    organization: "Local NGO",
    date: "2024-01-08",
    status: "Rejected",
    description: "Organized coding workshops for underprivileged children.",
    skills: ["Teaching", "Leadership", "Community Service"],
    feedback: "Please provide more detailed documentation of hours served and impact metrics.",
  },
  {
    id: 4,
    title: "Hackathon Winner",
    type: "Competition",
    organization: "University Tech Fest",
    date: "2024-01-20",
    status: "Approved",
    description: "Won first place in 48-hour hackathon with innovative AI solution.",
    skills: ["Python", "Machine Learning", "API Development"],
    feedback: undefined,
  },
  {
    id: 5,
    title: "Research Paper Publication",
    type: "Research",
    organization: "IEEE Conference",
    date: "2024-02-01",
    status: "Approved",
    description: "Published research paper on blockchain applications in healthcare.",
    skills: ["Blockchain", "Research", "Healthcare Technology"],
    feedback: undefined,
  }
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    roll_no: "CS21B001",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    year: "3rd Year",
    attendance: 92,
    achievements_count: 8,
    department: 1,
    status: "active",
    cgpa: 9.2,
    branch: "Computer Science",
    mentor: "Dr. Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2024-01-15"
  },
  {
    id: 2,
    name: "Michael Chen",
    roll_no: "CS21B015",
    email: "michael.chen@university.edu",
    phone: "+1 (555) 234-5678",
    year: "3rd Year",
    attendance: 88,
    achievements_count: 5,
    department: 1,
    status: "active",
    cgpa: 8.7,
    branch: "Computer Science",
    mentor: "Dr. Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2024-01-14"
  },
  {
    id: 3,
    name: "Priya Sharma",
    roll_no: "CS21B032",
    email: "priya.sharma@university.edu",
    phone: "+1 (555) 345-6789",
    year: "3rd Year",
    attendance: 95,
    achievements_count: 12,
    department: 1,
    status: "active",
    cgpa: 9.5,
    branch: "Computer Science",
    mentor: "Dr. Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2024-01-13"
  },
  {
    id: 4,
    name: "David Wilson",
    roll_no: "CS21B008",
    email: "david.wilson@university.edu",
    phone: "+1 (555) 456-7890",
    year: "3rd Year",
    attendance: 90,
    achievements_count: 7,
    department: 1,
    status: "active",
    cgpa: 8.9,
    branch: "Computer Science",
    mentor: "Dr. Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2024-01-12"
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    roll_no: "CS21B025",
    email: "emily.rodriguez@university.edu",
    phone: "+1 (555) 567-8901",
    year: "3rd Year",
    attendance: 85,
    achievements_count: 4,
    department: 1,
    status: "inactive",
    cgpa: 8.4,
    branch: "Computer Science",
    mentor: "Dr. Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2024-01-10"
  }
];

// Mock Departments
export const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Computer Science",
    code: "CS",
    head: "Dr. John Smith"
  },
  {
    id: 2,
    name: "Electronics Engineering",
    code: "EE",
    head: "Dr. Mary Johnson"
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    code: "ME",
    head: "Dr. Robert Brown"
  }
];

// Mock Faculty
export const mockFaculty: Faculty[] = [
  {
    id: 1,
    name: "Dr. John Smith",
    email: "john.smith@university.edu",
    department: "Computer Science",
    specialization: "Artificial Intelligence",
    experience: 15
  },
  {
    id: 2,
    name: "Dr. Mary Johnson",
    email: "mary.johnson@university.edu",
    department: "Electronics Engineering",
    specialization: "VLSI Design",
    experience: 12
  },
  {
    id: 3,
    name: "Dr. Robert Brown",
    email: "robert.brown@university.edu",
    department: "Mechanical Engineering",
    specialization: "Thermodynamics",
    experience: 18
  }
];

// Mock Academic Records
export const mockAcademicRecords: AcademicRecord[] = [
  {
    id: 1,
    student_id: 1,
    semester: "Fall 2023",
    subject: "Data Structures",
    credits: 3,
    grade: "A",
    marks: 92
  },
  {
    id: 2,
    student_id: 1,
    semester: "Fall 2023",
    subject: "Computer Networks",
    credits: 3,
    grade: "A-",
    marks: 88
  },
  {
    id: 3,
    student_id: 1,
    semester: "Spring 2024",
    subject: "Database Systems",
    credits: 3,
    grade: "A+",
    marks: 96
  }
];

// Mock Portfolios
export const mockPortfolios: Portfolio[] = [
  {
    id: 1,
    student_id: 1,
    title: "Sarah Johnson - Computer Science Portfolio",
    template: "modern-professional",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-20T15:30:00Z",
    public_url: "https://portfolio.university.edu/sarah-johnson"
  },
  {
    id: 2,
    student_id: 2,
    title: "Michael Chen - Technical Portfolio",
    template: "academic",
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-01-18T12:00:00Z",
    public_url: "https://portfolio.university.edu/michael-chen"
  }
];

// Mock Support Tickets
export const mockTickets: Ticket[] = [
  {
    id: 1,
    title: "Unable to upload achievement document",
    description: "I'm getting an error when trying to upload my certificate. The file size is under 5MB and it's a PDF.",
    priority: "Medium",
    status: "Open",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    category: "Technical",
    assigned_to: "Support Team"
  },
  {
    id: 2,
    title: "Achievement status not updated",
    description: "My workshop achievement has been approved by faculty but still shows as pending in my dashboard.",
    priority: "Low",
    status: "In Progress",
    created_at: "2024-01-14T14:20:00Z",
    updated_at: "2024-01-15T09:15:00Z",
    category: "Academic",
    assigned_to: "Academic Coordinator"
  },
  {
    id: 3,
    title: "Portfolio generation failed",
    description: "When I try to generate my portfolio, the system shows an error and doesn't create the PDF.",
    priority: "High",
    status: "Resolved",
    created_at: "2024-01-13T16:45:00Z",
    updated_at: "2024-01-14T11:30:00Z",
    category: "Technical",
    assigned_to: "Technical Team"
  }
];

// Mock FAQ Data
export const mockFAQs = [
  {
    id: 1,
    category: "Achievements",
    question: "How do I submit an achievement for verification?",
    answer: "Navigate to the Achievements page, click 'Add Achievement', fill out the form with details and upload supporting documents. Your achievement will be sent to faculty for review."
  },
  {
    id: 2,
    category: "Achievements",
    question: "What types of achievements can I submit?",
    answer: "You can submit workshops, internships, competitions, certifications, volunteer work, research papers, and other academic or extracurricular activities."
  },
  {
    id: 3,
    category: "Portfolio",
    question: "How do I generate my portfolio?",
    answer: "Go to the Portfolio page, select your approved achievements, choose a template, and click 'Generate Portfolio'. You can download it as PDF or create a shareable link."
  },
  {
    id: 4,
    category: "Technical",
    question: "What file formats are supported for achievement documents?",
    answer: "We support PDF, JPG, and PNG files up to 5MB in size. Make sure your documents are clear and readable."
  },
  {
    id: 5,
    category: "Account",
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your registered email address."
  }
];