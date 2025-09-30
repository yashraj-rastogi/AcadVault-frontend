"use client"

import { useState } from "react"
import { FileText, Download, BarChart3, PieChart, TrendingUp, Users, Award, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AdminSidebar } from "@/components/admin-sidebar"

export function ReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedYear, setSelectedYear] = useState("2024")

  const handleGenerateReport = async (template: string) => {
    setIsGenerating(true)
    setSelectedTemplate(template)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsGenerating(false)
    setSelectedTemplate("")
  }

  const prebuiltTemplates = [
    {
      id: "naac",
      name: "NAAC Accreditation Report",
      description: "Comprehensive report for NAAC accreditation criteria",
      icon: Building,
      criteria: ["Student Performance", "Faculty Qualifications", "Infrastructure", "Research Output"],
      estimatedTime: "5-10 minutes",
    },
    {
      id: "nirf",
      name: "NIRF Ranking Report",
      description: "National Institutional Ranking Framework report",
      icon: Award,
      criteria: [
        "Teaching & Learning",
        "Research & Professional Practice",
        "Graduation Outcomes",
        "Outreach & Inclusivity",
      ],
      estimatedTime: "8-15 minutes",
    },
    {
      id: "annual",
      name: "Annual Performance Report",
      description: "Yearly institutional performance summary",
      icon: TrendingUp,
      criteria: ["Student Achievements", "Faculty Performance", "Department Growth", "Overall Metrics"],
      estimatedTime: "3-7 minutes",
    },
  ]

  const customFilters = [
    {
      label: "Department",
      value: selectedDepartment,
      options: ["all", "Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"],
    },
    { label: "Academic Year", value: selectedYear, options: ["2024", "2023", "2022", "2021"] },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-2">Generate institutional reports for accreditation and analysis</p>
          </div>

          <Tabs defaultValue="templates" className="space-y-6">
            <TabsList>
              <TabsTrigger value="templates">Pre-built Templates</TabsTrigger>
              <TabsTrigger value="custom">Custom Report Builder</TabsTrigger>
              <TabsTrigger value="analytics">Data Visualization</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid gap-6">
                {prebuiltTemplates.map((template) => (
                  <Card key={template.id} className="relative">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <template.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{template.name}</CardTitle>
                            <CardDescription className="mt-1">{template.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">{template.estimatedTime}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Included Criteria:</h4>
                          <div className="flex flex-wrap gap-2">
                            {template.criteria.map((criterion) => (
                              <Badge key={criterion} variant="secondary">
                                {criterion}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <div className="text-sm text-muted-foreground">Last generated: 2 days ago</div>
                          <Button onClick={() => handleGenerateReport(template.id)} disabled={isGenerating}>
                            {isGenerating && selectedTemplate === template.id ? (
                              <>Generating...</>
                            ) : (
                              <>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Report
                              </>
                            )}
                          </Button>
                        </div>

                        {isGenerating && selectedTemplate === template.id && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Generating report...</span>
                              <span>67%</span>
                            </div>
                            <Progress value={67} className="h-2" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Report Builder</CardTitle>
                  <CardDescription>Create custom reports with specific filters and criteria</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="ee">Electrical Engineering</SelectItem>
                          <SelectItem value="me">Mechanical Engineering</SelectItem>
                          <SelectItem value="ce">Civil Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Academic Year</Label>
                      <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Activity Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Activities</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="extracurricular">Extracurricular</SelectItem>
                          <SelectItem value="competitions">Competitions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <DatePickerWithRange />
                  </div>

                  <div className="space-y-2">
                    <Label>Export Format</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Excel
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        CSV
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" disabled={isGenerating}>
                      {isGenerating ? "Generating Custom Report..." : "Generate Custom Report"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Achievement Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Academic Achievements</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Research Publications</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <Progress value={30} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Competitions</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Department Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Computer Science</span>
                        <Badge>Excellent</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Electrical Engineering</span>
                        <Badge variant="secondary">Good</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Mechanical Engineering</span>
                        <Badge variant="secondary">Good</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Civil Engineering</span>
                        <Badge variant="outline">Average</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Monthly Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-green-600">+12.5%</div>
                      <p className="text-sm text-muted-foreground">
                        Achievement submissions increased compared to last month
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>New Students</span>
                          <span className="text-green-600">+8.3%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Verified Achievements</span>
                          <span className="text-green-600">+15.7%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Faculty Engagement</span>
                          <span className="text-green-600">+6.2%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Engagement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold">87.3%</div>
                      <p className="text-sm text-muted-foreground">Monthly active users across all portals</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Student Portal</span>
                          <span>92.1%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Faculty Portal</span>
                          <span>78.5%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Admin Portal</span>
                          <span>95.2%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
