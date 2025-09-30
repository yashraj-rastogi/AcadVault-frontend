"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, CheckCircle, XCircle, FileText, ImageIcon, Download, Eye } from "lucide-react"

interface Evidence {
  type: "pdf" | "image"
  name: string
  url: string
}

interface Submission {
  id: number
  studentName: string
  rollNo: string
  achievement: string
  category: string
  submittedAt: string
  description: string
  evidence: Evidence[]
  status: string
  priority: string
}

interface VerificationDetailViewProps {
  submission: Submission
  onBack: () => void
  onApprove: (id: number) => void
  onReject: (id: number, comment: string) => void
}

export function VerificationDetailView({ submission, onBack, onApprove, onReject }: VerificationDetailViewProps) {
  const [rejectComment, setRejectComment] = useState("")
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleReject = () => {
    if (rejectComment.trim()) {
      onReject(submission.id, rejectComment)
      setShowRejectDialog(false)
      setRejectComment("")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Queue
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Achievement Verification</h1>
          <p className="text-muted-foreground">Review submission details and evidence</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student & Achievement Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    {submission.studentName}
                    <Badge variant="secondary">{submission.rollNo}</Badge>
                    {submission.priority === "high" && <Badge variant="destructive">High Priority</Badge>}
                  </CardTitle>
                  <CardDescription>Submitted on {formatDate(submission.submittedAt)}</CardDescription>
                </div>
                <Badge variant="outline" className="text-sm">
                  {submission.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold text-foreground mb-3">{submission.achievement}</h3>
              <p className="text-muted-foreground leading-relaxed">{submission.description}</p>
            </CardContent>
          </Card>

          {/* Evidence Files */}
          <Card>
            <CardHeader>
              <CardTitle>Evidence Files</CardTitle>
              <CardDescription>Click on any file to view or download</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {submission.evidence.map((evidence, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      {evidence.type === "pdf" ? (
                        <FileText className="h-8 w-8 text-red-600" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-blue-600" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">{evidence.name}</p>
                        <p className="text-xs text-muted-foreground uppercase">{evidence.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedEvidence(evidence)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Actions</CardTitle>
              <CardDescription>Review the evidence and make your decision</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={() => onApprove(submission.id)}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Achievement
              </Button>

              <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Achievement
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reject Achievement</DialogTitle>
                    <DialogDescription>
                      Please provide feedback to help the student understand why this submission was rejected.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Explain why this achievement cannot be verified. Be specific and constructive..."
                      value={rejectComment}
                      onChange={(e) => setRejectComment(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleReject} disabled={!rejectComment.trim()}>
                      Reject with Feedback
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Submission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Student:</span>
                <span className="font-medium">{submission.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Roll Number:</span>
                <span className="font-medium">{submission.rollNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{submission.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Evidence Files:</span>
                <span className="font-medium">{submission.evidence.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Priority:</span>
                <Badge variant={submission.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                  {submission.priority}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Evidence Viewer Dialog */}
      {selectedEvidence && (
        <Dialog open={!!selectedEvidence} onOpenChange={() => setSelectedEvidence(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedEvidence.type === "pdf" ? <FileText className="h-5 w-5" /> : <ImageIcon className="h-5 w-5" />}
                {selectedEvidence.name}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto">
              {selectedEvidence.type === "image" ? (
                <img
                  src={selectedEvidence.url || "/placeholder.svg"}
                  alt={selectedEvidence.name}
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <div className="bg-muted rounded-lg p-8 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">PDF Viewer</p>
                  <p className="text-sm text-muted-foreground mb-4">{selectedEvidence.name}</p>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
