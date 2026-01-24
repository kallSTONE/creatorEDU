"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { useSupabase } from "@/components/providers/supabase-provider"

type DraftRow = {
    id: string
    user_id: string
    updated_at: string
}

export default function DraftsPage() {
    const { toast } = useToast()
    const { user, loading } = useSupabase()
    const [rows, setRows] = useState<DraftRow[]>([])
    const [busy, setBusy] = useState(false)

    const loadDrafts = async () => {
        if (loading) return
        setBusy(true)
        try {
            const { data, error } = await supabase
                .from("course_drafts")
                .select("id,user_id,updated_at")
                .order("updated_at", { ascending: false })

            if (error) throw error
            setRows((data as DraftRow[]) || [])
        } catch (e: any) {
            toast({ title: "Error", description: e?.message ?? "Failed to load drafts" })
        } finally {
            setBusy(false)
        }
    }

    useEffect(() => {
        loadDrafts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const clearAll = async () => {
        if (!user) return
        setBusy(true)
        try {
            const { error } = await supabase.from("course_drafts").delete().neq("user_id", "")
            if (error) throw error
            toast({ title: "All drafts cleared" })
            loadDrafts()
        } catch (e: any) {
            toast({ title: "Error", description: e?.message ?? "Failed to clear drafts" })
        } finally {
            setBusy(false)
        }
    }

    const clearMine = async () => {
        if (!user) return
        setBusy(true)
        try {
            const { error } = await supabase.from("course_drafts").delete().eq("user_id", user.id)
            if (error) throw error
            toast({ title: "Your draft cleared" })
            loadDrafts()
        } catch (e: any) {
            toast({ title: "Error", description: e?.message ?? "Failed to clear your draft" })
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="p-8">
            <Card className="max-w-4xl mx-auto bg-card">
                <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                        <CardTitle>Course Drafts</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={loadDrafts} disabled={busy}>Refresh</Button>
                            <Button variant="ghost" onClick={clearMine} disabled={busy || !user}>Clear Mine</Button>
                            <Button variant="destructive" onClick={clearAll} disabled={busy || !user}>Clear All</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {rows.length === 0 ? (
                        <div className="text-sm text-muted-foreground">No drafts found.</div>
                    ) : (
                        <div className="space-y-2">
                            {rows.map((r) => (
                                <div key={r.id} className="flex items-center justify-between border rounded p-2">
                                    <div className="text-sm">
                                        <div>Draft ID: {r.id}</div>
                                        <div className="text-muted-foreground">User: {r.user_id}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Updated: {new Date(r.updated_at).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
