import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import CourseCarousel from '@/components/home/course-carousel'
import ArticleGrid from '@/components/home/article-grid'
import SuccessStories from '@/components/home/success-stories'
import NewsletterSignup from '@/components/home/newsletter-signup'
import Image from 'next/image'
import BgL1 from '@/public/assets/images/lawST2-.png'

export default function Home() {
  return (
    <div className="flex flex-col sm:items-center">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-background dark:via-blue-900/20 via-blue-900/15 to-transparent overflow-hidden w-full py-2 pl-12 pr-6 ">

        <div className="z-10 w-auto md:hidden bg-transparent h-[300px] overflow-hidden ">
          <Image src={BgL1} draggable="false" alt="Tesfa Logo" className="w-auto h-[400px] rounded-l-[150px] rounded-r-[50px]  bg-transparent" />
        </div>

        <div className="container z-10 py-12 md:py-20 md:w-[55%] bg-transparent">
          <div className="w-auto text-center md:text-left">
            <h1 className="font-montserrat text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              ስለ አንድ ክሪየተር / ኢንፍሉንሰር የተሰራ ስልጠና
            </h1>

            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              ይህ መድረክ በአንድ ክሪየተር (Creator) ወይም ኢንፍሉንሰር የተሰጠ ስልጠናዎችን ይሰጣል። እዚህ ላይ የተመረጡ ኮርሶች በአንድ ሰው በተለየ እርምጃ ይቀርባሉ።
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full items-center md:items-start sm:justify-start">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">ሲ</div>
                <div className="text-left">
                  <p className="font-semibold">ስም: ክሪየተር ሳማኤል</p>
                  <p className="text-sm text-muted-foreground">ሙዚቃ/ትምህርት ክሪየተር — ስልጠናዎች በፍጥነት ማስተላለፊያ</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex gap-3">
                <Button size="lg" asChild>
                  <Link href="/learn">ስልጠናዎች ይጀምሩ</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">ለ Creator ይገለጹ</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="z-10 w-[45%] hidden md:block bg-transparent h-[400px] overflow-hidden ">
          <Image src={BgL1} draggable="false" alt="Tesfa Logo" className="w-[450px] h-[400px] rounded-l-[150px] rounded-r-[50px]  bg-transparent" />
        </div>

        <div className="absolute z-1 inset-0 bg-gradient-to-r from-blue-900/10 via-blue-600/5 dark:via-background via-background to-transparent" />

      </section>

      {/* Performance */}
      <section className="py-10 my-2 bg-muted/30 w-full flex flex-col">

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-grey-900 p-6 rounded-lg">
          <div className="text-center">
            <p className="text-3xl font-bold">50</p>
            <p className="text-sm text-muted-foreground">ስልጠናዎች</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">2ሺህ</p>
            <p className="text-sm text-muted-foreground">ባለሙያዎች</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">100</p>
            <p className="text-sm text-muted-foreground">አሰልጣኞች</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">50</p>
            <p className="text-sm text-muted-foreground">ሰርተፊኬቶች</p>
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