"use client"

import { useState } from "react"
import { jsPDF } from "jspdf" // Used for client-side PDF generation (will be migrated to backend)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    FileText,
    Download,
    Share2,
    Eye,
    Palette,
    CheckCircle,
    Calendar,
    Building,
    Award,
    Trophy,
    GraduationCap,
    User,
    Mail,
    Phone,
    Star,
    X,
} from "lucide-react"

// --- 1. INTERFACE DEFINITIONS ---
// Define data structures for type safety.
interface StudentProfile {
    name: string;
    rollNumber: string;
    email: string;
    phone: string;
    profileImage: string | null;
    bio: string;
}

interface Education {
    id: number;
    degree: string;
    institution: string;
    year: string;
    grade: string;
    specialization?: string;
}

interface Achievement {
    id: number;
    title: string;
    type: string;
    organization: string;
    date: string;
    description: string;
    skills: string[];
    technologies?: string[];
    category?: string;
    impact?: string;
    contributions?: string;
}

interface Skill {
    name: string;
    level: string;
    category: string;
}

interface Certification {
    id: number;
    name: string;
    issuer: string;
    date: string;
    credentialId: string;
}

// --- 2. MOCK DATA (Global Definition - for immediate demo purposes) ---
// TODO: Backend Integration - These mock variables should be replaced with data fetched from your API endpoint (e.g., /api/v1/student/data/profileId)

const studentProfile: StudentProfile = {
    name: "Vaibhav Mishra",
    rollNumber: "BTCS20250123",
    email: "vaibhav@example.com",
    phone: "+91-9876543210",
    profileImage: null,
    bio: "Passionate Computer Science student with expertise in full-stack development and AI research.",
}

const education: Education[] = [
    { id: 1, degree: "B.Tech Computer Science", institution: "AKTU Lucknow", year: "2021-2025", grade: "8.6 CGPA", specialization: "Artificial Intelligence & Machine Learning" },
    { id: 2, degree: "XII (Science)", institution: "DAV Public School", year: "2021", grade: "92.4%" }
]

const approvedAchievements: Achievement[] = [
    { id: 1, title: "AcadVault EdTech Platform", type: "Project", organization: "Smart India Hackathon", date: "2024-03-01", description: "Full-stack educational technology system with AI-powered features for enhanced learning experience.", skills: ["React", "Django", "PostgreSQL", "AI/ML"], technologies: ["React", "Django", "PostgreSQL", "AI/ML"] },
    { id: 2, title: "Best Presenter Award", type: "Competition", organization: "Government of India", date: "2024-02-15", description: "Outstanding presentation on EdTech innovation solutions at national level competition.", skills: ["Presentation", "Innovation", "Leadership"], category: "National Level" },
    { id: 3, title: "Research Paper Publication", type: "Research", organization: "IEEE Conference", date: "2024-01-23", description: "Transformer Models in Educational Technology: A Comprehensive Study published in IEEE conference.", skills: ["Research", "AI", "Academic Writing"], impact: "Cited by 15+ papers" },
    { id: 4, title: "Open Source Contributor", type: "Workshop", organization: "GitHub", date: "2023-ongoing", description: "Active contributor to React ecosystem with 500+ GitHub contributions across multiple projects.", skills: ["React", "Open Source", "Collaboration"], contributions: "15+ repositories" },
]

const skills: Skill[] = [
    { name: "React.js", level: "Advanced", category: "Frontend" },
    { name: "Next.js", level: "Intermediate", category: "Frontend" },
    { name: "Django", level: "Advanced", category: "Backend" },
    { name: "Python", level: "Expert", category: "Programming" },
    { name: "Machine Learning", level: "Intermediate", category: "AI/ML" },
    { name: "PostgreSQL", level: "Intermediate", category: "Database" },
    { name: "Public Speaking", level: "Advanced", category: "Soft Skills" },
    { name: "Leadership", level: "Advanced", category: "Soft Skills" }
]

