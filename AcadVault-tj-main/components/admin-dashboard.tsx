"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, Award, TrendingUp, FileText, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminSidebar } from "@/components/admin-sidebar"

export function AdminDashboard() {
  const [metrics] = useState({
    totalStudents: 2847,
    totalFaculty: 156,
    totalAchievements: 8934,
    pendingVerifications: 23,
    monthlyGrowth: 12.5,
    engagementRate: 87.3,
  })

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Institutional overview and management center</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalStudents.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+{metrics.monthlyGrowth}% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalFaculty}</div>
                <p className="text-xs text-muted-foreground">Active mentors and verifiers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalAchievements.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Verified student achievements</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.engagementRate}%</div>
                <p className="text-xs text-muted-foreground">Monthly active users</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full justify-start">
                  <Link href="/admin/users">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/admin/reports">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Reports
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/admin/users?action=add">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New User
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system health and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending Verifications</span>
                  <span className="text-sm font-medium text-orange-600">{metrics.pendingVerifications} items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Health</span>
                  <span className="text-sm font-medium text-green-600">All systems operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Backup</span>
                  <span className="text-sm font-medium text-green-600">Last backup: 2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage Usage</span>
                  <span className="text-sm font-medium">67% of 1TB</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New student registration</p>
                    <p className="text-xs text-muted-foreground">Sarah Johnson joined Computer Science</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Achievement verified</p>
                    <p className="text-xs text-muted-foreground">Dr. Smith verified IEEE paper publication</p>
                  </div>
                  <span className="text-xs text-muted-foreground">15 min ago</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Report generated</p>
                    <p className="text-xs text-muted-foreground">NAAC accreditation report for Q4 2024</p>
                  </div>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Bulk user import</p>
                    <p className="text-xs text-muted-foreground">45 new faculty members added via CSV</p>
                  </div>
                  <span className="text-xs text-muted-foreground">3 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
