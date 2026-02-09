"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LogOut,
  Settings,
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  BarChart3,
  ListChecks,
} from "lucide-react"
import { useSupabase } from "@/components/providers/supabase-provider"
import { useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, supabase, signOut } = useSupabase()
  const [loading, setLoading] = useState(true)

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Students", href: "/admin/students", icon: Users },
    { label: "Articles", href: "/admin/articles", icon: FileText },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Quizzes", href: "/admin/quizzes", icon: ListChecks },
  ]

  // -------------------------
  // AUTH: HANDLE LOADING + REDIRECTS
  // -------------------------
  useEffect(() => {
    // Supabase loads user asynchronously, so wait until it resolves.
    if (user !== undefined) {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login")
      } else if (user?.user_metadata?.role !== "admin") {
        router.replace("/login")
      }
    }
  }, [loading, user, router])

  // -------------------------
  // LOADING STATE
  // -------------------------
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking your session…</p>
      </div>
    )
  }

  // -------------------------
  // LOGOUT HANDLER
  // -------------------------
  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login"; // Redirect after logout
  }

  // -------------------------
  // RENDER ADMIN UI
  // -------------------------

  if (user?.user_metadata?.role !== "admin")
    return null;

  return (
    <div className="relative min-h-screen flex bg-background">

      {/* Sidebar */}
      <aside
        className={`
          group fixed top-0 left-0 h-full z-50
          bg-background border-r border-sidebar-border
          transition-all duration-300
          w-[60px] hover:w-64
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="px-6 py-10 border-b border-sidebar-border">
          <h1 className="font-bold text-lg text-sidebar-foreground">
            <span className="block group-hover:hidden text-center"></span>
            <span className="hidden group-hover:block text-xl"></span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`
                  relative w-full flex items-center
                  text-sidebar-foreground justify-center
                  group-hover:justify-start
                  transition-all duration-200 rounded-md
                  hover:bg-muted/30 hover:text-primary
                  before:absolute before:left-0 before:top-0 before:h-full before:w-1
                  before:bg-transparent hover:before:bg-primary
                `}
              >
                <item.icon size={20} className="flex-shrink-0" />
                <span className="ml-3 hidden group-hover:inline-block whitespace-nowrap">
                  {item.label}
                </span>
              </Button>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-2 bg-sidebar">
          <Button
            variant="ghost"
            className={`
              relative w-full flex items-center justify-center
              group-hover:justify-start text-sidebar-foreground
              transition-all duration-200 rounded-md
              hover:bg-muted/30 hover:text-primary
              before:absolute before:left-0 before:top-0 before:h-full before:w-1
              before:bg-transparent hover:before:bg-primary
            `}
          >
            <Settings size={20} className="flex-shrink-0" />
            <span className="ml-3 hidden group-hover:inline-block whitespace-nowrap">
              Settings
            </span>
          </Button>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className={`
              relative w-full flex items-center justify-center
              group-hover:justify-start text-sidebar-foreground
              transition-all duration-200 rounded-md
              hover:bg-muted/30 hover:text-red-600
              before:absolute before:left-0 before:top-0 before:h-full before:w-1
              before:bg-transparent hover:before:bg-red-600
            `}
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className="ml-3 hidden group-hover:inline-block whitespace-nowrap">
              Logout
            </span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-20 transition-all duration-300 min-h-screen">

        {/* Children content */}
        <main className="flex-1 bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
