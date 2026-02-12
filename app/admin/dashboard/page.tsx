"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const defaultDashboard = {
  stats: [
    { label: "Total Students", value: "1,234", change: "+12%", icon: "👥" },
    { label: "Active Courses", value: "24", change: "+3%", icon: "📚" },
    { label: "Published Articles", value: "156", change: "+8%", icon: "📝" },
    { label: "Total Revenue", value: "ETB 145,231", change: "+23%", icon: "💰" },
  ],
  enrollmentTrend: [
    { month: "Jan", students: 400, courses: 240 },
    { month: "Feb", students: 520, courses: 290 },
    { month: "Mar", students: 680, courses: 320 },
    { month: "Apr", students: 750, courses: 350 },
    { month: "May", students: 920, courses: 380 },
    { month: "Jun", students: 1234, courses: 420 },
  ],
  courseDistribution: [
    { name: "Programming", value: 35 },
    { name: "Design", value: 25 },
    { name: "Business", value: 20 },
    { name: "Other", value: 20 },
  ],
  recentActivity: [
    { id: 1, action: "New student enrolled", course: "React Basics", time: "2 hours ago" },
    { id: 2, action: "Course published", course: "Advanced TypeScript", time: "5 hours ago" },
    { id: 3, action: "Article created", course: "Web Performance Tips", time: "1 day ago" },
    { id: 4, action: "Student completed course", course: "CSS Mastery", time: "2 days ago" },
  ],
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(defaultDashboard)

  useEffect(() => {
    const load = async () => {
      try {
        const [{ data: courses, error: coursesError }, { count: lawyerCount, error: profilesError }] = await Promise.all([
          supabase.from('courses').select('id, category, students'),
          supabase.from('profiles').select('id', { count: 'exact' }).ilike('role', 'lawyer').limit(1),
        ])

        if (coursesError) throw coursesError
        if (profilesError) throw profilesError

        const activeCourses = Array.isArray(courses) ? courses.length : 0
        const totalStudents = typeof lawyerCount === 'number' ? lawyerCount : 0

        // Derive distribution by category (percentage of courses per category)
        const byCategory: Record<string, number> = {}
        if (Array.isArray(courses)) {
          courses.forEach((c: any) => {
            const key = (c.category || 'Other') as string
            byCategory[key] = (byCategory[key] || 0) + 1
          })
        }
        const total = Object.values(byCategory).reduce((a, b) => a + b, 0) || 0
        const dist = total > 0
          ? Object.entries(byCategory).map(([name, count]) => ({ name, value: Math.round((count / total) * 100) }))
          : defaultDashboard.courseDistribution

        // Compose new stats with real numbers where available
        const stats = [
          { label: 'Total Students', value: totalStudents.toLocaleString(), change: '+', icon: '👥' },
          { label: 'Active Courses', value: activeCourses.toLocaleString(), change: '+', icon: '📚' },
          defaultDashboard.stats[2], // Published Articles (mock)
          defaultDashboard.stats[3], // Total Revenue (mock)
        ]

        setDashboardData({
          stats,
          enrollmentTrend: defaultDashboard.enrollmentTrend, // mock (no supabase source)
          courseDistribution: dist,
          recentActivity: defaultDashboard.recentActivity, // mock (no supabase source)
        })
      } catch (err) {
        console.error('Dashboard load failed', err)
        // Fall back to defaults if Supabase fails
        setDashboardData(defaultDashboard)
      }
    }
    load()
  }, [])

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2 hidden md:block">Welcome back! Here's your platform overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((stat, index) => (
          <Card key={index} className="bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-green-600 mt-2">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Trend */}
        <Card className="lg:col-span-2 bg-card">
          <CardHeader>
            <CardTitle>Enrollment Trend</CardTitle>
            <CardDescription>Student and course growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
                <Line type="monotone" dataKey="courses" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Distribution */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Course Distribution</CardTitle>
            <CardDescription>By category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.courseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest platform activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between pb-4 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.course}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
