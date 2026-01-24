'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface LessonTopicsCarouselProps {
  topics: Record<string, string> // { topic: description }
}

export function LessonCarousel({ topics }: LessonTopicsCarouselProps) {
  const entries = Object.entries(topics)
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 2 // Show 2 cards at a time

  const nextSlide = () => {
    if (startIndex + visibleCount < entries.length) {
      setStartIndex(startIndex + visibleCount)
    }
  }

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - visibleCount)
    }
  }

  const visibleTopics = entries.slice(startIndex, startIndex + visibleCount)

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">Lesson Topics</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={startIndex === 0}
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={startIndex + visibleCount >= entries.length}
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-hidden transition-transform">
        {visibleTopics.map(([topic, description]) => (
          <Card
            key={topic}
            className="p-4 min-w-[calc(50%-0.5rem)] flex-shrink-0 shadow-sm border border-border"
          >
            <h4 className="font-semibold text-base mb-2 text-primary">
              {topic}
            </h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </Card>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center mt-4 space-x-1">
        {Array.from({ length: Math.ceil(entries.length / visibleCount) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index * visibleCount)}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(startIndex / visibleCount) === index
                  ? 'bg-primary w-5'
                  : 'bg-muted-foreground/30'
              }`}
            />
          )
        )}
      </div>
    </div>
  )
}
