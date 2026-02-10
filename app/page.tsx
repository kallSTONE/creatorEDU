import TransitionLink from '@/components/transition-link'
import { Button } from '@/components/ui/button'
import CourseCarousel from '@/components/home/course-carousel'
import ArticleGrid from '@/components/home/article-grid'
import SuccessStories from '@/components/home/success-stories'
import NewsletterSignup from '@/components/home/newsletter-signup'
import HeroVideo from '@/components/home/HeroVideo'


export default function Home() {
  const companyLogos = [
    { file: 'Addis Ababa University Logo.png', name: 'Addis Ababa University' },
    { file: 'Amole Logo.png', name: 'Amole' },
    { file: 'Awash International Bank Logo.svg', name: 'Awash International Bank' },
    { file: 'Bank of Abyssinia Logo.svg', name: 'Bank of Abyssinia' },
    { file: 'blueMoon Logo.svg', name: 'BlueMoon' },
    { file: 'CBE Birr ( No background ) Logo.svg', name: 'CBE Birr' },
    { file: 'Chapa Logo.svg', name: 'Chapa' },
    { file: 'Commercial Bank of Ethiopia Logo.png', name: 'Commercial Bank of Ethiopia' },
    { file: 'Dashen Bank Logo.png', name: 'Dashen Bank' },
    { file: 'Ethio Telecom Logo.svg', name: 'Ethio Telecom' },
    { file: 'Gasha Digital Logo.svg', name: 'Gasha Digital' },
    { file: 'Hibret Bank Logo.png', name: 'Hibret Bank' },
    { file: 'Hibret Bank Logo.svg', name: 'Hibret Bank' },
    { file: 'iceaddis Logo.svg', name: 'iceaddis' },
    { file: 'Loline Mag Logo.png', name: 'Loline Mag' },
    { file: 'Ministry of Transport Logo.png', name: 'Ministry of Transport' },
    { file: 'Office of The Prime Minister Logo.png', name: 'Office of the Prime Minister' },
  ]

  return (
    <div className="flex flex-col sm:items-center">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center w-full overflow-hidden bg-gradient-to-r from-background via-blue-900/15 dark:via-blue-900/20 to-transparent py-2 pl-12 pr-6">

        {/* Text */}
        <div className="z-10 py-6 text-center md:py-20 md:w-[55%]">
          <h1 className="font-montserrat text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl select-none">
            ዲጂታል ክህሎቶን በማሳደግ የተጨማሪ ደምወዝ ተከፋይ ይሁኑ
          </h1>

          <p className="mt-4 text-lg text-muted-foreground md:text-xl select-none">
            Video Editing, Website Development, AI Fundamentals ስልጠናዎችን እንሰጣለን።
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
              <TransitionLink href="/learn" className="relative z-10 px-8 py-4">
                Explore programs →
              </TransitionLink>
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
          Our Graduates are employeed at
        </h2>

        <div className="relative w-full overflow-hidden">
          {/* Scrolling container */}
          <div className="flex w-max animate-scroll gap-12 px-6">
            {[...companyLogos, ...companyLogos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[140px] opacity-80 hover:opacity-100 transition"
              >
                <img
                  src={encodeURI(`/assets/images/companyLogos/${logo.file}`)}
                  alt={`${logo.name} logo`}
                  className="h-10 w-auto object-contain opacity-60"
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Courses Section */}
      <section className="py-16 bg-background w-full">
        <div className=" w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 px-16">
            <div>
              <h2 className="text-3xl font-montserrat font-bold">የተመረጡ ስልጠናዎች</h2>
              <p className="text-muted-foreground mt-2">
                ከኢትዮፕያ ጠበቆች ማህበር ፈቃድ ያገኙ የስልጠና ኮርሶች
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0" asChild>
              <TransitionLink href="/learn">ሁሉንም ስልጠናዎች ይመልከቱ</TransitionLink>
            </Button>
          </div>

          <CourseCarousel />
        </div>
      </section>

      {/* Benefits of Learning with warka */}
      <section className="py-16 bg-gradient-to-r from-background via-blue-900/15 dark:via-blue-900/20 to-transparent w-full px-8">
        <div className="container ">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold">የ ዋርካ ጥቅሞች</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              የ ዋርካ ስልጠናዎችን ለምን መምረጥ እንደሚገባው ያግኙ።
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10 text-blue-700">
                <span className="text-lg">🎬</span>
              </div>
              <h3 className="text-lg font-semibold">ከመጀመሪያ ፍሬም እስከ ፍጹም ቪዲዮ</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                የቪዲዮ ኤዲቲንግ መሰረቶች፣ ድምፅ ማሻሻል እና ቀለም ማቀናበርን በእጅ ትማራላችሁ።
              </p>
            </div>

            <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700">
                <span className="text-lg"> 📱 </span>
              </div>
              <h3 className="text-lg font-semibold">ለኢትዮጵያ ገበያ ተስማሚ ይዘት</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                በባህላችን እና በአካባቢ ትርጉም የሚገባ ቪዲዮ እና ቀለል ያለ ታሪክ እንዴት እንደሚሰራ ይማራሉ።
              </p>
            </div>

            <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-600/10 text-amber-700">
                <span className="text-lg">⚡</span>
              </div>
              <h3 className="text-lg font-semibold">ፈጣን የስራ ፕሮሴስ</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                በቀላሉ የሚቀጥለው የፕሮጀክት ፍሰት፣ ፋይል አደራጅት እና ቴምፕሌት ስራ እንዲቀንስ ትማራላችሁ።
              </p>
            </div>

            <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/10 text-purple-700">
                <span className="text-lg">🧠</span>
              </div>
              <h3 className="text-lg font-semibold">የታሪክ መስራት ክህሎት</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                ተመልካቾችን የሚያገናኝ የቪዲዮ ትምክህት፣ ንብረት መዋቅር እና ቅንብር ትኩረት ታገኛላችሁ።
              </p>
            </div>

            <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-600/10 text-rose-700">
                <span className="text-lg">💼</span>
              </div>
              <h3 className="text-lg font-semibold">ፖርትፎሊዮ እና የክለይንት እርምጃ</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                ስራ ለማሳየት የሚረዱ ንጥረ ስራዎች ይገነባሉ፣ የሚገባ ዋጋ እና የክለይንት ግንኙነት ይማራሉ።
              </p>
            </div>

            <div className="group rounded-2xl border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-600/10 text-slate-700">
                <span className="text-lg">🤝</span>
              </div>
              <h3 className="text-lg font-semibold">ማህበረሰብ እና ድጋፍ</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                ከሀገር ውስጥ እና ውጭ ፈጣሪዎች ጋር የሚያገናኝ ኔትዎርክ፣ ክለሳ እና ቀጣይ መመሪያ ታገኛላችሁ።
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the Instructor */}
      <section className="py-16 bg-background w-full px-8">
        <div className="container flex flex-col md:flex-row items-center gap-12 p-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-montserrat font-bold mb-4">ስለ መምህሩ</h2>
            <p className="text-muted-foreground mb-6">
              የኢትዮፕያ ጠበቆች ማህበር ፈቃድ ያገኙ መምህሩ በዲጂታል ክህሎቶች ላይ ከ10 ዓመታት በላይ ልምድ አለው።
            </p>
            <p className="text-muted-foreground mb-6">
              ከዚህ በተጨማሪ ብ ዩቱብና በቲክቶክ ላይ ከ10 ዓመታት በላይ ልምድ አለው።
            </p>
            <p className="text-muted-foreground mb-6">
              የኢትዮፕያ ጠበቆች ማህበር ፈቃድ ያገኙ መምህሩ በዲጂታል ክህሎቶች ላይ ከ10 ዓመታት በላይ ልምድ አለው።
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/assets/images/instructors/avatar1.png"
              alt="Instructor Image"
              className="rounded-lg shadow-lg object-cover w-full h-80"
            />
          </div>
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
              <TransitionLink href="/blog">ሁሉንም ጽሑፎች ይመልከቱ</TransitionLink>
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