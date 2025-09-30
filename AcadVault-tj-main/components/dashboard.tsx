"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, BookOpen, Award } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { apiClient, Achievement } from "@/lib/api"
import { toast } from "sonner"

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Approved":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "Pending":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "Rejected":
      return <XCircle className="h-4 w-4 text-red-600" />
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />
  }
}

const getStatusBadge = (status: string) => {
  const variants = {
    Approved: "bg-green-100 text-green-800 border-green-200",
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <Badge variant="outline" className={variants[status as keyof typeof variants]}>
      {status}
    </Badge>
  )
}

export function Dashboard() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      const response = await apiClient.getAchievements()
      if (response.error) {
        toast.error("Failed to load achievements")
        setAchievements([])
      } else if (response.data) {
        setAchievements(response.data)
      }
      setLoading(false)
    }

    fetchAchievements()
  }, [])

  const approvedCount = achievements.filter((a) => a.status === "Approved").length
  const pendingCount = achievements.filter((a) => a.status === "Pending").length

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">Welcome back, Student!</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              Track your academic journey and build your professional portfolio
            </p>
          </div>
        </div>
        <Button className="gap-2 text-sm md:text-base">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Activity</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Academic Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-card-foreground">8.5/10</div>
            <p className="text-xs text-muted-foreground">Current CGPA</p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Approved Activities</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-green-600">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Verified achievements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Portfolio Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-card-foreground">92%</div>
            <p className="text-xs text-muted-foreground">Completeness rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <BookOpen className="h-5 w-5" />
            Recent Activity Timeline
          </CardTitle>
          <CardDescription className="text-sm">Your latest submissions and their approval status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-4 text-sm text-muted-foreground">Loading achievements...</div>
            ) : achievements.length === 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No achievements found. Start by adding your first achievement!
              </div>
            ) : (
              achievements.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                    {getStatusIcon(activity.status)}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-foreground text-sm md:text-base truncate">{activity.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {activity.organization} • {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                    <Badge variant="secondary" className="text-xs">
                      {activity.type}
                    </Badge>
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
