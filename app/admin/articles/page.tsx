"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Eye, Edit2, Trash2, Calendar, User } from "lucide-react"

interface Article {
  id: number
  title: string
  author: string
  category: string
  views: number
  likes: number
  publishDate: string
  status: "published" | "draft" | "scheduled"
  readTime: number
}

const initialArticles: Article[] = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    author: "John Doe",
    category: "Programming",
    views: 2543,
    likes: 342,
    publishDate: "2024-03-15",
    status: "published",
    readTime: 8,
  },
  {
    id: 2,
    title: "Web Performance Best Practices",
    author: "Jane Smith",
    category: "Web Development",
    views: 1876,
    likes: 256,
    publishDate: "2024-03-10",
    status: "published",
    readTime: 12,
  },
  {
    id: 3,
    title: "Design Systems 101",
    author: "Mike Johnson",
    category: "Design",
    views: 1234,
    likes: 189,
    publishDate: "2024-03-05",
    status: "published",
    readTime: 10,
  },
  {
    id: 4,
    title: "Advanced TypeScript Patterns",
    author: "Sarah Williams",
    category: "Programming",
    views: 0,
    likes: 0,
    publishDate: "2024-03-20",
    status: "scheduled",
    readTime: 15,
  },
  {
    id: 5,
    title: "Building Scalable APIs",
    author: "Tom Brown",
    category: "Backend",
    views: 0,
    likes: 0,
    publishDate: "2024-03-18",
    status: "draft",
    readTime: 14,
  },
]

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft" | "scheduled">("all")

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || article.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: number) => {
    setArticles(articles.filter((article) => article.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    totalArticles: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
    totalLikes: articles.reduce((sum, a) => sum + a.likes, 0),
  }

  return (
    <div className="p-8 space-y-8">
      <p className="block md:hidden text-red-900/80">Please turn desktop mode on or rotate your device to landscape view.</p>
      {/* Header */}
      <div className="hidden md:flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Articles</h1>
          <p className="text-muted-foreground mt-2">Create and manage blog articles</p>
        </div>
        <Button className="gap-2">
          <Plus size={20} />
          New Article
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Articles</p>
              <p className="text-3xl font-bold text-foreground mt-2">{stats.totalArticles}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Published</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.published}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Views</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalViews.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Likes</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.totalLikes.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card hidden md:block">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <Input
                placeholder="Search articles or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "published", "draft", "scheduled"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  onClick={() => setFilterStatus(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      <Card className="bg-card hidden md:block">
        <CardHeader>
          <CardTitle>All Articles</CardTitle>
          <CardDescription>{filteredArticles.length} articles found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Author</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Views</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Likes</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Read Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Published</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium max-w-xs truncate">{article.title}</td>
                    <td className="py-4 px-4 text-muted-foreground flex items-center gap-2">
                      <User size={16} />
                      {article.author}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{article.category}</td>
                    <td className="py-4 px-4 text-foreground flex items-center gap-1">
                      <Eye size={16} className="text-blue-500" />
                      {article.views.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-foreground">❤️ {article.likes.toLocaleString()}</td>
                    <td className="py-4 px-4 text-muted-foreground">{article.readTime} min</td>
                    <td className="py-4 px-4 text-muted-foreground flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(article.publishDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(article.status)}`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(article.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
