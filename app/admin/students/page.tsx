"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import { Search, Plus, Mail, Edit2, Trash2 } from "lucide-react"

interface Student {
  id: string
  number: number
  name: string
  email: string
  enrolledCourses: number
  completedCourses: number
}

const getEnrollmentCounts = (index: number) => {
  const enrolled = 1 + (index % 5)
  const completed = (index * 2) % (enrolled + 1)

  return {
    enrolled,
    completed: Math.min(completed, enrolled),
  }
}

const toEmail = (name: string, index: number) => {
  const safeName = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "")

  return safeName ? `${safeName}@example.com` : `student${index + 1}@example.com`
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadStudents = async () => {
      setIsLoading(true)
      setLoadError(null)

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("role", "lawyer")

      if (!isMounted) return

      if (error) {
        console.error("Failed to load students:", error)
        setLoadError("Failed to load students.")
        setIsLoading(false)
        return
      }

      const mappedStudents = (data ?? []).map((student, index) => {
        const displayName = student.full_name?.trim() || `Student ${index + 1}`
        const { enrolled, completed } = getEnrollmentCounts(index)

        return {
          id: student.id,
          number: index + 1,
          name: displayName,
          email: toEmail(displayName, index),
          enrolledCourses: enrolled,
          completedCourses: completed,
        }
      })

      setStudents(mappedStudents)
      setIsLoading(false)
    }

    loadStudents()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleDelete = (id: string) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  const totalEnrollments = students.reduce((sum, student) => sum + student.enrolledCourses, 0)
  const totalCompletions = students.reduce((sum, student) => sum + student.completedCourses, 0)
  const completionRate = totalEnrollments ? Math.round((totalCompletions / totalEnrollments) * 100) : 0

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
              <p className="text-muted-foreground text-sm">Total Enrollments</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">{totalEnrollments}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Completions</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalCompletions}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Completion Rate</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{completionRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Search students by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>
            {isLoading ? "Loading students..." : `${filteredStudents.length} students found`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadError ? <p className="text-sm text-destructive mb-4">{loadError}</p> : null}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">No.</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Enrolled</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Completed</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-muted-foreground">{student.number}</td>
                    <td className="py-4 px-4 text-foreground font-medium">{student.name}</td>
                    <td className="py-4 px-4 text-muted-foreground flex items-center gap-2">
                      <Mail size={16} />
                      {student.email}
                    </td>
                    <td className="py-4 px-4 text-foreground">{student.enrolledCourses}</td>
                    <td className="py-4 px-4 text-foreground">{student.completedCourses}</td>
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
