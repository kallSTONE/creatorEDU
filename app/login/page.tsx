'use client'

import { useEffect, useState } from 'react'
import TransitionLink from '@/components/transition-link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useSupabase } from '@/components/providers/supabase-provider'
import { useRouteLoading } from '@/components/route-loading-provider'
import { GraduationCap, Mail, Lock, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Lg from '@/public/assets/images/warkalogo.png'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function LoginPage() {
  const router = useRouter()
  const { startLoading } = useRouteLoading()
  const { signIn, user, loading } = useSupabase()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  // 🧭 Redirect user when authenticated
  useEffect(() => {
    if (!loading && user) {
      const redirectPath = localStorage.getItem('redirectAfterLogin')

      if (redirectPath) {
        localStorage.removeItem('redirectAfterLogin')
        startLoading()
        router.push(redirectPath)
      } else if (user?.user_metadata?.role === 'admin') {
        startLoading()
        router.push('/admin/dashboard')
      } else if (user?.user_metadata?.role === 'lawyer') {
        startLoading()
        router.push('/dashboard')
      } else if (user?.user_metadata?.role === 'reviewer') {
        startLoading()
        router.push('/reviewer')
      }
    }
  }, [user, loading, router])


    // Tabs
    const [activeTab, setActiveTab] = useState<'Email' | 'Phone'>('Email')
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await signIn(email, password)
      // ✅ No manual redirect here; redirect happens automatically when user updates
    } catch (error: any) {
      setError(error.message || 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <Tabs
        value={activeTab}
        onValueChange={(value: string) =>
          setActiveTab(value as 'Email' | 'Phone')
        }
        className="w-full mb-6"
      >
        <TabsList className="bg-transparent border-b-2 border-muted justify-center">
          <TabsTrigger value="Email" className="data-[state=active]:border-primary data-[state=active]:border-b-2">
            Email
          </TabsTrigger>
          <TabsTrigger value="Phone" className="data-[state=active]:border-primary data-[state=active]:border-b-2">
            Phone
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Email">
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <TransitionLink href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                  <Image src={Lg} alt="Tesfa Logo" className="h-[50px] w-auto" />
                </TransitionLink>
              </div>
              <CardTitle className="text-xl text-center pt-4">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <TransitionLink href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </TransitionLink>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </CardContent>
            </form>

            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                Don’t have an account?{' '}
                <TransitionLink href="/register" className="text-primary hover:underline">
                  Sign up
                </TransitionLink>
              </div>

            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="Phone">
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <TransitionLink href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                  <Image src={Lg} alt="Tesfa Logo" className="h-[50px] w-auto" />
                </TransitionLink>
              </div>
              <CardTitle className="text-xl text-center pt-4">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Enter your phone and password to access your account
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone">phone</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0987654321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <TransitionLink href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </TransitionLink>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </CardContent>
            </form>

            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                Don’t have an account?{' '}
                <TransitionLink href="/register" className="text-primary hover:underline">
                  Sign up
                </TransitionLink>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
      </Tabs>    


    </div>
  )
}
