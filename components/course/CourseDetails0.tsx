'use client';

import { Course } from '@/lib/types';
import { BookOpen, Clock, Star, Users, Check, Signal, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CourseDetailsProps {
  course: Course;
}

export function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <div className="container mx-auto py-8 space-y-10">

      {/* Hero */}
      <div className="relative w-full h-72 rounded-lg overflow-hidden shadow-lg">
        <img src={course.hero_image} alt={course.title} className="w-full h-full object-cover"/>
        <div className="absolute right-0 inset-0 bg-black/40 flex flex-col justify-start text-right p-6">
          <h1 className="text-4xl font-bold text-white">{course.title}</h1>
          <p className="text-white mt-2 line-clamp-2">{course.description}</p>
        </div>
      </div>

     {/* Course Info */}
      
      <div className="flex justify-end p-6">

          <div className="w-full md:w-[60%] flex flex-col gap-y-7">

            <div className="flex gap-x-4">
              <Badge variant="secondary" className='h-6'><span className="flex items-center gap-1"><TrendingUp className="h-5 w-5"/>  {course.category}</span> </Badge>
              <Badge variant="secondary" className='h-6'><span className="flex items-center gap-1"><Signal className="h-5 w-5"/> {course.level} </span></Badge>
              <Badge variant="secondary" className='h-6'><span className="flex items-center gap-1"><Clock className="h-5 w-5"/> {course.estimated_hours} hrs</span></Badge>
            </div>

            {/* Lessons */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="flex items-center gap-3 text-2xl font-bold"><BookOpen className="w-6 h-6 align-middle"/>Lessons</h2>
              {course.lessons.map((lesson: any) => (
                <Card key={lesson.id} className="overflow-hidden">
                  <CardHeader className="flex justify-between items-center bg-gradient-to-r from-blue-300 to-indigo-900">
                    <CardTitle className="text-lg font-semibold">{lesson.step_order}. {lesson.title}</CardTitle>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4"/> {lesson.estimated_time} min
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">{lesson.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {lesson.topics.map((topic: string) => (
                        <Badge key={topic} variant="outline">{topic}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </div>


        <div className="md:sticky w-full md:w-[30%] p-4 bottom-10 z-49 bg-background space-y-4 shadow-md dark:shadow-[0_4px_10px_rgba(255,255,255,0.2)] border border-blue-300">

          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1"><Star className="h-5 w-5 text-yellow-400"/> {course.rating}</span>
            <span className="flex items-center gap-1"><Users className="h-5 w-5"/> {course.students.toLocaleString()} students</span>
            <span className="flex items-center gap-1"><Clock className="h-5 w-5"/> {course.estimated_hours} hrs</span>
          </div>
          
          <div>
            <h3 className="font-semibold mb-1">Level</h3>
            <p>{course.level}</p>
          </div>
          
          {course.requirements && (
            <div>
              <h3 className="font-semibold mb-1">Requirements</h3>
              <p>{course.requirements}</p>
            </div>
          )}
          {course.skills && (
            <div className="hidden sm:block">
              <h3 className="font-semibold mb-1">Skills you will learn</h3>
              <ul className="list-disc list-inside">
                {course.skills.split(',').map(skill => <li key={skill}>{skill.trim()}</li>)}
              </ul>
            </div>
          )}
          <Button className="w-full mt-4 shadow-[0px_2px_10px_rgba(255,255,0,0.5)]">Enroll Now</Button>
          
        </div>

    </div>
  );
}
