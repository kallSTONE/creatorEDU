'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type UserRole = 'lawyer' | 'mentor' | 'admin' | 'reviewer'

type SupabaseUser = {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
    role?: UserRole
  }
}

type SupabaseContextType = {
  supabase: typeof supabase
  user: SupabaseUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, metadata?: object) => Promise<void>
  signOut: () => Promise<void>
}

/* -------------------------------------------------------------------------- */
/* Context                                                                     */
/* -------------------------------------------------------------------------- */

const SupabaseContext = createContext<SupabaseContextType>({
  supabase,
  user: null,
  loading: true,
  signIn: async () => { },
  signUp: async () => { },
  signOut: async () => { },
})

export const useSupabase = () => useContext(SupabaseContext)

/* -------------------------------------------------------------------------- */
/* Provider                                                                    */
/* -------------------------------------------------------------------------- */

export function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role, avatar_url, full_name')
            .eq('id', session.user.id)
            .single()

          if (error) {
            console.error('Failed to load profile:', error)
          }

          setUser({
            id: session.user.id,
            email: session.user.email ?? undefined,
            user_metadata: {
              full_name:
                profile?.full_name ??
                session.user.user_metadata?.full_name,
              avatar_url:
                profile?.avatar_url ??
                session.user.user_metadata?.avatar_url,
              role: (profile?.role as UserRole) ?? 'lawyer',
            },
          })
        } else {
          setUser(null)
        }

        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  /* ------------------------------------------------------------------------ */
  /* Auth Helpers                                                             */
  /* ------------------------------------------------------------------------ */

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      })
    } catch (error: any) {
      toast({
        title: 'Authentication error',
        description: error.message ?? 'Failed to sign in.',
        variant: 'destructive',
      })
    }
  }

  const signUp = async (
    email: string,
    password: string,
    metadata: object = {}
  ) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata },
      })
      if (error) throw error

      toast({
        title: 'Account created',
        description: 'Please check your email to confirm your account.',
      })
    } catch (error: any) {
      toast({
        title: 'Registration error',
        description: error.message ?? 'Failed to create account.',
        variant: 'destructive',
      })
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)

      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      })
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to sign out.',
        variant: 'destructive',
      })
    }
  }

  /* ------------------------------------------------------------------------ */

  return (
    <SupabaseContext.Provider
      value={{
        supabase,
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  )
}
