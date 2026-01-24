'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real app, you'd send this to your API
      console.log('Email submitted:', email)
      setIsSubmitted(true)
      setEmail('')
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-montserrat font-bold">ወቅታዊ ማስታወቂያ</h2>
      <p className="mt-3 text-primary-foreground/80">
        ለዚህ ወቅት የተመረጡ ኮርሶች፣ የስራ ምክሮችና እድሎች ወቅታዊ ማስታወቂያ ይቀበሉ።
      </p>
      
      {isSubmitted ? (
        <div className="mt-8 inline-flex items-center bg-primary-foreground/10 text-primary-foreground px-4 py-3 rounded-lg">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          <span>ስለ ማስታወቂያ ስለተመዘገቡ! እባክዎ ኢሜይልዎን ያረጋግጡ።</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-primary-foreground/30"
          />
          <Button 
            type="submit"
            variant="secondary"
          >
            ይመዝገቡ
          </Button>
        </form>
      )}
      
      <p className="mt-4 text-xs text-primary-foreground/60">
        እኛ የግል መረጃዎን ግላዊነት እናከብራለን። በማንኛውም ጊዜ መመልስ ይችላሉ።
      </p>
    </div>
  )
}