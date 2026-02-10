'use client'

import { useEffect, useState } from 'react'
import TransitionLink from '@/components/transition-link'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useSupabase } from '@/components/providers/supabase-provider'
import {
  BookOpen,
  Users,
  MessageCircle,
  Award,
  BarChart3,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react'

type EnrolledCourse = {
  enrollment_id: string
  enrolled_at: string
  progress: number
  completed: boolean
  course: {
    id: number
    title: string
    slug: string
    hero_image: string | null
  }
  firstLessonId: number | null
  nextLessonTitle: string | null
}


const upcomingEvents = [
  {
    id: 1,
    title: 'የሙያ እድገት ስልጠና',
    date: '2023-12-28T10:00:00',
    duration: '2 ሰዓት',
  },
  {
    id: 2,
    title: 'ለቴክኖሎጂ ስራዎች ኔትዎርኪንግ',
    date: '2024-01-05T14:30:00',
    duration: '1.5 ሰዓት',
  },
]

const discussionUpdates = [
  {
    id: 1,
    title: 'How to prepare for a tech interview?',
    latestReply: 'Check out these resources for technical interviews...',
    replies: 12,
    unread: 3,
  },
  {
    id: 2,
    title: 'Best project portfolio examples',
    latestReply: 'Here are some examples of well-designed portfolios...',
    replies: 8,
    unread: 1,
  },
]


export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, supabase } = useSupabase()
  const [courses, setCourses] = useState<EnrolledCourse[]>([])
  const [coursesLoading, setCoursesLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (!user || user.user_metadata?.role !== 'lawyer') {
        router.replace('/login')
      }
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return

    const fetchEnrolledCourses = async () => {
      setCoursesLoading(true)

      const { data, error } = await supabase
        .from('course_enrollments')
        .select(`
          id,
          enrolled_at,
          courses (
            id,
            title,
            slug,
            hero_image
          )
        `)
        .eq('user_id', user.id)
        .order('enrolled_at', { ascending: false })

      if (error) {
        console.error('Error fetching enrollments:', error)
        setCoursesLoading(false)
        return
      }

      const formattedCourses: EnrolledCourse[] = await Promise.all(
        data.map(async (enrollment: any) => {
          // Fetch course progress for this enrollment (course_progress.enrollment_id -> course_enrollments.id)
          const { data: progressRow } = await supabase
            .from('course_progress')
            .select('progress_percentage, completed')
            .eq('enrollment_id', enrollment.id)
            .maybeSingle()

          // Determine first incomplete lesson for this user in this course
          const { data: courseLessons, error: lessonsError } = await supabase
            .from('lessons')
            .select('id, title, step_order')
            .eq('course_id', enrollment.courses.id)
            .order('step_order', { ascending: true })

          let firstIncompleteLesson: { id: number; title: string; step_order: number } | null = null
          if (!lessonsError && courseLessons && courseLessons.length > 0) {
            const lessonIds = courseLessons.map((l: any) => l.id)
            const { data: completions } = await supabase
              .from('lesson_quiz_completions')
              .select('lesson_id')
              .in('lesson_id', lessonIds)
              .eq('user_id', user.id)

            const completedSet = new Set<number>((completions || []).map((c: any) => c.lesson_id))
            firstIncompleteLesson = (courseLessons as any[]).find((l: any) => !completedSet.has(l.id)) || null
          }

          return {
            enrollment_id: enrollment.id,
            enrolled_at: enrollment.enrolled_at,
            progress: progressRow?.progress_percentage ?? 0,
            completed: progressRow?.completed ?? false,
            course: enrollment.courses,
            firstLessonId: firstIncompleteLesson?.step_order ?? null,
            nextLessonTitle: firstIncompleteLesson?.title ?? null,
          }
        })
      )

      setCourses(formattedCourses)
      setCoursesLoading(false)
    }

    fetchEnrolledCourses()
  }, [user, supabase])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-xl">ዳሽቦርዱ በመጫን ላይ...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="container py-8 px-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-montserrat">
            እንኳን ደና መጡ፣ {user.user_metadata?.full_name || 'ጠበቃ'}
          </h1>
          <p className="text-muted-foreground">
            የመማር ጉዞዎ አጠቃላይ እይታ እዚህ ነው
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <TransitionLink href="/learn">ኮርሶችን ተመልከት</TransitionLink>
          </Button>
          <Button asChild>
            <TransitionLink href="/dashboard/settings">መገለጫ አርትዕ</TransitionLink>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-primary" />
                  በሂደት ላይ ያሉ ኮርሶች
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <TransitionLink href="/dashboard">
                    ሁሉንም አይ
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </TransitionLink>
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {coursesLoading ? (
                <div className="text-center py-6 text-muted-foreground">
                  ኮርሶችዎን በመጫን ላይ...
                </div>
              ) : courses.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">
                    እስካሁን ከኮርሶች ጋር አልተመዘገቡም
                  </p>
                  <Button asChild>
                    <TransitionLink href="/learn">ኮርሶችን ተመልከት</TransitionLink>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {courses.map((item) => (
                    <div
                      key={item.enrollment_id}
                      className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-card/50"
                    >
                      <div className="sm:w-1/4 h-24 rounded-md overflow-hidden">
                        <img
                          src={
                            item.course.hero_image ||
                            'https://placehold.co/600x400'
                          }
                          alt={item.course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-semibold">
                            {item.course.title}
                          </h3>
                          <span className="text-sm text-muted-foreground">
                            {item.progress}% ተጠናቀቀ
                          </span>
                        </div>

                        <Progress value={item.progress} className="h-2 mb-2" />

                        <div className="flex justify-between items-center mt-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              የሚቀጥለው ትምህርት:{' '}
                            </span>
                            {item.nextLessonTitle ?? '—'}
                          </div>

                          {item.firstLessonId && (
                            <Button size="sm" asChild>
                              <TransitionLink
                                href={`/learn/course/${item.course.slug}/lesson/${item.firstLessonId}`}
                              >
                                ቀጥል
                              </TransitionLink>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Discussion Updates */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                  የውይይት ዝማኔዎች
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <TransitionLink href="/dashboard/discussions">
                    ሁሉንም አይ
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </TransitionLink>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discussionUpdates.map((discussion) => (
                  <div key={discussion.id} className="p-4 rounded-lg border bg-card/50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold line-clamp-1">{discussion.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                          {discussion.latestReply}
                        </p>
                      </div>
                      {discussion.unread > 0 && (
                        <div className="bg-primary text-primary-foreground text-xs font-medium rounded-full px-2 py-1">
                          {discussion.unread} አዲስ
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-sm text-muted-foreground">
                        {discussion.replies} ምላሾች
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <TransitionLink href={`/community/discussion/${discussion.id}`}>ክርክሩን አይ</TransitionLink>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1/3 width on desktop */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-3xl font-bold">2</h3>
                  <p className="text-sm text-muted-foreground">በሂደት ላይ ያሉ ኮርሶች</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-3xl font-bold">1</h3>
                  <p className="text-sm text-muted-foreground">የተገኙ ማስረጃዎች</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <BarChart3 className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-3xl font-bold">48h</h3>
                  <p className="text-sm text-muted-foreground">የመማር ጊዜ</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <MessageCircle className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-3xl font-bold">5</h3>
                  <p className="text-sm text-muted-foreground">የፎረም ፖስቶች</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                የሚመጡ ክስተቶች
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => {
                  const eventDate = new Date(event.date)
                  return (
                    <div key={event.id} className="p-4 rounded-lg border bg-card/50">
                      <h3 className="font-semibold">{event.title}</h3>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {eventDate.toLocaleDateString()} በ {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{event.duration}</span>
                      </div>
                      <div className="mt-3">
                        <Button size="sm" variant="outline" className="w-full">መመዝገብ</Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Community */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                ማህበረሰብ
              </CardTitle>
              <CardDescription>ከጓደኞችና መንቶሮች ጋር ይገናኙ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <TransitionLink href="/community">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    ውይይቶችን ይቀላቀሉ
                  </TransitionLink>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <TransitionLink href="/mentors">
                    <Users className="mr-2 h-4 w-4" />
                    መንቶር ፈልጉ
                  </TransitionLink>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <TransitionLink href="/community/events">
                    <Calendar className="mr-2 h-4 w-4" />
                    የሚመጡ ክስተቶች
                  </TransitionLink>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
