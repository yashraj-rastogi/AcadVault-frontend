"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Search, Filter, Eye, FileText } from "lucide-react"
import { VerificationDetailView } from "@/components/verification-detail-view"

// Mock data for demonstration
const mockSubmissions = [
  {
    id: 1,
    studentName: "Sarah Johnson",
    rollNo: "CS21B001",
    achievement: "Best Paper Award - IEEE Conference on Machine Learning",
    category: "Research",
    submittedAt: "2024-01-15T10:30:00Z",
    description:
      "Received the Best Paper Award at the IEEE International Conference on Machine Learning for research on 'Advanced Neural Network Architectures for Computer Vision'.",
    evidence: [
      { type: "pdf", name: "award_certificate.pdf", url: "/ieee-award-certificate.jpg" },
      { type: "image", name: "conference_photo.jpg", url: "/conference-award-ceremony-photo.jpg" },
      { type: "pdf", name: "research_paper.pdf", url: "/research-paper-document.jpg" },
    ],
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    studentName: "Michael Chen",
    rollNo: "CS21B015",
    achievement: "Hackathon Winner - TechFest 2024",
    category: "Competition",
    submittedAt: "2024-01-14T15:45:00Z",
    description:
      "Won first place in the 48-hour hackathon at TechFest 2024 with a team project on sustainable energy management system.",
    evidence: [
      { type: "image", name: "winner_certificate.jpg", url: "/hackathon-winner-certificate.jpg" },
      { type: "pdf", name: "project_presentation.pdf", url: "/hackathon-presentation.png" },
    ],
    status: "pending",
    priority: "medium",
  },
  {
    id: 3,
    studentName: "Priya Sharma",
    rollNo: "CS21B032",
    achievement: "Google Summer of Code 2024",
    category: "Internship",
    submittedAt: "2024-01-13T09:20:00Z",
    description:
      "Successfully completed Google Summer of Code 2024, contributing to the Apache Kafka project with significant code contributions.",
    evidence: [
      { type: "pdf", name: "gsoc_certificate.pdf", url: "/google-summer-of-code-certificate.jpg" },
      { type: "image", name: "project_screenshot.png", url: "/code-contribution-screenshot.jpg" },
    ],
    status: "pending",
    priority: "high",
  },
  {
    id: 4,
    studentName: "David Wilson",
    rollNo: "CS21B008",
    achievement: "Published Research Paper in Nature Communications",
    category: "Research",
    submittedAt: "2024-01-12T14:10:00Z",
    description:
      "Co-authored a research paper published in Nature Communications on quantum computing applications in cryptography.",
    evidence: [
      { type: "pdf", name: "published_paper.pdf", url: "/nature-communications-research-paper.jpg" },
      { type: "image", name: "publication_proof.jpg", url: "/journal-publication-proof.jpg" },
    ],
    status: "verified",
    priority: "high",
  },
]

export function VerificationQueue() {
  const [selectedSubmission, setSelectedSubmission] = useState<(typeof mockSubmissions)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredSubmissions = mockSubmissions
    .filter((submission) => {
      const matchesSearch =
        submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.achievement.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || submission.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      } else if (sortBy === "name") {
        return a.studentName.localeCompare(b.studentName)
      }
      return 0
    })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (selectedSubmission) {
    return (
      <VerificationDetailView
        submission={selectedSubmission}
        onBack={() => setSelectedSubmission(null)}
        onApprove={(id) => {
          console.log("Approved submission:", id)
          setSelectedSubmission(null)
        }}
        onReject={(id, comment) => {
          console.log("Rejected submission:", id, "with comment:", comment)
          setSelectedSubmission(null)
        }}
      />
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Achievement Verification</h1>
          <p className="text-muted-foreground mt-1">Review and verify student achievement submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {filteredSubmissions.filter((s) => s.status === "pending").length} Pending
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
                  placeholder="Search by student name, roll number, or achievement..."
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
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <Card
            key={submission.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedSubmission(submission)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{submission.studentName}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {submission.rollNo}
                    </Badge>
                    <Badge
                      variant={
                        submission.status === "verified"
                          ? "default"
                          : submission.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {submission.status}
                    </Badge>
                    {submission.priority === "high" && (
                      <Badge variant="destructive" className="text-xs">
                        High Priority
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-2">{submission.achievement}</h4>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{submission.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(submission.submittedAt)}</span>
                    </div>
                    <span>Category: {submission.category}</span>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{submission.evidence.length} evidence files</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No submissions found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "All caught up! No pending verifications at the moment."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
