// Mock API Client - No backend required
import {
  mockUsers,
  mockAchievements,
  mockStudents,
  mockDepartments,
  mockFaculty,
  mockAcademicRecords,
  mockPortfolios,
  mockTickets,
  type User,
  type Achievement,
  type Student,
  type Department,
  type Faculty,
  type AcademicRecord,
  type Portfolio,
  type Ticket
} from './mock-data';

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// Re-export types from mock-data
export type { User, Achievement, Student, Department, Faculty, AcademicRecord, Portfolio, Ticket };

// Utility function to simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock credentials for testing
const MOCK_CREDENTIALS = {
  student: { username: "student1", password: "password123" },
  faculty: { username: "faculty1", password: "password123" },
  admin: { username: "admin1", password: "password123" }
};

class MockApiClient {
  private token: string | null = null;
  private currentUser: User | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("currentUser");
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  }

  clearToken() {
    this.token = null;
    this.currentUser = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
    }
  }

  getToken() {
    return this.token;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // Authentication
  async login(credentials: LoginData): Promise<ApiResponse<{ token: string; message: string; user: User }>> {
    await delay();

    // Check mock credentials
    const isValidCredential = Object.values(MOCK_CREDENTIALS).some(
      cred => cred.username === credentials.username && cred.password === credentials.password
    );

    if (!isValidCredential) {
      return { error: "Invalid username or password" };
    }

    // Find user by username
    const user = mockUsers.find(u => u.username === credentials.username);
    if (!user) {
      return { error: "User not found" };
    }

    // Generate mock token
    const token = `mock_token_${Date.now()}_${user.id}`;
    
    this.setToken(token);
    this.currentUser = user;
    
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(user));
    }

    return {
      data: {
        token,
        message: "Login successful",
        user
      }
    };
  }

  async register(userData: RegisterData): Promise<ApiResponse<{ message: string }>> {
    await delay();

    // Check if username already exists
    const existingUser = mockUsers.find(u => u.username === userData.username);
    if (existingUser) {
      return { error: "Username already exists" };
    }

    // Check if email already exists
    const existingEmail = mockUsers.find(u => u.email === userData.email);
    if (existingEmail) {
      return { error: "Email already exists" };
    }

    // Simulate successful registration
    const newUser: User = {
      id: mockUsers.length + 1,
      username: userData.username,
      email: userData.email,
      first_name: "",
      last_name: "",
      role: "student"
    };

    mockUsers.push(newUser);

    return {
      data: { message: "Account created successfully" }
    };
  }

  async logout() {
    await delay(100);
    this.clearToken();
  }

  // Students
  async getStudents(): Promise<ApiResponse<Student[]>> {
    await delay();
    return { data: [...mockStudents] };
  }

  async getStudent(id: number): Promise<ApiResponse<Student>> {
    await delay();
    const student = mockStudents.find(s => s.id === id);
    if (!student) {
      return { error: "Student not found" };
    }
    return { data: student };
  }

  async createStudent(student: Partial<Student>): Promise<ApiResponse<Student>> {
    await delay();
    const newStudent: Student = {
      id: mockStudents.length + 1,
      name: student.name || "",
      roll_no: student.roll_no || "",
      email: student.email || "",
      phone: student.phone,
      year: student.year || "1st Year",
      attendance: student.attendance || 0,
      achievements_count: 0,
      department: student.department || 1,
      status: "active",
      cgpa: student.cgpa || 0,
      branch: student.branch || "Computer Science"
    };
    mockStudents.push(newStudent);
    return { data: newStudent };
  }

  async updateStudent(id: number, student: Partial<Student>): Promise<ApiResponse<Student>> {
    await delay();
    const index = mockStudents.findIndex(s => s.id === id);
    if (index === -1) {
      return { error: "Student not found" };
    }
    mockStudents[index] = { ...mockStudents[index], ...student };
    return { data: mockStudents[index] };
  }

  async deleteStudent(id: number): Promise<ApiResponse> {
    await delay();
    const index = mockStudents.findIndex(s => s.id === id);
    if (index === -1) {
      return { error: "Student not found" };
    }
    mockStudents.splice(index, 1);
    return { data: { message: "Student deleted successfully" } };
  }

  // Achievements
  async getAchievements(): Promise<ApiResponse<Achievement[]>> {
    await delay();
    return { data: [...mockAchievements] };
  }

  async getAchievement(id: number): Promise<ApiResponse<Achievement>> {
    await delay();
    const achievement = mockAchievements.find(a => a.id === id);
    if (!achievement) {
      return { error: "Achievement not found" };
    }
    return { data: achievement };
  }

  async createAchievement(achievement: Partial<Achievement>): Promise<ApiResponse<Achievement>> {
    await delay();
    const newAchievement: Achievement = {
      id: mockAchievements.length + 1,
      title: achievement.title || "",
      type: achievement.type || "",
      organization: achievement.organization || "",
      date: achievement.date || new Date().toISOString().split('T')[0],
      status: "Pending",
      description: achievement.description,
      skills: achievement.skills || [],
      feedback: undefined
    };
    mockAchievements.push(newAchievement);
    return { data: newAchievement };
  }

  async updateAchievement(id: number, achievement: Partial<Achievement>): Promise<ApiResponse<Achievement>> {
    await delay();
    const index = mockAchievements.findIndex(a => a.id === id);
    if (index === -1) {
      return { error: "Achievement not found" };
    }
    mockAchievements[index] = { ...mockAchievements[index], ...achievement };
    return { data: mockAchievements[index] };
  }

  async deleteAchievement(id: number): Promise<ApiResponse> {
    await delay();
    const index = mockAchievements.findIndex(a => a.id === id);
    if (index === -1) {
      return { error: "Achievement not found" };
    }
    mockAchievements.splice(index, 1);
    return { data: { message: "Achievement deleted successfully" } };
  }

  // Departments
  async getDepartments(): Promise<ApiResponse<Department[]>> {
    await delay();
    return { data: [...mockDepartments] };
  }

  // Faculty
  async getFaculty(): Promise<ApiResponse<Faculty[]>> {
    await delay();
    return { data: [...mockFaculty] };
  }

  // Academic Records
  async getAcademicRecords(): Promise<ApiResponse<AcademicRecord[]>> {
    await delay();
    return { data: [...mockAcademicRecords] };
  }

  // Portfolios
  async getPortfolios(): Promise<ApiResponse<Portfolio[]>> {
    await delay();
    return { data: [...mockPortfolios] };
  }

  // Tickets
  async getTickets(): Promise<ApiResponse<Ticket[]>> {
    await delay();
    return { data: [...mockTickets] };
  }

  async createTicket(ticket: Partial<Ticket>): Promise<ApiResponse<Ticket>> {
    await delay();
    const newTicket: Ticket = {
      id: mockTickets.length + 1,
      title: ticket.title || "",
      description: ticket.description || "",
      priority: ticket.priority || "Low",
      status: "Open",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: ticket.category || "General",
      assigned_to: "Support Team"
    };
    mockTickets.push(newTicket);
    return { data: newTicket };
  }

  async updateTicket(id: number, ticket: Partial<Ticket>): Promise<ApiResponse<Ticket>> {
    await delay();
    const index = mockTickets.findIndex(t => t.id === id);
    if (index === -1) {
      return { error: "Ticket not found" };
    }
    mockTickets[index] = { 
      ...mockTickets[index], 
      ...ticket, 
      updated_at: new Date().toISOString() 
    };
    return { data: mockTickets[index] };
  }
}

export const apiClient = new MockApiClient();