"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Eye, Mail, Phone, GraduationCap, Award, TrendingUp } from "lucide-react"
import { HolisticStudentProfile } from "@/components/holistic-student-profile"
import { apiClient, type Student } from "@/lib/api"
import { toast } from "sonner"

export function StudentList() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterYear, setFilterYear] = useState("all")
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await apiClient.getStudents()
      if (response.data) {
        setStudents(response.data)
      } else {
        toast.error("Failed to load students")
      }
      setLoading(false)
    }
    fetchStudents()
  }, [])

  const filteredStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesYear = filterYear === "all" || student.year.includes(filterYear)
      return matchesSearch && matchesYear
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "rollNo") {
        return a.roll_no.localeCompare(b.roll_no)
      } else if (sortBy === "cgpa") {
        return (b.cgpa || 0) - (a.cgpa || 0)
      } else if (sortBy === "achievements") {
        return b.achievements_count - a.achievements_count
      }
      return 0
    })

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading students...</p>
          </div>
        </div>
      </div>
    )
  }

  if (selectedStudent) {
    // Adapter to convert our Student type to the type expected by HolisticStudentProfile
    const adaptedStudent = {
      ...selectedStudent,
      rollNo: selectedStudent.roll_no,
      achievements: selectedStudent.achievements_count,
      phone: selectedStudent.phone || "",
      branch: selectedStudent.branch || "Computer Science",
      cgpa: selectedStudent.cgpa || 0,
      lastActive: selectedStudent.lastActive || new Date().toISOString().split('T')[0],
      avatar: selectedStudent.avatar || "/placeholder.svg",
      mentor: selectedStudent.mentor || "Dr. Smith",
      status: "active" as const
    }
    return <HolisticStudentProfile student={adaptedStudent} onBack={() => setSelectedStudent(null)} />
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground mt-1">Manage and mentor your assigned students</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {filteredStudents.length} Students
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, roll number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="rollNo">Sort by Roll No</SelectItem>
                  <SelectItem value="cgpa">Sort by CGPA</SelectItem>
                  <SelectItem value="achievements">Sort by Achievements</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1st">1st Year</SelectItem>
                  <SelectItem value="2nd">2nd Year</SelectItem>
                  <SelectItem value="3rd">3rd Year</SelectItem>
                  <SelectItem value="4th">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card
            key={student.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.roll_no}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={student.status === "active" ? "default" : "secondary"} className="text-xs">
                      {student.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{student.year}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">CGPA</span>
                  </div>
                  <span className="font-medium">{student.cgpa}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Attendance</span>
                  </div>
                  <span className="font-medium">{student.attendance}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Achievements</span>
                  </div>
                  <span className="font-medium">{student.achievements_count}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="h-3 w-3 mr-1" />
                  View Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
