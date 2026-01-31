import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CourseCarousel from '@/components/home/course-carousel'
import ArticleGrid from '@/components/home/article-grid'
import SuccessStories from '@/components/home/success-stories'
import NewsletterSignup from '@/components/home/newsletter-signup'
import Image from 'next/image'
import BgL1 from '@/public/assets/images/logo1.png'
import HeroVideo from '@/components/home/HeroVideo'


export default function Home() {
  return (
    <div className="flex flex-col sm:items-center">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center w-full overflow-hidden bg-gradient-to-r from-background via-blue-900/15 dark:via-blue-900/20 to-transparent py-2 pl-12 pr-6">

        {/* Text */}
        <div className="z-10 py-6 text-center md:py-20 md:w-[55%]">
          <h1 className="font-montserrat text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl select-none">
            ስለ አንድ ክሪየተር / ኢንፍሉንሰር የተሰራ ስልጠና
          </h1>

          <p className="mt-4 text-lg text-muted-foreground md:text-xl select-none">
            ይህ መድረክ በአንድ ክሪየተር ወይም ኢንፍሉንሰር የተሰጠ ስልጠናዎችን ይሰጣል።
          </p>

          <div className="mt-6">
            <Button
              size="lg"
              asChild
              className="
                relative overflow-hidden
                bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                text-white font-semibold
                shadow-lg shadow-purple-500/30
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50
                active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2
              "
            >
              <Link href="/learn" className="relative z-10 px-8 py-4">
                Explore programs →
              </Link>
            </Button>
          </div>

        </div>

        {/* Hero Video (desktop only) */}
        <div className="z-10 w-full justify-center py-12 md:flex">
          <HeroVideo />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-background to-transparent" />
      </section>

      {/* Trusted By */}
      <section className="py-12 my-2 w-full bg-gradient-to-r from-background via-blue-900/15 dark:via-blue-900/20 to-transparent overflow-hidden">

        <h2 className="text-center text-xl sm:text-2xl font-semibold mb-8">
          Our instructors are trusted by
        </h2>

        <div className="relative w-full overflow-hidden">
          {/* Scrolling container */}
          <div className="flex w-max animate-scroll gap-12 px-6">
            {[
              "/logos/google.svg",
              "/logos/microsoft.svg",
              "/logos/amazon.svg",
              "/logos/meta.svg",
              "/logos/netflix.svg",
              "/logos/apple.svg",
              // duplicate for seamless loop
              "/logos/google.svg",
              "/logos/microsoft.svg",
              "/logos/amazon.svg",
              "/logos/meta.svg",
              "/logos/netflix.svg",
              "/logos/apple.svg",
            ].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[140px] opacity-80 hover:opacity-100 transition"
              >
                <img
                  src={logo}
                  alt="Company logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Featured Courses Section */}
      <section className="py-16 bg-background w-full">
        <div className=" container px-16 ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 ">
            <div>
              <h2 className="text-3xl font-montserrat font-bold">የተመረጡ ስልጠናዎች</h2>
              <p className="text-muted-foreground mt-2">
                ከኢትዮፕያ ጠበቆች ማህበር ፈቃድ ያገኙ የስልጠና ኮርሶች
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0" asChild>
              <Link href="/learn">ሁሉንም ስልጠናዎች ይመልከቱ</Link>
            </Button>
          </div>

          <CourseCarousel />
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="p-16 bg-muted/30 w-full">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-montserrat font-bold">የቅርብ ጊዜ ጽሑፎች</h2>
              <p className="text-muted-foreground mt-2">
                ወቅታዊ ህግ ዜናዎችን እና ምክሮችን ያግኙ።
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0" asChild>
              <Link href="/blog">ሁሉንም ጽሑፎች ይመልከቱ</Link>
            </Button>
          </div>

          <ArticleGrid />
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold">የተማሪዎቻችን ስኬት</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              የ ሌሎች ተማሪዎቻችን የስኬታቸው ታሪኮችን ያነሱ።
            </p>
          </div>

          <SuccessStories />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary w-full text-primary-foreground">
        <div className="container">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  )
}
