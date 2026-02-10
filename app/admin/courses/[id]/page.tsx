"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRouteLoading } from '@/components/route-loading-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'

type Lesson = { id: number; title: string; description?: string; estimated_time?: number; topics?: any }
type Note = { id: string; content: string; status: string; created_at: string; reviewer_id?: string; addressed?: boolean }

export default function CourseDetailPage() {
    const params = useParams() as { id: string }
    const id = Number(params?.id)
    const [course, setCourse] = useState<any>(null)
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [loading, setLoading] = useState(false)
    const [reviewNotes, setReviewNotes] = useState<Note[]>([])
    const { toast } = useToast()
    const router = useRouter()
    const { startLoading } = useRouteLoading()

    useEffect(() => {
        if (!id) return
        const load = async () => {
            setLoading(true)
            const { data: courseData, error: courseErr } = await supabase
                .from('courses')
                .select('*')
                .eq('id', id)
                .single()

            if (courseErr) {
                setLoading(false)
                toast({ title: 'Error', description: courseErr.message })
                return
            }

            const { data: lessonsData, error: lessonsErr } = await supabase
                .from('lessons')
                .select('*')
                .eq('course_id', id)
                .order('step_order', { ascending: true })

            // Load reviewer notes for this course (visible to admin)
            const { data: notesData } = await supabase
                .from('course_review_notes')
                .select('id, content, status, reviewer_id, created_at, addressed')
                .eq('course_id', id)
                .order('created_at', { ascending: false })

            setLoading(false)
            if (lessonsErr) {
                toast({ title: 'Error', description: lessonsErr.message })
                return
            }

            setCourse(courseData)
            setLessons(lessonsData || [])
            setReviewNotes(notesData || [])
        }

        load()
    }, [id])

    if (!course) {
        return (
            <div className="p-8">
                <Card className="bg-card max-w-4xl mx-auto">
                    <CardContent>
                        <p>Loading...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="p-8">
            <Card className="max-w-4xl mx-auto bg-card">
                <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.category} — {course.level}</CardDescription>
                </CardHeader>
                <CardContent>
                    {reviewNotes.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Reviewer feedback</p>
                                    <div className="text-sm text-muted-foreground">{reviewNotes.length} note{reviewNotes.length === 1 ? '' : 's'}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100">
                                        {reviewNotes.filter(n => n.addressed || n.status === 'resolved').length} addressed
                                    </Badge>
                                    <Badge variant="secondary" className="bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
                                        {reviewNotes.filter(n => !(n.addressed || n.status === 'resolved')).length} open
                                    </Badge>
                                </div>
                            </div>

                            <Card className="border-muted">
                                <CardContent className="p-0">
                                    <ScrollArea className="max-h-64">
                                        <div className="divide-y divide-border">
                                            {reviewNotes.map((n) => {
                                                const isAddressed = n.addressed || n.status === 'resolved'
                                                const statusTone = isAddressed
                                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100'
                                                    : 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100'
                                                const initial = n.reviewer_id ? n.reviewer_id.slice(0, 2).toUpperCase() : 'RV'
                                                return (
                                                    <div key={n.id} className="flex gap-3 p-4">
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                                                            {initial}
                                                        </div>
                                                        <div className="flex-1 space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="secondary" className={statusTone}>{isAddressed ? 'addressed' : 'open'}</Badge>
                                                                <span className="text-xs text-muted-foreground">
                                                                    {new Date(n.created_at).toLocaleString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm leading-relaxed text-foreground">{n.content}</p>
                                                            <div className="flex gap-2 pt-1">
                                                                <Button
                                                                    size="sm"
                                                                    variant={isAddressed ? 'outline' : 'secondary'}
                                                                    className="h-8 px-3"
                                                                    onClick={async () => {
                                                                        const next = !isAddressed
                                                                        const { error } = await supabase
                                                                            .from('course_review_notes')
                                                                            .update({ addressed: next, status: next ? 'resolved' : 'open' })
                                                                            .eq('id', n.id)
                                                                        if (error) {
                                                                            toast({ title: 'Update failed', description: error.message })
                                                                        } else {
                                                                            setReviewNotes((prev) => prev.map((x) => x.id === n.id ? { ...x, addressed: next, status: next ? 'resolved' : x.status } : x))
                                                                        }
                                                                    }}
                                                                >
                                                                    {isAddressed ? 'Mark open' : 'Mark addressed'}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    <div className="mb-4">
                        <p className="text-muted-foreground">{course.description}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Lessons</h3>
                        {lessons.length === 0 && <p className="text-muted-foreground">No lessons yet.</p>}
                        {lessons.map((l) => (
                            <div key={l.id} className="p-3 border rounded">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="font-medium">{l.title}</div>
                                        <div className="text-sm text-muted-foreground">{l.estimated_time ?? '—'} minutes</div>
                                    </div>
                                    <div>
                                        {l.topics?.video && (
                                            <a className="text-primary underline" href={l.topics.video} target="_blank" rel="noreferrer">Watch</a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {reviewNotes.length > 0 && (
                        <div className="mt-6 space-y-3">
                            <h3 className="text-lg font-semibold">Reviewer Notes</h3>
                            {reviewNotes.map((n) => (
                                <div key={n.id} className="p-3 border rounded">
                                    <div className="text-sm text-muted-foreground">{new Date(n.created_at).toLocaleString()}</div>
                                    <div className="mt-1">{n.content}</div>
                                    <div className="mt-1 text-xs">Status: {n.status}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 flex gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                startLoading()
                                router.back()
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={() => {
                                startLoading()
                                router.push(`/admin/courses/${id}/edit`)
                            }}
                        >
                            Edit Course
                        </Button>
                        <Button
                            onClick={() => {
                                startLoading()
                                router.push(`/learn/course/${course.slug}/lesson/1`)
                            }}
                        >
                            View More
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
