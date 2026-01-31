'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { attachCreatorToCourse } from '@/lib/courseCreators'
import CourseSection from './courseSection'
import type { Creator } from '@/data/creators'

interface Course {
  id: number
  slug: string
  title: string
  description: string
  image: string
  category: string
  creator: Creator
  published: boolean
  available_label?: string
}

export default function CourseCarousel() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .eq('published', true)
        .order('id', { ascending: true })

      if (!data) return

      const mapped = data.map((c) =>
        attachCreatorToCourse({
          id: c.id,
          slug: c.slug,
          title: c.title,
          description: c.description,
          image: c.hero_image || '/assets/images/default.jpg',
          category: c.category,
          published: c.published ?? false,
          available_label: c.available_label,
        })
      )

      setCourses(mapped)
    }

    fetchCourses()
  }, [])

  return (
    <main className="w-full py-12 space-y-8 border border-red-900">
      {courses.map((course) => (
        <CourseSection key={course.id} course={course} />
      ))}
    </main>
  )
}
