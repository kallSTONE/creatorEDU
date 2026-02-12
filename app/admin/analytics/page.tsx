"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Calendar } from "lucide-react"

const analyticsData = {
  revenueByMonth: [
    { month: "Jan", revenue: 4000, expenses: 2400 },
    { month: "Feb", revenue: 5200, expenses: 2800 },
    { month: "Mar", revenue: 6800, expenses: 3200 },
    { month: "Apr", revenue: 7500, expenses: 3500 },
    { month: "May", revenue: 8900, expenses: 4000 },
    { month: "Jun", revenue: 9200, expenses: 4200 },
  ],
  userGrowth: [
    { week: "Week 1", students: 120, instructors: 15 },
    { week: "Week 2", students: 280, instructors: 22 },
    { week: "Week 3", students: 450, instructors: 28 },
    { week: "Week 4", students: 620, instructors: 35 },
    { week: "Week 5", students: 850, instructors: 42 },
    { week: "Week 6", students: 1234, instructors: 58 },
  ],
  coursePerformance: [
    { name: "React Fundamentals", completion: 85, satisfaction: 4.8 },
    { name: "Advanced TypeScript", completion: 72, satisfaction: 4.9 },
    { name: "UI/UX Design", completion: 68, satisfaction: 4.7 },
    { name: "Web Performance", completion: 80, satisfaction: 4.6 },
    { name: "Business Strategy", completion: 45, satisfaction: 4.5 },
  ],
  trafficSources: [
    { name: "Organic", value: 45 },
    { name: "Direct", value: 25 },
    { name: "Referral", value: 20 },
    { name: "Paid", value: 10 },
  ],
  deviceBreakdown: [
    { name: "Desktop", value: 55 },
    { name: "Mobile", value: 35 },
    { name: "Tablet", value: 10 },
  ],
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-2">Comprehensive platform insights and metrics</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Calendar size={20} />
          Last 30 Days
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div>
              <p className="text-muted-foreground text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-foreground mt-2">ETB 240,700</p>
              <p className="text-xs text-green-600 mt-2">+12% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div>
              <p className="text-muted-foreground text-sm">Total Users</p>
              <p className="text-3xl font-bold text-foreground mt-2">1,292</p>
              <p className="text-xs text-green-600 mt-2">+18% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div>
              <p className="text-muted-foreground text-sm">Avg. Session Duration</p>
              <p className="text-3xl font-bold text-foreground mt-2">24m 32s</p>
              <p className="text-xs text-green-600 mt-2">+5% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div>
              <p className="text-muted-foreground text-sm">Conversion Rate</p>
              <p className="text-3xl font-bold text-foreground mt-2">3.24%</p>
              <p className="text-xs text-green-600 mt-2">+0.5% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.revenueByMonth}>
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
                <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Students and instructors over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData.userGrowth}>
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
                <Area type="monotone" dataKey="students" stackId="1" fill="#3b82f6" stroke="#3b82f6" />
                <Area type="monotone" dataKey="instructors" stackId="1" fill="#10b981" stroke="#10b981" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where users come from</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.trafficSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>User access by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.deviceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.deviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Course Performance</CardTitle>
          <CardDescription>Completion rates and satisfaction scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analyticsData.coursePerformance.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{course.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {course.completion}% • {course.satisfaction} ⭐
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Completion</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: `${course.completion}%` }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Satisfaction</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(course.satisfaction / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
