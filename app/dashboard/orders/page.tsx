"use client"

import { useEffect, useMemo, useState } from "react"
import TransitionLink from "@/components/transition-link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/components/providers/supabase-provider"
import { ShoppingBag, CreditCard, Calendar, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"

type PaidEnrollment = {
    enrollment_id: string
    enrolled_at: string
    course: {
        id: string
        title: string
        slug: string | null
        hero_image: string | null
        image_url?: string | null
        price: number | null
        is_paid: boolean | null
    }
}

const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return "—"
    try {
        return new Intl.NumberFormat("en-ET", {
            style: "currency",
            currency: "ETB",
            maximumFractionDigits: 2,
        }).format(amount)
    } catch {
        return `${amount} ETB`
    }
}

export default function OrdersPage() {
    const router = useRouter()
    const { user, loading, supabase } = useSupabase()
    const [items, setItems] = useState<PaidEnrollment[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login")
        }
    }, [loading, user, router])

    useEffect(() => {
        if (!user) return

        const loadOrders = async () => {
            setIsLoading(true)
            const { data, error } = await supabase
                .from("course_enrollments")
                .select(
                    `
					id,
					enrolled_at,
					courses (
						id,
						title,
						slug,
						hero_image,
						image_url,
						price,
						is_paid
					)
				`
                )
                .eq("user_id", user.id)
                .eq("courses.is_paid", true)
                .order("enrolled_at", { ascending: false })

            if (error) {
                console.error("Error loading orders:", error)
                setItems([])
                setIsLoading(false)
                return
            }

            const normalized = (data || [])
                .map((row: any) => ({
                    enrollment_id: row.id,
                    enrolled_at: row.enrolled_at,
                    course: row.courses,
                }))
                .filter((row: PaidEnrollment) => row.course?.is_paid)

            setItems(normalized)
            setIsLoading(false)
        }

        loadOrders()
    }, [user, supabase])

    const totalSpent = useMemo(() => {
        return items.reduce((sum, item) => sum + (item.course.price ?? 0), 0)
    }, [items])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-pulse text-xl">Loading orders...</div>
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="container py-8 px-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-montserrat">My Orders</h1>
                    <p className="text-muted-foreground">Paid courses you are enrolled in</p>
                </div>
                <Button asChild>
                    <TransitionLink href="/learn">Browse courses</TransitionLink>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-primary" />
                            Orders
                        </CardTitle>
                        <CardDescription>{items.length} paid course{items.length === 1 ? "" : "s"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="text-center py-6 text-muted-foreground">Loading your orders...</div>
                        ) : items.length === 0 ? (
                            <div className="text-center py-6">
                                <p className="text-muted-foreground mb-4">No paid courses yet.</p>
                                <Button asChild>
                                    <TransitionLink href="/shop">Go to shop</TransitionLink>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.enrollment_id}
                                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-card/50"
                                    >
                                        <div className="sm:w-1/4 h-24 rounded-md overflow-hidden">
                                            <img
                                                src={item.course.hero_image || item.course.image_url || "https://placehold.co/600x400"}
                                                alt={item.course.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <h3 className="font-semibold">{item.course.title}</h3>
                                                <Badge className="bg-emerald-600">Paid</Badge>
                                            </div>

                                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                                <span className="inline-flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(item.enrolled_at).toLocaleDateString()}
                                                </span>
                                                <span className="inline-flex items-center gap-1">
                                                    <CreditCard className="h-4 w-4" />
                                                    {formatCurrency(item.course.price)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end">
                                            <Button variant="outline" size="sm" asChild>
                                                <TransitionLink href={item.course.slug ? `/learn/course/${item.course.slug}` : "/learn"}>
                                                    View course
                                                </TransitionLink>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                Summary
                            </CardTitle>
                            <CardDescription>Paid course totals</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Courses</span>
                                <span className="font-medium">{items.length}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Total spent</span>
                                <span className="font-medium">{formatCurrency(totalSpent)}</span>
                            </div>
                            <Button variant="secondary" className="w-full" asChild>
                                <TransitionLink href="/dashboard">Back to dashboard</TransitionLink>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
