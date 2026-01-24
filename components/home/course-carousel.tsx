'use client'

import * as React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Clock, BookOpen, Star } from 'lucide-react'

import staticCourses from '@/public/data/courses.json'
import { attachCreatorToCourse } from '@/lib/courseCreators'
import type { Creator } from '@/data/creators'

interface Course {
  id: number
  slug: string
  title: string
  description: string
  image: string
  category: string
  level: string
  estimated_hours: string
  students: number
  rating: number
  creator: Creator
}

export default function CourseCarousel() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cached = localStorage.getItem('courses_v1')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        setCourses(parsed.map(attachCreatorToCourse))
      } catch {}
    }

    const fetchCourses = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('courses')
        .select('*')
        .eq('published', true)
        .limit(6)

      if (data) {
        const mapped = data.map((c) =>
          attachCreatorToCourse({
            id: c.id,
            slug: c.slug,
            title: c.title,
            description: c.description,
            image: c.hero_image || '/assets/images/default.jpg',
            category: c.category,
            level: c.level,
            estimated_hours: c.estimated_hours || 'N/A',
            students: c.students || 0,
            rating: c.rating || 0,
          })
        )

        setCourses(mapped)
        localStorage.setItem('courses_v1', JSON.stringify(mapped))
      }
      setLoading(false)
    }

    fetchCourses()
  }, [])

  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}

      {loading && (
        <p className="col-span-full text-center text-sm text-muted-foreground">
          Refreshing data...
        </p>
      )}
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition">
      <div className="aspect-video relative">
        <img src={course.image} className="object-cover w-full h-full" />
        <Badge className="absolute top-3 left-3">{course.category}</Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{course.title}</CardTitle>

        <Link
          href={`/creators/${course.creator.slug}`}
          className="flex items-center gap-2 mt-2 hover:opacity-80"
        >
          <img
            src={course.creator.avatar}
            className="w-7 h-7 rounded-full"
          />
          <span className="text-sm text-muted-foreground">
            ከ {course.creator.name}
          </span>
        </Link>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {course.description}
        </p>

        <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> {course.level}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {course.estimated_hours}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" /> {course.students}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/learn/course/${course.slug}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
