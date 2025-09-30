"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Calendar, Building, Tag, Upload, CheckCircle, Clock, XCircle, Eye } from "lucide-react"
import { apiClient, type Achievement } from "@/lib/api"
import { toast } from "sonner"




const activityTypes = ["Workshop", "Internship", "Volunteer Work", "Certification", "Competition", "Project"]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Approved":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "Pending":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "Rejected":
      return <XCircle className="h-4 w-4 text-red-600" />
    default:
      return null
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

export function AchievementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      const response = await apiClient.getAchievements()
      if (response.data) {
        setAchievements(response.data)
      } else {
        toast.error("Failed to load achievements")
      }
      setLoading(false)
    }
    fetchAchievements()
  }, [])

  const filteredAchievements = achievements.filter((achievement) => {
    const matchesSearch =
      achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || achievement.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || achievement.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading achievements...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground text-balance">Achievements</h1>
          <p className="text-muted-foreground mt-1">Manage your academic and extracurricular achievements</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Achievement</DialogTitle>
              <DialogDescription>Submit a new achievement for faculty review and verification.</DialogDescription>
            </DialogHeader>
            <AddAchievementForm onClose={() => setIsAddModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search achievements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {activityTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements List */}
      <div className="space-y-4">
        {filteredAchievements.map((achievement) => (
          <Card key={achievement.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(achievement.status)}
                    <h3 className="text-lg font-semibold text-foreground">{achievement.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {achievement.organization}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-foreground mb-3">{achievement.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <div className="flex gap-1 flex-wrap">
                      {achievement.skills && achievement.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {achievement.feedback && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-3">
                      <p className="text-sm text-red-800">
                        <strong>Feedback:</strong> {achievement.feedback}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{achievement.type}</Badge>
                  {getStatusBadge(achievement.status)}
                  {achievement.feedback && (
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Eye className="h-3 w-3" />
                      View Feedback
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AddAchievementForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    organization: "",
    date: "",
    description: "",
    skills: "",
    evidenceUrl: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(Boolean)
      const response = await apiClient.createAchievement({
        title: formData.title,
        type: formData.type,
        organization: formData.organization,
        date: formData.date,
        description: formData.description,
        skills: skillsArray
      })
      
      if (response.data) {
        toast.success("Achievement submitted successfully!")
        onClose()
        // Refresh the page to show new achievement
        window.location.reload()
      } else {
        toast.error(response.error || "Failed to submit achievement")
      }
    } catch (error) {
      toast.error("Failed to submit achievement")
    }
    
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Achievement Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Web Development Workshop"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Activity Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {activityTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="organization">Organization *</Label>
          <Input
            id="organization"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            placeholder="e.g., Tech Club, Company Name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date of Completion *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your key takeaways and what you accomplished..."
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills & Tags</Label>
        <Input
          id="skills"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          placeholder="e.g., React, Leadership, Python (comma-separated)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="evidence">Evidence (File Upload)</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Upload certificates, photos, or documents (PDF, JPG, PNG)
          </p>
          <Button type="button" variant="outline" size="sm">
            Choose Files
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="evidenceUrl">Evidence URL</Label>
        <Input
          id="evidenceUrl"
          value={formData.evidenceUrl}
          onChange={(e) => setFormData({ ...formData, evidenceUrl: e.target.value })}
          placeholder="https://example.com/certificate"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit for Review"}
        </Button>
      </div>
    </form>
  )
}
