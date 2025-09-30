import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Users, TrendingUp, AlertCircle, Eye } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Mock data for demonstration
const pendingVerifications = 12
const recentSubmissions = [
  {
    id: 1,
    studentName: "Sarah Johnson",
    rollNo: "CS21B001",
    achievement: "Best Paper Award - IEEE Conference",
    submittedAt: "2 hours ago",
    category: "Research",
    status: "pending",
  },
  {
    id: 2,
    studentName: "Michael Chen",
    rollNo: "CS21B015",
    achievement: "Hackathon Winner - TechFest 2024",
    submittedAt: "5 hours ago",
    category: "Competition",
    status: "pending",
  },
  {
    id: 3,
    studentName: "Priya Sharma",
    rollNo: "CS21B032",
    achievement: "Google Summer of Code",
    submittedAt: "1 day ago",
    category: "Internship",
    status: "pending",
  },
  {
    id: 4,
    studentName: "David Wilson",
    rollNo: "CS21B008",
    achievement: "Published Research Paper",
    submittedAt: "2 days ago",
    category: "Research",
    status: "verified",
  },
]

const stats = [
  {
    title: "Pending Verifications",
    value: pendingVerifications,
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    href: "/faculty/verify",
  },
  {
    title: "Total Students",
    value: 45,
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/faculty/students",
  },
  {
    title: "Verified This Month",
    value: 28,
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Average Response Time",
    value: "2.3 days",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

export function FacultyDashboard() {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Faculty Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              Welcome back! Here's an overview of your mentorship activities.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-lg md:text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 md:p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 md:h-6 md:w-6 ${stat.color}`} />
                </div>
              </div>
              {stat.href && (
                <Button asChild variant="ghost" size="sm" className="mt-3 p-0 h-auto text-xs md:text-sm">
                  <Link href={stat.href}>View Details →</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Verifications Alert */}
      {pendingVerifications > 0 && (
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 text-sm md:text-base">
                  {pendingVerifications} achievements awaiting verification
                </h3>
                <p className="text-xs md:text-sm text-orange-700 mt-1">
                  Students are waiting for your review. Quick verification helps maintain engagement.
                </p>
              </div>
              <Button asChild size="sm" className="w-full sm:w-auto">
                <Link href="/faculty/verify">Review Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Submissions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg md:text-xl">Recent Submissions</CardTitle>
              <CardDescription className="text-sm">Latest achievement submissions from your mentees</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/faculty/verify">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-medium text-foreground text-sm md:text-base">{submission.studentName}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {submission.rollNo}
                    </Badge>
                    <Badge variant={submission.status === "verified" ? "default" : "secondary"} className="text-xs">
                      {submission.status}
                    </Badge>
                  </div>
                  <p className="text-sm md:text-base text-foreground font-medium truncate">{submission.achievement}</p>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Category: {submission.category}</span>
                    <span>Submitted: {submission.submittedAt}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                  <Eye className="h-4 w-4 mr-2" />
                  Review
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
