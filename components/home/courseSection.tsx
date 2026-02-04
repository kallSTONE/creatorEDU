'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'
import type { Creator } from '@/data/creators'
import { CourseHero } from '@/components/course/CourseHero'

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
  introVideoUrl?: string
}

export default function CourseSection({ course }: { course: Course }) {
  return (
    <section className="relative min-h-screen w-full">
      {/* Background image */}
      <img
        src={course.image}
        alt={course.title}
        className="absolute opacity-15 inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end items-center px-6 pb-8 text-white md:px-16">

        <div className="w-full max-w-3xl my-8 ">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/60 to-black/30" />

          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full rounded-lg"
          />
        </div>

        <div className='relative flex flex-row w-full items-end justify-center'>

          {/* Creator info*/}
          <div className="absolute bottom-0 left-4 mt-4 flex items-center gap-3">
            <img
              src={course.creator.avatar}
              alt={course.creator.name}
              className="h-10 w-10 rounded-full"
            />
            <span className="text-sm text-white/80">
              By {course.creator.name}
            </span>
          </div>

          {/* Course info */}
          <div className='ml-[20%] mr-[20%] items-center flex flex-col'>
            <span className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-400">
              {course.category}
            </span>

            <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              {course.title}
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-white/80 text-center">
              {course.description}
            </p>

            {/* CTA / Locked */}
            <div className="mt-8">
              {course.published ? (
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-xl"
                >
                  <Link
                    href={`/learn/course/${course.slug}`}
                    className="flex flex-col items-center"
                  >
                    <span className="text-base font-semibold">
                      🚀 Start Learning Now
                    </span>
                    <span className="text-xs text-white/80">
                      Instant access • Cancel anytime
                    </span>
                  </Link>
                </Button>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-md bg-black/50 px-5 py-3 text-sm font-medium">
                  <Lock className="h-4 w-4" />
                  {course.available_label ?? 'Coming Soon'}
                </div>
              )}
            </div>

          </div>


        </div>
      </div>
    </section>
  )
}
