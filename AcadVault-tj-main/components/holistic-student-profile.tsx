"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, Phone, Calendar, GraduationCap, BookOpen, Users, FileText } from "lucide-react"

interface Student {
  id: number
  name: string
  rollNo: string
  email: string
  phone: string
  year: string
  branch: string
  cgpa: number
  attendance: number
  achievements: number
  lastActive: string
  avatar: string
  status: string
  mentor: string
}

interface HolisticStudentProfileProps {
  student: Student
  onBack: () => void
}

// Mock data for detailed student profile
const mockAcademicData = {
  semesters: [
    { semester: "Semester 1", gpa: 9.1, credits: 24, subjects: 8 },
    { semester: "Semester 2", gpa: 9.3, credits: 26, subjects: 8 },
    { semester: "Semester 3", gpa: 9.0, credits: 24, subjects: 7 },
    { semester: "Semester 4", gpa: 9.4, credits: 26, subjects: 8 },
    { semester: "Semester 5", gpa: 9.2, credits: 24, subjects: 7 },
    { semester: "Semester 6", gpa: 9.1, credits: 22, subjects: 6 },
  ],
  currentSubjects: [
    { name: "Advanced Algorithms", grade: "A+", credits: 4 },
    { name: "Machine Learning", grade: "A", credits: 4 },
    { name: "Database Systems", grade: "A+", credits: 3 },
    { name: "Software Engineering", grade: "A", credits: 3 },
    { name: "Computer Networks", grade: "A+", credits: 4 },
  ],
}

const mockAchievements = [
  {
    id: 1,
    title: "Best Paper Award - IEEE Conference",
    category: "Research",
    date: "2024-01-10",
    status: "verified",
    description: "Received best paper award for research on machine learning applications",
  },
  {
    id: 2,
    title: "Google Summer of Code 2024",
    category: "Internship",
    date: "2023-12-15",
    status: "verified",
    description: "Successfully completed GSoC with Apache Kafka project",
  },
  {
    id: 3,
    title: "Hackathon Winner - TechFest 2024",
    category: "Competition",
    date: "2023-11-20",
    status: "verified",
    description: "First place in 48-hour hackathon with sustainable energy project",
  },
  {
    id: 4,
    title: "Research Publication",
    category: "Research",
    date: "2023-10-05",
    status: "pending",
    description: "Co-authored paper on quantum computing applications",
  },
]

export function HolisticStudentProfile({ student, onBack }: HolisticStudentProfileProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Student Profile</h1>
          <p className="text-muted-foreground">Holistic view of academic and co-curricular performance</p>
        </div>
      </div>

      {/* Student Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
              <AvatarFallback className="text-lg">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
                <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Roll Number:</span>
                    <span className="font-medium">{student.rollNo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Branch:</span>
                    <span className="font-medium">{student.branch}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Year:</span>
                    <span className="font-medium">{student.year}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{student.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Mentor:</span>
                    <span className="font-medium">{student.mentor}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{student.cgpa}</div>
            <div className="text-sm text-muted-foreground">Overall CGPA</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{student.attendance}%</div>
            <div className="text-sm text-muted-foreground">Attendance</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{student.achievements}</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">142</div>
            <div className="text-sm text-muted-foreground">Total Credits</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="academic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="academic">Academic Records</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Semester-wise Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Semester-wise Performance</CardTitle>
                <CardDescription>GPA trend across semesters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAcademicData.semesters.map((sem, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{sem.semester}</div>
                        <div className="text-sm text-muted-foreground">
                          {sem.subjects} subjects, {sem.credits} credits
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{sem.gpa}</div>
                        <div className="text-xs text-muted-foreground">GPA</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Subjects */}
            <Card>
              <CardHeader>
                <CardTitle>Current Semester Subjects</CardTitle>
                <CardDescription>Ongoing courses and grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAcademicData.currentSubjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{subject.name}</div>
                        <div className="text-sm text-muted-foreground">{subject.credits} credits</div>
                      </div>
                      <Badge variant={subject.grade.includes("+") ? "default" : "secondary"}>{subject.grade}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Co-curricular & Extracurricular Achievements</CardTitle>
              <CardDescription>Verified achievements and pending submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAchievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge variant="outline">{achievement.category}</Badge>
                        <Badge variant={achievement.status === "verified" ? "default" : "secondary"}>
                          {achievement.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(achievement.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Academic Performance</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Attendance Rate</span>
                    <span>{student.attendance}%</span>
                  </div>
                  <Progress value={student.attendance} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Co-curricular Engagement</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Development</span>
                    <span>89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mentorship Notes</CardTitle>
                <CardDescription>Track mentoring sessions and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <div className="font-medium text-sm">Excellent research potential</div>
                    <div className="text-xs text-muted-foreground">Jan 10, 2024</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Shows strong analytical skills and research aptitude. Recommended for advanced research projects.
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="font-medium text-sm">Career guidance session</div>
                    <div className="text-xs text-muted-foreground">Dec 15, 2023</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Discussed graduate school options and industry opportunities in AI/ML.
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="font-medium text-sm">Achievement milestone</div>
                    <div className="text-xs text-muted-foreground">Nov 20, 2023</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Successfully completed major hackathon. Shows excellent teamwork and technical skills.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
