'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

// Fake success stories data for demo purposes
const successStories = [
  {
    id: 1,
    name: 'Kidist Abebe',
    role: 'UX Designer at Dashen Bank',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'ስልጠናዎቹን በመውሰዴ በዳሽን ባንክ ውስጥ እንደ UX አርነት መሥራት ጀመርሁ። እነዚህ ኮርሶች ብቻ ሳይሆን የሚያግዙኝ ማህበረሰብ እንዲኖረኝ አደረጉ።',
    course: 'የ ፍርድ ቤት አርነት መሠረታዊ ኮርስ',
  },
  {
    id: 2,
    name: 'Henok Tesfaye',
    role: 'Software Engineer at Ethio Telecom',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'ይህን ስልጠና በመውሰድ እኔ እንደ ሶፍትዌር ምህንድር በኢትዮ ቴሌኮም ላይ መሥራት ጀመርሁ። ኮርሱ በጣም ቀላል እና ተግባራዊ ነበር።',
    course: 'Web Development Bootcamp',
  },
  {
    id: 3,
    name: 'Frehiwot Tadesse',
    role: 'Founder of GreenEthiopia',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'የ ቤተሰብ ህግ ኮርሱ እንደ ንግድ ባለቤት ለእኔ በጣም አስፈላጊ ነበር። እንዲሁም የኔን ድርጅት GreenEthiopia መጀመር እና ማስተዳደር ለማድረግ እገዛ አደረገ።',
    course: 'Entrepreneurship Essentials',
  },
]

export default function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const nextStory = () => {
    setActiveIndex((prev) => (prev + 1) % successStories.length)
  }
  
  const prevStory = () => {
    setActiveIndex((prev) => (prev - 1 + successStories.length) % successStories.length)
  }
  
  const activeStory = successStories[activeIndex]
  
  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="border-none shadow-md bg-background">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden">
              <img 
                src={activeStory.image} 
                alt={activeStory.name}
                className="w-auto max-h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:hidden">
                <h3 className="text-white text-xl font-bold">{activeStory.name}</h3>
                <p className="text-white/80 text-sm">{activeStory.role}</p>
              </div>
            </div>
            
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <Quote className="h-10 w-10 text-primary/20 mb-4" />
              
              <blockquote className="text-lg italic mb-6">
                {activeStory.quote}
              </blockquote>
              
              <div className="mt-auto">
                <div className="hidden md:block">
                  <h3 className="text-xl font-bold">{activeStory.name}</h3>
                  <p className="text-muted-foreground">{activeStory.role}</p>
                </div>
                
                <div className="text-sm mt-2">
                  <span className="text-muted-foreground">Course completed: </span>
                  <span className="font-medium">{activeStory.course}</span>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="flex space-x-1">
                    {successStories.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeIndex === index ? 'bg-primary w-6' : 'bg-primary/30'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={prevStory}
                      className="h-8 w-8 rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={nextStory}
                      className="h-8 w-8 rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}