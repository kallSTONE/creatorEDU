'use client'

import TransitionLink from '@/components/transition-link'
import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Users, Clock, Filter, Search, Star } from 'lucide-react'
import staticCourses from '@/public/data/courses.json'

interface Course {
  id: number
  slug: string
  title: string
  description: string
  image: string
  category: string
  level: string
  duration: string
  students: number
  rating: number
  featured?: boolean
  estimated_hours?: number
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  // Search
  const [search, setSearch] = useState('')

  // Active filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])

  // Tabs
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'new' | 'popular'>('all')

  // Map raw course data to Course interface
  const mapCourse = (c: any): Course => {
    const hours = c.estimated_hours || 0
    const weeks = Math.ceil(hours / 10)

    return {
      id: c.id,
      slug: c.slug,
      title: c.title,
      description: c.description,
      image: c.image || c.hero_image || '/assets/images/default.jpg',
      category: c.category,
      level: c.level,
      duration: `${weeks} weeks`,
      estimated_hours: c.estimated_hours,
      students: c.students || 0,
      rating: c.rating || 0,
      featured: c.featured ?? false,
    }
  }

  // Load courses: local → static → Supabase
  useEffect(() => {
    const cached = localStorage.getItem('courses')
    if (cached) {
      try {
        setCourses(JSON.parse(cached))
      } catch {
        localStorage.removeItem('courses')
      }
    }

    if (!cached) {
      const fallback = staticCourses
        .filter((c: any) => c.published !== false && c.status !== 'draft')
        .map(mapCourse)
      setCourses(fallback)
      localStorage.setItem('courses', JSON.stringify(fallback))
    }

    const fetchCourses = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('published', true)
        .eq('status', 'published')
        .order('id', { ascending: true })

      if (!error && data) {
        const mapped = data
          .filter((c) => c.published !== false && c.status !== 'draft')
          .map(mapCourse)
        setCourses(mapped)
        localStorage.setItem('courses', JSON.stringify(mapped))
      }
      setLoading(false)
    }

    fetchCourses()
  }, [])

  // Categories for sidebar
  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map(c => c.category)))
    return ['All', ...unique]
  }, [courses])

  // Toggle multi-select filters
  const toggleFilter = (value: string, setter: any, current: string[]) => {
    if (value === 'All') {
      setter([])
      return
    }
    setter(
      current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
    )
  }

  // Duration helper → extract weeks from estimated_hours
  const getWeeks = (hours?: number) =>
    hours ? Math.ceil(hours / 10) : 0

  // Full filtering logic
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const courseWeeks = getWeeks(c.estimated_hours)

      // SEARCH
      const matchesSearch =
        search === '' ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())

      if (!matchesSearch) return false

      // CATEGORY (OR logic)
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(c.category)) return false
      }

      // LEVEL (OR logic)
      if (selectedLevels.length > 0) {
        if (!selectedLevels.includes(c.level)) return false
      }

      // DURATION (OR logic)
      if (selectedDurations.length > 0) {
        const matchOne = selectedDurations.some(d => {
          if (d === 'Less than 4 weeks') return courseWeeks < 4
          if (d === '4-8 weeks') return courseWeeks >= 4 && courseWeeks <= 8
          if (d === '8+ weeks') return courseWeeks > 8
          return false
        })
        if (!matchOne) return false
      }

      return true
    })
  }, [courses, selectedCategories, selectedLevels, selectedDurations, search])

  // Tab logic AFTER filters
  const tabCourses = useMemo(() => {
    let base = [...filteredCourses]

    if (activeTab === 'featured') {
      base = base.filter(c => c.featured)
    }

    if (activeTab === 'new') {
      base = base.slice(-3)
    }

    if (activeTab === 'popular') {
      base = base.sort((a, b) => b.students - a.students).slice(0, 3)
    }

    return base
  }, [activeTab, filteredCourses])

  if (loading && courses.length === 0)
    return (
      <div className="container p-6">
        <div className="mb-8 space-y-3">
          <div className="h-8 w-40 rounded bg-muted animate-pulse" />
          <div className="h-4 w-64 rounded bg-muted animate-pulse" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar skeleton */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              <div className="h-10 w-full rounded bg-muted animate-pulse" />
              <div className="space-y-4">
                <div>
                  <div className="h-4 w-24 rounded bg-muted animate-pulse mb-3" />
                  <div className="space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={`cat-skel-${i}`} className="h-9 w-full rounded bg-muted animate-pulse" />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="h-4 w-16 rounded bg-muted animate-pulse mb-3" />
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={`lvl-skel-${i}`} className="h-9 w-full rounded bg-muted animate-pulse" />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="h-4 w-20 rounded bg-muted animate-pulse mb-3" />
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={`dur-skel-${i}`} className="h-9 w-full rounded bg-muted animate-pulse" />
                    ))}
                  </div>
                </div>
                <div className="h-9 w-full rounded bg-muted animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="w-full lg:w-3/4">
            <div className="flex gap-2 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`tab-skel-${i}`} className="h-9 w-24 rounded bg-muted animate-pulse" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`card-skel-${i}`} className="rounded-lg border bg-card overflow-hidden">
                  <div className="aspect-video w-full bg-muted animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                    <div className="h-4 w-full rounded bg-muted animate-pulse" />
                    <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
                    <div className="flex gap-3">
                      <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                      <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                      <div className="h-4 w-14 rounded bg-muted animate-pulse" />
                    </div>
                    <div className="h-9 w-full rounded bg-muted animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <div className="container p-6">
      {/* PAGE TITLE */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-montserrat mb-2">ስልጠናዎች</h1>
        <p className="text-muted-foreground">በሙያዊ መምሪያ እድገት ያድርጉ</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <div className="w-full lg:w-1/4">
          <div className="sticky top-24 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses"
                className="pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </h3>

              <div className="space-y-4">
                {/* Category */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Categories</h4>
                  <ul className="space-y-1">
                    {categories.map(cat => (
                      <li key={cat}>
                        <Button
                          variant={selectedCategories.includes(cat) ? 'default' : 'ghost'}
                          className="w-full justify-between font-normal"
                          size="sm"
                          onClick={() => toggleFilter(cat, setSelectedCategories, selectedCategories)}
                        >
                          {cat}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Level */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Level</h4>
                  <div className="space-y-1">
                    {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(level => (
                      <Button
                        key={level}
                        variant={selectedLevels.includes(level) ? 'default' : 'ghost'}
                        className="w-full justify-start font-normal"
                        size="sm"
                        onClick={() => toggleFilter(level, setSelectedLevels, selectedLevels)}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Duration</h4>
                  <div className="space-y-1">
                    {['Less than 4 weeks', '4-8 weeks', '8+ weeks'].map(d => (
                      <Button
                        key={d}
                        variant={selectedDurations.includes(d) ? 'default' : 'ghost'}
                        className="w-full justify-start font-normal"
                        size="sm"
                        onClick={() => toggleFilter(d, setSelectedDurations, selectedDurations)}
                      >
                        {d}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategories([])
                      setSelectedLevels([])
                      setSelectedDurations([])
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full lg:w-3/4">
          <Tabs
            value={activeTab}
            onValueChange={(value: string) =>
              setActiveTab(value as 'all' | 'featured' | 'new' | 'popular')
            }
            className="w-full mb-6"
          >
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {tabCourses.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <p className="text-lg font-medium mb-2">No courses found</p>
                  <p className="mb-4">Try adjusting your filters or search keywords.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategories([])
                      setSelectedLevels([])
                      setSelectedDurations([])
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tabCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  )
}

/* COURSE CARD COMPONENT */

interface CourseCardProps {
  course: Course
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full">
      <div className="aspect-video w-full relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />

        <Badge className="absolute top-3 left-3">{course.category}</Badge>
        {course.featured && (
          <Badge variant="secondary" className="absolute top-3 right-3">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{course.title}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <BookOpen className="mr-1 h-4 w-4" />
            <span>{course.level}</span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>{course.duration}</span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <TransitionLink href={`/learn/course/${course.slug}`}>View Course</TransitionLink>
        </Button>
      </CardFooter>
    </Card>
  )
}
