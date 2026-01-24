"use client"

import React from "react"

const resources = [
    {
        key: "contract-samples",
        title: "የውል ናሙና ፋይሎች (Contract Samples)",
        description: "ከተጠቃሚ ውል ናሙናዎች እና ምሳሌዎች፣ የሕግ ስራ ለማቀናበር የሚረዱ።",
    },
    {
        key: "court-filing-guide",
        title: "የፍርድ ሰነድ ማቅረብ መመሪያ (Court Filing Guide)",
        description: "ፍርድ ቤት ላይ ሰነዶችን እንዴት እንደሚያቀርቡ የሚገልፅ መመሪያ።",
    },
    {
        key: "human-rights-summary",
        title: "የሰብአዊ መብቶች አጭር እትም (Human Rights Summary)",
        description: "የመጀመሪያ ሥርዓት የሰብአዊ መብቶች ማጠቃለያ።",
    },
    {
        key: "sample-pleadings",
        title: "የማመልከቻ ናሙና (Sample Pleadings)",
        description: "የፍርድ ሂደት ውስጥ የሚጠቀሙ ማመልከቻ ናሙናዎች።",
    },
]

export default function ResourcesPage() {
    return (
        <div className="min-h-screen p-8 bg-background text-foreground">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">ሀብቶች — የሕግ ፋይሎች</h1>
                <p className="text-sm text-muted-foreground mb-6">ይህ ገጽ ለሕግ ዝርዝሮች የተዘጋጀ ፋይሎችን ይወስዳል። “Download” ን ይጫኑ ፣ ፋይሉ እንዲወርድ ይጠቀሙ።</p>

                <div className="space-y-4">
                    {resources.map((r) => (
                        <div key={r.key} className="p-4 border rounded-md bg-card">
                            <h2 className="text-lg font-semibold">{r.title}</h2>
                            <p className="text-sm text-muted-foreground mb-3">{r.description}</p>

                            <div className="flex gap-3">
                                <a
                                    href={`/api/download?file=${encodeURIComponent(r.key)}`}
                                    className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-95"
                                >
                                    Download PDF
                                </a>

                                <a
                                    href={`/api/download?file=${encodeURIComponent(r.key)}`}
                                    className="inline-flex items-center px-4 py-2 rounded-md border"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open in new tab
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}