'use client'

import Header from '@/components/layout/header'
import { useSupabase } from '@/components/providers/supabase-provider'

export default function AuthHeader() {
    const { user, loading } = useSupabase()

    if (loading || !user) {
        return null
    }

    return <Header />
}
