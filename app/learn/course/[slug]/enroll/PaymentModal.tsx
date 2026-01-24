'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react'

interface Course {
  title: string
  description: string
  hero_image?: string
  estimated_hours: number
}

interface PaymentModalProps {
  open: boolean
  course: Course
  onClose: () => void
  onPaymentSuccess: () => void
}

export default function PaymentModal({
  open,
  course,
  onClose,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [step, setStep] = useState<'review' | 'payment' | 'processing' | 'success'>('review')

  useEffect(() => {
    if (!open) setStep('review')
  }, [open])

  const handleFakePayment = () => {
    setStep('processing')
    setTimeout(() => {
      setStep('success')
      setTimeout(() => {
        onPaymentSuccess()
      }, 1200)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Complete Enrollment</DialogTitle>
        </DialogHeader>

        {/* STEP 1: REVIEW */}
        {step === 'review' && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-2">
                <img
                  src={course.hero_image || '/assets/images/default.jpg'}
                  alt={course.title}
                  className="rounded-md h-32 w-full object-cover"
                />
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {course.description}
                </p>

                <div className="flex justify-between text-sm mt-2">
                  <span>Course Length</span>
                  <span>{course.estimated_hours} hours</span>
                </div>

                <div className="flex justify-between font-semibold mt-2">
                  <span>Total</span>
                  <span>$49.00</span>
                </div>
              </CardContent>
            </Card>

            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Secure demo payment — no real charges
            </div>

            <Button className="w-full" onClick={() => setStep('payment')}>
              Proceed to Payment
            </Button>
          </div>
        )}

        {/* STEP 2: PAYMENT FORM */}
        {step === 'payment' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="w-4 h-4" />
              Card Details
            </div>

            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Card Number"
            />
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Name on Card"
            />

            <div className="flex gap-2">
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="MM / YY"
              />
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="CVV"
              />
            </div>

            <Button className="w-full" onClick={handleFakePayment}>
              Pay $49.00
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setStep('review')}
            >
              Back
            </Button>
          </div>
        )}

        {/* STEP 3: PROCESSING */}
        {step === 'processing' && (
          <div className="flex flex-col items-center py-8 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p className="text-sm">Processing payment...</p>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 'success' && (
          <div className="flex flex-col items-center py-8 space-y-2 text-green-600">
            <CheckCircle2 className="w-8 h-8" />
            <p className="font-semibold">Payment Successful!</p>
            <p className="text-sm text-muted-foreground">
              Enrolling you now...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
