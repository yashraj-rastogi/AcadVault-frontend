"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, TrendingUp, Calendar, Award, BarChart3, Download, GraduationCap, Target, Clock } from "lucide-react"

// Mock academic data
const academicData = {
  currentSemester: "Spring 2024",
  currentCGPA: 8.5,
  totalCredits: 120,
  completedCredits: 90,
  semesters: [
    {
      id: "fall2023",
      name: "Fall 2023",
      gpa: 8.7,
      credits: 18,
      subjects: [
        { code: "CS301", name: "Data Structures & Algorithms", credits: 4, grade: "A", points: 9.0 },
        { code: "CS302", name: "Database Management Systems", credits: 3, grade: "A-", points: 8.5 },
        { code: "CS303", name: "Computer Networks", credits: 3, grade: "B+", points: 8.0 },
        { code: "MA301", name: "Discrete Mathematics", credits: 4, grade: "A", points: 9.0 },
        { code: "EN301", name: "Technical Communication", credits: 2, grade: "A", points: 9.0 },
        { code: "CS304", name: "Software Engineering Lab", credits: 2, grade: "A+", points: 10.0 },
      ],
    },
    {
      id: "spring2023",
      name: "Spring 2023",
      gpa: 8.2,
      credits: 17,
      subjects: [
        { code: "CS201", name: "Object Oriented Programming", credits: 4, grade: "A-", points: 8.5 },
        { code: "CS202", name: "Computer Organization", credits: 3, grade: "B+", points: 8.0 },
        { code: "CS203", name: "Operating Systems", credits: 3, grade: "A", points: 9.0 },
        { code: "MA201", name: "Linear Algebra", credits: 3, grade: "B", points: 7.0 },
        { code: "PH201", name: "Physics for Engineers", credits: 4, grade: "B+", points: 8.0 },
      ],
    },
    {
      id: "fall2022",
      name: "Fall 2022",
      gpa: 8.6,
      credits: 16,
      subjects: [
        { code: "CS101", name: "Programming Fundamentals", credits: 4, grade: "A", points: 9.0 },
        { code: "CS102", name: "Digital Logic Design", credits: 3, grade: "A+", points: 10.0 },
        { code: "MA101", name: "Calculus I", credits: 4, grade: "A-", points: 8.5 },
        { code: "EN101", name: "English Composition", credits: 3, grade: "B+", points: 8.0 },
        { code: "PH101", name: "Physics I", credits: 2, grade: "A", points: 9.0 },
      ],
    },
  ],
}

const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A+":
      return "bg-green-100 text-green-800 border-green-200"
    case "A":
      return "bg-green-100 text-green-700 border-green-200"
    case "A-":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "B+":
      return "bg-blue-100 text-blue-600 border-blue-200"
    case "B":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "B-":
      return "bg-yellow-100 text-yellow-600 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const getPerformanceInsight = (gpa: number) => {
  if (gpa >= 9.0) return { text: "Excellent Performance", color: "text-green-600" }
  if (gpa >= 8.0) return { text: "Good Performance", color: "text-blue-600" }
  if (gpa >= 7.0) return { text: "Satisfactory Performance", color: "text-yellow-600" }
  return { text: "Needs Improvement", color: "text-red-600" }
}

export function AcademicRecords() {
  const [selectedSemester, setSelectedSemester] = useState("all")

  const filteredSemesters =
    selectedSemester === "all"
      ? academicData.semesters
      : academicData.semesters.filter((sem) => sem.id === selectedSemester)

  const progressPercentage = (academicData.completedCredits / academicData.totalCredits) * 100
  const insight = getPerformanceInsight(academicData.currentCGPA)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground text-balance">Academic Records</h1>
          <p className="text-muted-foreground mt-1">Track your academic performance and semester-wise progress</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export Transcript
        </Button>
      </div>

      {/* Academic Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{academicData.currentCGPA}</div>
            <p className={`text-xs ${insight.color}`}>{insight.text}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {academicData.completedCredits}/{academicData.totalCredits}
            </div>
            <Progress value={progressPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{Math.round(progressPercentage)}% Complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Semester</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{academicData.currentSemester}</div>
            <p className="text-xs text-muted-foreground">Active enrollment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academic Standing</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Dean's List</div>
            <p className="text-xs text-muted-foreground">Excellent standing</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="semesters" className="space-y-4">
        <TabsList>
          <TabsTrigger value="semesters">Semester Records</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          <TabsTrigger value="goals">Academic Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="semesters" className="space-y-4">
          {/* Semester Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Filter by Semester:</label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    {academicData.semesters.map((semester) => (
                      <SelectItem key={semester.id} value={semester.id}>
                        {semester.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Semester Records */}
          <div className="space-y-6">
            {filteredSemesters.map((semester) => (
              <Card key={semester.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        {semester.name}
                      </CardTitle>
                      <CardDescription>
                        {semester.credits} Credits • GPA: {semester.gpa}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-card-foreground border-primary">
                      GPA: {semester.gpa}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-4 font-medium text-foreground">Course Code</th>
                          <th className="text-left py-2 px-4 font-medium text-foreground">Course Name</th>
                          <th className="text-center py-2 px-4 font-medium text-foreground">Credits</th>
                          <th className="text-center py-2 px-4 font-medium text-foreground">Grade</th>
                          <th className="text-center py-2 px-4 font-medium text-foreground">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.subjects.map((subject, index) => (
                          <tr key={index} className="border-b border-border/50">
                            <td className="py-3 px-4 font-mono text-sm">{subject.code}</td>
                            <td className="py-3 px-4">{subject.name}</td>
                            <td className="py-3 px-4 text-center">{subject.credits}</td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className={getGradeColor(subject.grade)}>
                                {subject.grade}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center font-medium">{subject.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  GPA Trend
                </CardTitle>
                <CardDescription>Semester-wise GPA performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {academicData.semesters.reverse().map((semester, index) => (
                    <div key={semester.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{semester.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(semester.gpa / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{semester.gpa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Overall academic statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Highest Semester GPA</span>
                  <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                    8.7
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total A+ Grades</span>
                  <Badge variant="secondary">2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total A Grades</span>
                  <Badge variant="secondary">6</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Subjects Completed</span>
                  <Badge variant="secondary">16</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Academic Goals
                </CardTitle>
                <CardDescription>Set and track your academic objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Maintain CGPA above 8.5</h4>
                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                      On Track
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Current: 8.5 | Target: 8.5+</p>
                  <Progress value={100} className="h-2" />
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Complete 120 Credits</h4>
                    <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
                      In Progress
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Completed: 90/120 Credits</p>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Dean's List Recognition</h4>
                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                      Achieved
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Achieved in Fall 2023 semester</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Milestones
                </CardTitle>
                <CardDescription>Important academic deadlines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-1">Spring 2024 Final Exams</h4>
                  <p className="text-sm text-muted-foreground">May 15-22, 2024</p>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-1">Summer Internship Application</h4>
                  <p className="text-sm text-muted-foreground">Deadline: March 30, 2024</p>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-1">Graduation Requirements Review</h4>
                  <p className="text-sm text-muted-foreground">Fall 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