const certifications: Certification[] = [
    { id: 1, name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2024-01-15", credentialId: "ABC123XYZ" },
    { id: 2, name: "Google AI/ML Certificate", issuer: "Google", date: "2023-11-20", credentialId: "GOOGLE456" }
]


const portfolioTemplates = [
    {
        id: "tech",
        name: "Technology Professional",
        description: "Clean, modern design perfect for tech professionals and developers",
        preview: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=400&q=80",
        color: "#2563eb",
        secondaryColor: "#3b82f6",
        accentColor: "#1e40af",
        frame: "modern",
        font: "helvetica",
    },
    {
        id: "research",
        name: "Academic Excellence",
        description: "Traditional academic layout for research professionals and scholars",
        preview: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&w=400&q=80",
        color: "#1f2937",
        secondaryColor: "#374151",
        accentColor: "#111827",
        frame: "classic",
        font: "times",
    },
    {
        id: "engineering",
        name: "Engineering Excellence",
        description: "Structured design emphasizing technical expertise and achievements",
        preview: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
        color: "#0f766e",
        secondaryColor: "#14b8a6",
        accentColor: "#0d9488",
        frame: "structured",
        font: "courier",
    },
    {
        id: "creative",
        name: "Creative Showcase",
        description: "Dynamic design highlighting projects and creative achievements",
        preview: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?fit=crop&w=400&q=80",
        color: "#dc2626",
        secondaryColor: "#ef4444",
        accentColor: "#b91c1c",
        frame: "artistic",
        font: "helvetica",
    },
]

const getTypeIcon = (type: string) => {
    switch (type) {
        case "Workshop":
            return <GraduationCap className="h-4 w-4" />
        case "Certification":
            return <Award className="h-4 w-4" />
        case "Competition":
            return <Trophy className="h-4 w-4" />
        case "Research":
            return <FileText className="h-4 w-4" />
        case "Project":
            return <Star className="h-4 w-4" />
        default:
            return <CheckCircle className="h-4 w-4" />
    }
}

// --- NEW COMPONENT: SHARE LINK MODAL ---
const ShareLinkModal = ({ link, onClose }: { link: string, onClose: () => void }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        // Use document.execCommand('copy') for better compatibility in iFrames (Canvas environment)
        const tempInput = document.createElement('textarea');
        tempInput.value = link;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        setIsCopied(true);
        // Reset copy status after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleOpen = () => {
        // Open the Data URI in a new tab
        window.open(link, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex justify-center items-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Share2 className="h-5 w-5 text-blue-600" /> Share Portfolio Link
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                        <X className="h-6 w-6" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CardDescription className="pb-2">
                        Your temporary public link has been generated. Copy it below to share the PDF view instantly.
                        <div className="text-xs text-red-500 mt-1 font-semibold">
                             (Note: This link is a large Data URI and is only guaranteed to work reliably for this session. A backend implementation is needed for permanent, shareable URLs.)
                        </div>
                    </CardDescription>

                    <div className="flex space-x-2">
                        <input
                            type="text"
                            // Display truncated link for readability, but copy the full link
                            value={'Link Ready... (Large Data URI)'} 
                            readOnly
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm overflow-hidden whitespace-nowrap text-ellipsis"
                        />
                        <Button onClick={handleCopy} disabled={isCopied} className="shrink-0 w-32 gap-1 bg-blue-600 hover:bg-blue-700 text-white">
                            {isCopied ? <CheckCircle className="h-4 w-4" /> : <Download className="h-4 w-4 rotate-90" />} 
                            {isCopied ? 'Link Copied!' : 'Copy Link'}
                        </Button>
                    </div>

                    <Separator />
                    
                    <Button onClick={handleOpen} className="w-full gap-2" variant="outline">
                        <Eye className="h-4 w-4" /> Open Portfolio in Browser
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

// --- 3. FULL PREVIEW MODAL COMPONENT ---

const FullPreviewModal = ({ selectedTemplate, selectedAchievements, selectedSkills, onClose }: {
    selectedTemplate: string;
    selectedAchievements: number[];
    selectedSkills: string[];
    onClose: () => void;
}) => {
    // Data is accessed globally now
    const template = portfolioTemplates.find(t => t.id === selectedTemplate)
    const achievementsList = approvedAchievements.filter(a => selectedAchievements.includes(a.id))
    const skillsList = skills.filter(s => selectedSkills.includes(s.name))

    let sectionOrder: string[] = []
    switch (template?.id) {
        case "tech":
            sectionOrder = ["education", "skills", "projects", "certifications"]
            break
        case "research":
            sectionOrder = ["education", "research", "certifications", "skills"]
            break
        case "engineering":
            sectionOrder = ["skills", "education", "projects", "certifications"]
            break
        case "creative":
            sectionOrder = ["education", "projects", "skills", "certifications"]
            break
        default:
            sectionOrder = ["education", "skills", "projects", "certifications"]
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Portfolio Preview - {template?.name}</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 relative">
                    <div style={{ fontFamily: template?.font || "helvetica" }}>
                        {/* Header */}
                        <div className="relative p-6 text-white rounded-t-lg" style={{ backgroundColor: template?.color }}>
                            <h1 className="text-3xl font-bold">{studentProfile.name}</h1>
                            <p className="text-lg mt-1">{studentProfile.bio}</p>
                            <div className="text-sm mt-2">
                                <p>Email: {studentProfile.email} | Phone: {studentProfile.phone} | Roll No: {studentProfile.rollNumber}</p>
                            </div>
                        </div>

                        {/* Content Sections */}
                        <div className="mt-8 space-y-8">
                            {sectionOrder.map(section => {
                                // --- EDUCATION SECTION ---
                                if (section === "education") {
                                    return (
                                        <div key="education">
                                            <h2 className="text-xl font-bold border-b-2 pb-1" style={{ borderColor: template?.color, color: template?.color }}>EDUCATION</h2>
                                            <div className="mt-4 space-y-4">
                                                {education.map(edu => (
                                                    <div key={edu.id}>
                                                        <h3 className="text-lg font-semibold">{edu.degree} | {edu.grade}</h3>
                                                        <p className="text-sm text-gray-600">{edu.institution} ({edu.year})</p>
                                                        {edu.specialization && <p className="text-sm italic mt-1" style={{ color: template?.color }}>Specialization: {edu.specialization}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }

                                // --- SKILLS SECTION ---
                                if (section === "skills") {
                                    const skillCategories = skillsList.reduce((acc: any, skill: Skill) => {
                                        if (!acc[skill.category]) acc[skill.category] = []
                                        acc[skill.category].push(skill)
                                        return acc
                                    }, {})

                                    return (
                                        <div key="skills">
                                            <h2 className="text-xl font-bold border-b-2 pb-1" style={{ borderColor: template?.color, color: template?.color }}>CORE COMPETENCIES</h2>
                                            <div className="mt-4 space-y-4">
                                                {Object.entries(skillCategories).map(([category, categorySkills]: [string, any]) => (
                                                    <div key={category}>
                                                        <h3 className="text-lg font-semibold" style={{ color: template?.color }}>{category}</h3>
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {categorySkills.map((skill: Skill) => (
                                                                <Badge key={skill.name} variant="secondary" className="text-sm px-3 py-1">
                                                                    {skill.name} <span className="text-xs ml-1 opacity-70">({skill.level})</span>
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }

                                // --- PROJECTS / RESEARCH SECTION ---
                                if (section === "projects" || section === "research") {
                                    const sectionTitle = section === "research" ? "RESEARCH & PUBLICATIONS" : "PROJECTS & EXPERIENCE"
                                    const filteredAchievements = section === "research"
                                        ? achievementsList.filter(a => a.type === "Research")
                                        : achievementsList.filter(a => ["Project", "Workshop", "Competition"].includes(a.type))

                                    return (
                                        <div key="projects-research">
                                            <h2 className="text-xl font-bold border-b-2 pb-1" style={{ borderColor: template?.color, color: template?.color }}>{sectionTitle}</h2>
                                            <div className="mt-4 space-y-4">
                                                {filteredAchievements.map(achievement => (
                                                    <div key={achievement.id}>
                                                        <h3 className="text-lg font-semibold" style={{ color: template?.color }}>{achievement.title}</h3>
                                                        <p className="text-sm text-gray-700 italic mt-1">{achievement.description}</p>
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {achievement.skills.map((skill) => (
                                                                <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                                                            ))}
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {achievement.organization} | {new Date(achievement.date).toLocaleDateString()}
                                                            {achievement.technologies && ` | Tech: ${achievement.technologies.join(", ")}`}
                                                            {achievement.impact && ` | ${achievement.impact}`}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }

                                // --- CERTIFICATIONS SECTION ---
                                if (section === "certifications") {
                                    if (certifications.length === 0) return null
                                    return (
                                        <div key="certifications">
                                            <h2 className="text-xl font-bold border-b-2 pb-1" style={{ borderColor: template?.color, color: template?.color }}>CERTIFICATIONS</h2>
                                            <div className="mt-4 space-y-4">
                                                {certifications.map(cert => (
                                                    <div key={cert.id}>
                                                        <h3 className="text-lg font-semibold text-gray-800">{cert.name}</h3>
                                                        <p className="text-sm text-gray-600 italic">{cert.issuer} | {cert.date} | ID: {cert.credentialId}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }

                                return null
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- 4. MAIN PORTFOLIO GENERATOR COMPONENT ---
// Reverted to a simple functional component consuming global data (like the original code)
export function PortfolioGenerator() {
    const [selectedTemplate, setSelectedTemplate] = useState("tech")
    // Initialize state using the globally defined arrays directly
    const [selectedAchievements, setSelectedAchievements] = useState<number[]>(approvedAchievements.slice(0, 3).map(a => a.id))
    const [selectedSkills, setSelectedSkills] = useState(skills.map(s => s.name))
    const [isGenerating, setIsGenerating] = useState(false)
    const [showPreviewModal, setShowPreviewModal] = useState(false)
    // New states for share link modal
    const [shareLink, setShareLink] = useState<string>('');
    const [showShareModal, setShowShareModal] = useState(false);

    const handleAchievementToggle = (achievementId: number) => {
        setSelectedAchievements((prev) =>
            prev.includes(achievementId) ? prev.filter((id) => id !== achievementId) : [...prev, achievementId],
        )
    }

    const handleSkillToggle = (skillName: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skillName) ? prev.filter((name) => name !== skillName) : [...prev, skillName],
        )
    }

    // Helper function to create the PDF document object (used by both PDF download and Link generation)
    const createPdfDocument = () => {
        const template = portfolioTemplates.find(t => t.id === selectedTemplate)!
        const primaryColor = template.color
        const doc = new jsPDF('p', 'mm', 'a4')
        const pageWidth = 210
        let y = 25

        doc.setFillColor(primaryColor)
        doc.rect(0, 0, pageWidth, 45, 'F')

        if (template.frame === "modern") {
            doc.setFillColor(template.secondaryColor)
            doc.circle(pageWidth - 20, 20, 15, 'F')
            doc.setFillColor(template.accentColor)
            doc.rect(0, 40, pageWidth, 5, 'F')
        } else if (template.frame === "artistic") {
            doc.setFillColor(template.secondaryColor)
            doc.ellipse(30, 25, 25, 15, 'F')
            doc.setFillColor(template.accentColor)
            doc.rect(pageWidth - 40, 10, 20, 20, 'F')
        }

        doc.setFont(template.font || "helvetica", "bold")
        doc.setFontSize(28)
        doc.setTextColor(255, 255, 255)
        doc.text(studentProfile.name, 20, 25)
        doc.setFontSize(14)
        doc.setFont(template.font || "helvetica", "normal")
        doc.text(studentProfile.bio, 20, 33)

        doc.setFontSize(10)
        doc.text(
            `Email: ${studentProfile.email} | Phone: ${studentProfile.phone} | Roll No: ${studentProfile.rollNumber}`,
            20, 40
        )

        y = 60

        const selectedAchievementsList = approvedAchievements.filter(a => selectedAchievements.includes(a.id))
        const selectedSkillsList = skills.filter(s => selectedSkills.includes(s.name))

        let sectionOrder: string[] = []
        switch (template.id) {
            case "tech":
                sectionOrder = ["education", "skills", "projects", "certifications"]
                break
            case "research":
                sectionOrder = ["education", "research", "certifications", "skills"]
                break
            case "engineering":
                sectionOrder = ["skills", "education", "projects", "certifications"]
                break
            case "creative":
                sectionOrder = ["education", "projects", "skills", "certifications"]
                break
            default:
                sectionOrder = ["education", "skills", "projects", "certifications"]
        }

        sectionOrder.forEach(section => {
            y = addSection(doc, template, section, y, selectedAchievementsList, selectedSkillsList)
        })

        y += 10
        doc.setFontSize(10)
        doc.setTextColor(primaryColor)
        doc.text("Generated by AcadVault Portfolio Generator", 105, 290, { align: "center" })

        doc.setDrawColor(primaryColor)
        doc.setLineWidth(0.7)
        doc.rect(10, 10, 190, 277, 'S')

        return doc;
    }


    // Helper function for PDF generation
    const addSection = (doc: jsPDF, template: any, sectionType: string, y: number, achievementsList: any[], skillsList: any[]) => {
        const { color: primaryColor, font } = template
        if (y > 250) return y

        if (sectionType === "education") {
            doc.setFontSize(16)
            doc.setTextColor(primaryColor)
            doc.text("EDUCATION", 20, y)
            y += 8
            doc.setDrawColor(primaryColor)
            doc.setLineWidth(0.3)
            doc.line(20, y - 5, 190, y - 5)
            y += 2
            education.forEach(edu => {
                doc.setFontSize(12)
                doc.setTextColor(60, 60, 60)
                doc.setFont(font || "helvetica", "bold")
                doc.text(`${edu.degree} | ${edu.grade}`, 20, y)
                y += 5
                doc.setFont(font || "helvetica", "normal")
                doc.setFontSize(10)
                doc.text(`${edu.institution} (${edu.year})`, 20, y)
                if (edu.specialization) {
                    y += 4
                    doc.setTextColor(primaryColor)
                    doc.text(`Specialization: ${edu.specialization}`, 25, y)
                }
                y += 8
            })
        }

        if (sectionType === "skills") {
            doc.setFontSize(16)
            doc.setTextColor(primaryColor)
            doc.text("CORE COMPETENCIES", 20, y)
            y += 8
            doc.setDrawColor(primaryColor)
            doc.line(20, y - 5, 190, y - 5)
            y += 5
            const skillCategories = skillsList.reduce((acc: any, skill: any) => {
                if (!acc[skill.category]) acc[skill.category] = []
                acc[skill.category].push(skill)
                return acc
            }, {})
            Object.entries(skillCategories).forEach(([category, categorySkills]: [string, any]) => {
                doc.setFontSize(11)
                doc.setTextColor(primaryColor)
                doc.setFont(font || "helvetica", "bold")
                doc.text(`${category}:`, 20, y)
                y += 5
                doc.setFontSize(10)
                doc.setTextColor(80, 80, 80)
                doc.setFont(font || "helvetica", "normal")
                const skillText = categorySkills.map((s: any) => `${s.name} (${s.level})`).join(" | ")
                const wrappedText = doc.splitTextToSize(skillText, 170)
                doc.text(wrappedText, 25, y)
                y += wrappedText.length * 4 + 3
            })
        }

        if (sectionType === "projects" || sectionType === "research") {
            const sectionTitle = sectionType === "research"
                ? "RESEARCH & PUBLICATIONS"
                : "PROJECTS & EXPERIENCE"
            doc.setFontSize(16)
            doc.setTextColor(primaryColor)
            doc.text(sectionTitle, 20, y)
            y += 8
            doc.setDrawColor(primaryColor)
            doc.line(20, y - 5, 190, y - 5)
            y += 5
            const filteredAchievements = sectionType === "research"
                ? achievementsList.filter(a => a.type === "Research")
                : achievementsList.filter(a => ["Project", "Workshop", "Competition"].includes(a.type))
            filteredAchievements.forEach(achievement => {
                if (y > 240) return
                doc.setFontSize(12)
                doc.setTextColor(primaryColor)
                doc.setFont(font || "helvetica", "bold")
                doc.text(achievement.title, 20, y)
                y += 5
                doc.setFontSize(10)
                doc.setTextColor(80, 80, 80)
                doc.setFont(font || "helvetica", "normal")
                const description = doc.splitTextToSize(achievement.description, 165)
                doc.text(description, 25, y)
                y += description.length * 4
                doc.setFontSize(9)
                doc.setTextColor(primaryColor)
                let metadata = `${achievement.organization} | ${achievement.date}`
                if (achievement.technologies) { metadata += ` | Tech: ${achievement.technologies.join(", ")}` }
                if (achievement.impact) { metadata += ` | ${achievement.impact}` }
                doc.text(metadata, 25, y)
                y += 8
            })
        }

        if (sectionType === "certifications") {
            if (certifications.length === 0) return y
            doc.setFontSize(16)
            doc.setTextColor(primaryColor)
            doc.text("CERTIFICATIONS", 20, y)
            y += 8
            doc.setDrawColor(primaryColor)
            doc.setLineWidth(0.3)
            doc.line(20, y - 5, 190, y - 5)
            y += 5
            certifications.forEach(cert => {
                doc.setFontSize(11)
                doc.setTextColor(80, 80, 80)
                doc.setFont(font || "helvetica", "bold")
                doc.text(cert.name, 20, y)
                y += 4
                doc.setFont(font || "helvetica", "normal")
                doc.setFontSize(9)
                doc.text(`${cert.issuer} | ${cert.date} | ID: ${cert.credentialId}`, 25, y)
                y += 7
            })
        }
        return y + 5
    }


    // --- BACKEND HOOK 1: PDF GENERATION (Download) ---
    const handleGeneratePDF = async () => {
        setIsGenerating(true)

        // TODO: Backend Integration - In a real app, you would send the config to a server endpoint for generation (see comment block below)
        
        // Current client-side PDF generation logic (works immediately for demo)
        const doc = createPdfDocument();
        doc.save(`${studentProfile.name.replace(/\s+/g, '_')}_Portfolio_${new Date().getFullYear()}.pdf`)
        setIsGenerating(false)
    }

    // --- BACKEND HOOK 2: SHAREABLE LINK GENERATION (Modal Logic) ---
    const handleGenerateLink = async () => {
        setIsGenerating(true)

        // 1. Generate the PDF Data URI string
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network lag
        const doc = createPdfDocument();
        const pdfDataUri = doc.output('datauristring');
        
        // 2. Store the link and open the modal
        setShareLink(pdfDataUri);
        setShowShareModal(true); 
        
        setIsGenerating(false)

        // TODO: Backend Integration - In a production scenario, you would save the configuration to the DB 
        // and construct a persistent URL: 
        /*
        const response = await fetch('/api/portfolio/create-share-link', { ... });
        const data = await response.json();
        const persistentUrl = `https://portfolio.university.edu/view/${data.uniquePortfolioId}`;
        setShareLink(persistentUrl);
        setShowShareModal(true);
        */
    }

    const selectedTemplateData = portfolioTemplates.find((t) => t.id === selectedTemplate)

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground text-balance">Portfolio Generator</h1>
                <p className="text-muted-foreground mt-1">Create a professional portfolio from your approved achievements</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Palette className="h-5 w-5" />
                                Choose Template
                            </CardTitle>
                            <CardDescription>Select a design template that matches your career goals</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate}>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {portfolioTemplates.map((template) => (
                                        <div key={template.id} className="relative">
                                            <Label
                                                htmlFor={template.id}
                                                className="cursor-pointer block border-2 border-border rounded-lg p-4 hover:border-primary transition-colors"
                                            >
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <RadioGroupItem value={template.id} id={template.id} />
                                                    <span className="font-medium">{template.name}</span>
                                                </div>
                                                <img
                                                    src={template.preview || "https://placehold.co/400x160/2563eb/ffffff?text=Preview"}
                                                    alt={template.name}
                                                    className="w-full h-32 object-cover rounded-md mb-2"
                                                    onError={(e) => { e.currentTarget.src = "https://placehold.co/400x160/2563eb/ffffff?text=Preview" }}
                                                />
                                                <p className="text-sm text-muted-foreground">{template.description}</p>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                Select Content
                            </CardTitle>
                            <CardDescription>Choose which approved achievements to include in your portfolio</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {approvedAchievements.map((achievement) => (
                                    <div key={achievement.id} className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                                        <Checkbox
                                            id={`achievement-${achievement.id}`}
                                            checked={selectedAchievements.includes(achievement.id)}
                                            onCheckedChange={() => handleAchievementToggle(achievement.id)}
                                            className="mt-1"
                                        />
                                        <div className="flex-1">
                                            <Label htmlFor={`achievement-${achievement.id}`} className="cursor-pointer block">
                                                <div className="flex items-center gap-2 mb-1">
                                                    {getTypeIcon(achievement.type)}
                                                    <h4 className="font-medium text-foreground">{achievement.title}</h4>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                                    <div className="flex items-center gap-1">
                                                        <Building className="h-3 w-3" />
                                                        {achievement.organization}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(achievement.date).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-foreground mb-2">{achievement.description}</p>
                                                <div className="flex gap-1 flex-wrap">
                                                    {achievement.skills.map((skill) => (
                                                        <Badge key={skill} variant="secondary" className="text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </Label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Star className="h-5 w-5" />
                                Select Skills
                            </CardTitle>
                            <CardDescription>Choose skills to highlight in your portfolio</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 md:grid-cols-2">
                                {skills.map((skill) => (
                                    <div key={skill.name} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`skill-${skill.name}`}
                                            checked={selectedSkills.includes(skill.name)}
                                            onCheckedChange={() => handleSkillToggle(skill.name)}
                                        />
                                        <Label htmlFor={`skill-${skill.name}`} className="cursor-pointer flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{skill.name}</span>
                                                <div className="flex gap-1">
                                                    <Badge variant="outline" className="text-xs">{skill.level}</Badge>
                                                    <Badge variant="secondary" className="text-xs">{skill.category}</Badge>
                                                </div>
                                            </div>
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-5 w-5" />
                                Preview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                                    <img
                                        src={selectedTemplateData?.preview || "https://placehold.co/400x192/2563eb/ffffff?text=Template+Preview"}
                                        alt="Portfolio Preview"
                                        className="w-full h-48 object-cover rounded-md mb-3"
                                        onError={(e) => { e.currentTarget.src = "https://placehold.co/400x192/2563eb/ffffff?text=Template+Preview" }}
                                    />
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <User className="h-4 w-4" />
                                        <h3 className="font-medium text-foreground">{studentProfile.name}</h3>
                                    </div>
                                    <h3 className="font-medium text-foreground mb-1">{selectedTemplateData?.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        {selectedAchievements.length} achievements • {selectedSkills.length} skills
                                    </p>
                                    <Button
                                        onClick={() => setShowPreviewModal(true)}
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 bg-transparent"
                                        disabled={selectedAchievements.length === 0}
                                    >
                                        <Eye className="h-4 w-4" />
                                        Full Preview
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Export Options</CardTitle>
                            <CardDescription>Generate your portfolio in different formats</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button
                                onClick={handleGeneratePDF}
                                disabled={isGenerating || selectedAchievements.length === 0}
                                className="w-full gap-2"
                            >
                                <Download className="h-4 w-4" />
                                {isGenerating ? "Generating PDF..." : "Generate PDF"}
                            </Button>

                            <Button
                                onClick={handleGenerateLink}
                                disabled={isGenerating || selectedAchievements.length === 0}
                                variant="outline"
                                className="w-full gap-2 bg-transparent"
                            >
                                <Share2 className="h-4 w-4" />
                                {isGenerating ? "Generating Link..." : "Get Shareable Link"}
                            </Button>

                            <Separator />

                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>• PDF: Download for applications</p>
                                <p>• Shareable Link: Public web portfolio (Opens PDF online via Data URI)</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Portfolio Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Total Achievements</span>
                                <Badge variant="secondary">{approvedAchievements.length}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Selected</span>
                                <Badge variant="default">{selectedAchievements.length}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Skills Selected</span>
                                <Badge variant="outline">{selectedSkills.length}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Completeness</span>
                                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                                    {Math.round((selectedAchievements.length / approvedAchievements.length) * 100)}%
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Student Profile
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold">
                                    {studentProfile.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="font-semibold text-foreground">{studentProfile.name}</h3>
                                <p className="text-sm text-muted-foreground">{studentProfile.rollNumber}</p>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{studentProfile.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{studentProfile.phone}</span>
                                </div>
                            </div>
                            <p className="text-sm text-foreground italic">{studentProfile.bio}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {showPreviewModal && (
                <FullPreviewModal
                    selectedTemplate={selectedTemplate}
                    selectedAchievements={selectedAchievements}
                    selectedSkills={selectedSkills}
                    onClose={() => setShowPreviewModal(false)}
                />
            )}
            
            {/* RENDER SHARE MODAL */}
            {showShareModal && shareLink && (
                <ShareLinkModal 
                    link={shareLink}
                    onClose={() => setShowShareModal(false)}
                />
            )}
        </div>
    )
}