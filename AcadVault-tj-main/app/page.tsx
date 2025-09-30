import Link from "next/link"
import { GraduationCap, Users, BookOpen, Award, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">AcadVault</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Your comprehensive academic achievement platform for students, faculty, and administrators
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/auth/login">Login to Your Portal</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Student Portal</CardTitle>
              <CardDescription className="text-base">
                Manage achievements, build portfolios, and track your academic journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>Submit and track achievements</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Build professional portfolios</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>View academic records</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/student">Enter Student Portal</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Faculty Portal</CardTitle>
              <CardDescription className="text-base">
                Verify achievements, mentor students, and manage academic oversight
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>Verify student achievements</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Manage mentee profiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Data-driven mentorship</span>
                </div>
              </div>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/faculty">Enter Faculty Portal</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription className="text-base">
                Manage users, generate reports, and oversee institutional operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Manage all users</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Generate NAAC/NIRF reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Institutional oversight</span>
                </div>
              </div>
              <Button asChild variant="destructive" className="w-full">
                <Link href="/admin">Enter Admin Portal</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
