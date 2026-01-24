import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User } from 'lucide-react'
import { format } from 'date-fns'
import articles from '@/data/articles'

type Props = {
    params: { id: string }
}

export default function ArticlePage({ params }: Props) {
    const id = Number(params.id)
    const article = articles.find((a) => a.id === id)
    if (!article) return notFound()

    const date = new Date(article.date)

    return (
        <div className="p-8">
            <Card className="max-w-4xl mx-auto bg-card">
                <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" /> {article.author}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" /> {format(date, 'PPP')}
                        </span>
                        <Badge variant="secondary">{article.category}</Badge>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <img src={article.image} alt={article.title} className="w-full rounded object-cover max-h-72" />
                    </div>
                    <div className="prose max-w-full">
                        <p>{article.body}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
