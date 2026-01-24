"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Mail, Phone, Edit2, Trash2, Award } from "lucide-react"

interface Student {
  id: number
  name: string
  email: string
  phone: string
  enrolledCourses: number
  completedCourses: number
  joinDate: string
  status: "active" | "inactive" | "suspended"
  progress: number
}

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    enrolledCourses: 3,
    completedCourses: 2,
    joinDate: "2024-01-15",
    status: "active",
    progress: 85,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+1 (555) 234-5678",
    enrolledCourses: 2,
    completedCourses: 1,
    joinDate: "2024-02-20",
    status: "active",
    progress: 60,
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    phone: "+1 (555) 345-6789",
    enrolledCourses: 4,
    completedCourses: 3,
    joinDate: "2023-12-10",
    status: "active",
    progress: 95,
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1 (555) 456-7890",
    enrolledCourses: 1,
    completedCourses: 0,
    joinDate: "2024-03-05",
    status: "inactive",
    progress: 20,
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma@example.com",
    phone: "+1 (555) 567-8901",
    enrolledCourses: 5,
    completedCourses: 4,
    joinDate: "2023-11-01",
    status: "active",
    progress: 90,
  },
]

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "suspended">("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || student.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: number) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-blue-500"
    if (progress >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground mt-2">Manage student accounts and enrollments</p>
        </div>
        <Button className="gap-2">
          <Plus size={20} />
          Add Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Students</p>
              <p className="text-3xl font-bold text-foreground mt-2">{students.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Active Students</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {students.filter((s) => s.status === "active").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Avg. Progress</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Enrollments</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {students.reduce((sum, s) => sum + s.enrolledCourses, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <Input
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "active", "inactive", "suspended"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  onClick={() => setFilterStatus(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>{filteredStudents.length} students found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Enrolled</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Completed</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Progress</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{student.name}</td>
                    <td className="py-4 px-4 text-muted-foreground flex items-center gap-2">
                      <Mail size={16} />
                      {student.email}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground flex items-center gap-2">
                      <Phone size={16} />
                      {student.phone}
                    </td>
                    <td className="py-4 px-4 text-foreground">{student.enrolledCourses}</td>
                    <td className="py-4 px-4 text-foreground flex items-center gap-1">
                      <Award size={16} className="text-yellow-500" />
                      {student.completedCourses}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(student.progress)}`}
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(student.status)}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
