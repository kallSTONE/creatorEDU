interface CourseHeroProps {
  videoUrl?: string
  poster: string
  title: string
  description: string
}

const extractYouTubeId = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
  )
  return match?.[1] || null
}

export function CourseHero({
  videoUrl,
  poster,
  title,
  description,
}: CourseHeroProps) {
  const videoId = videoUrl ? extractYouTubeId(videoUrl) : null

  return (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">

        {!videoId ? (
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <iframe
            className="w-full h-full rounded-lg border border-border"
            src={`https://www.embedlite.com/embed/${videoId}?controls=1`}
            title={title}
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 pointer-events-none">
          <h1 className="hidden text-4xl font-bold text-white">{title}</h1>
          <p className="hidden text-white mt-2 line-clamp-2">{description}</p>
        </div>
      </div>
  )
}
