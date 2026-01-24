"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit2, Trash2, Eye } from "lucide-react"
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Course {
  id: number
  title: string
  slug?: string
  description?: string
  hero_image?: string
  category?: string
  level?: string
  students?: number
  rating?: number
  created_at?: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [enteredCourseName, setEnteredCourseName] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [submittingDelete, setSubmittingDelete] = useState(false)

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .select('id, title, slug, category, level, students, rating, created_at')
        .order('created_at', { ascending: false })

      setLoading(false)
      if (error) {
        toast({ title: 'Error', description: error.message })
        return
      }
      setCourses(data || [])
    }

    loadCourses()
  }, [])

  const filteredCourses = courses.filter((course) => {
    const q = searchTerm.toLowerCase()
    return (
      (course.title || '').toLowerCase().includes(q) ||
      (course.category || '').toLowerCase().includes(q) ||
      (course.level || '').toLowerCase().includes(q)
    )
  })

  const openDeleteDialog = (course: Course) => {
    setSelectedCourse(course)
    setEnteredCourseName('')
    setAdminPassword('')
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedCourse) return
    setSubmittingDelete(true)
    try {
      const res = await fetch('/api/admin/courses/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          enteredCourseName,
          password: adminPassword,
        }),
      })

      const payload = await res.json()
      if (!res.ok || payload?.ok === false) {
        const reason = payload?.reason
        const message =
          reason === 'invalid-password'
            ? 'Invalid admin password.'
            : reason === 'name-mismatch'
              ? 'Course name does not match exactly.'
              : reason === 'not-found'
                ? 'Course not found.'
                : payload?.error || 'Failed to delete course.'
        toast({ title: 'Delete blocked', description: message })
        setSubmittingDelete(false)
        return
      }

      // Success: show alert, update local list, close dialog
      toast({ title: 'Deleted', description: 'Course removed.' })
      setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id))
      setDeleteDialogOpen(false)
    } catch (e: any) {
      toast({ title: 'Error', description: e?.message || 'Unexpected error' })
    } finally {
      setSubmittingDelete(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <p className="block md:hidden text-red-800/80">Please turn desktop mode on or rotate your device to landscape view.</p>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground mt-2">Manage all your courses and content</p>
        </div>
        <Link href="/admin/courses/new" className="no-underline hidden md:block">
          <Button className="gap-2">
            <Plus size={20} />
            New Course
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card hidden md:block">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <Input
                placeholder="Search courses or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2" />
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card className="bg-card hidden md:block">
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>{filteredCourses.length} courses found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Course Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Level</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Students</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Created</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{course.title}</td>
                    <td className="py-4 px-4 text-muted-foreground">{course.category || '—'}</td>
                    <td className="py-4 px-4 text-muted-foreground">{course.level || '—'}</td>
                    <td className="py-4 px-4 text-foreground">{course.students ?? 0}</td>
                    <td className="py-4 px-4 text-foreground">{course.rating ? `${course.rating} ⭐` : 'N/A'}</td>
                    <td className="py-4 px-4 text-muted-foreground">{course.created_at ? new Date(course.created_at).toLocaleDateString() : '—'}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/courses/${course.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Eye size={16} />
                          </Button>
                        </Link>

                        <Link href={`/admin/courses/${course.id}/edit`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Edit2 size={16} />
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-destructive hover:text-destructive"
                          onClick={() => openDeleteDialog(course)}
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
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm course deletion</AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent. To proceed, enter the exact course name and the admin delete password.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="courseName">Type the course name exactly</Label>
              <Input
                id="courseName"
                placeholder={selectedCourse?.title || 'Course name'}
                value={enteredCourseName}
                onChange={(e) => setEnteredCourseName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Admin delete password</Label>
              <Input
                id="adminPassword"
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </div>
            {selectedCourse && (
              <p className="text-xs text-muted-foreground">
                Target course: <span className="font-medium">{selectedCourse.title}</span>
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submittingDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={submittingDelete || !enteredCourseName || !adminPassword}
            >
              {submittingDelete ? 'Deleting…' : 'Confirm delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
