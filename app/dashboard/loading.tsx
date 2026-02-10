export default function Loading() {
    return (
        <div className="container py-8 px-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="space-y-3">
                    <div className="h-8 w-60 rounded bg-muted animate-pulse" />
                    <div className="h-4 w-72 rounded bg-muted animate-pulse" />
                </div>
                <div className="flex gap-3">
                    <div className="h-10 w-32 rounded bg-muted animate-pulse" />
                    <div className="h-10 w-32 rounded bg-muted animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="rounded-xl border border-border bg-card p-6 space-y-4">
                            <div className="h-5 w-48 rounded bg-muted animate-pulse" />
                            <div className="h-3 w-full rounded bg-muted animate-pulse" />
                            <div className="h-3 w-5/6 rounded bg-muted animate-pulse" />
                            <div className="h-10 w-full rounded bg-muted animate-pulse" />
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="rounded-xl border border-border bg-card p-6 space-y-4">
                            <div className="h-5 w-40 rounded bg-muted animate-pulse" />
                            <div className="space-y-3">
                                <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
                                <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
                                <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
