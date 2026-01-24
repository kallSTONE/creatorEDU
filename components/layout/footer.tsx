import Link from 'next/link'
import { cn } from '@/lib/utils'
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Lg from '@/public/assets/images/warkalogo.png'

const footerLinks = [
  {
    title: 'አገልግሎቶች',
    links: [
      { name: 'ስልጠናዎች', href: '/learn' },
      { name: 'ማህበር', href: '/community' },
      { name: 'መገበያያ', href: '/shop' },
      { name: 'መዝገብ', href: '/resources' },
      { name: 'አሰልጣኞች', href: '/mentors' },
    ],
  },
  {
    title: 'ኩነቶች',
    links: [
      { name: 'ስለ እኛ', href: '/about' },
      { name: 'ብሎግ', href: '/blog' },
      { name: 'ስራዎች', href: '/careers' },
      { name: 'አጋርዎች', href: '/partners' },
      { name: 'አግኙን', href: '/contact' },
    ],
  },
  {
    title: 'የ መተግበሪያ ህጎች',
    links: [
      { name: 'ውሎች', href: '/terms' },
      { name: 'የግል መረጃ ፖሊሲ', href: '/privacy' },
      { name: 'ኩኪዎች', href: '/cookies' },
      { name: 'ፈቃዶች', href: '/licensing' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-muted/40 sticky">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Image src={Lg} alt="Tesfa Logo" className="h-[30px] w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              በ ኢትዮፕያ ውስጥ ለህግ ተማሪዎች እና ባለሙያዎች ከፍተኛ ጥራት ያላቸው ስልጠናዎችና እና የብቃት ማረጋግርጫ ፈተናዎችን ከ ኢ.ጠ.ማ ጋር በመተባበረ ያቀርባል።
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerLinks.slice(0, 2).map((group) => (
                <div key={group.title} className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold">{group.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                {footerLinks.slice(2, 3).map((group) => (
                  <div key={group.title}>
                    <h3 className="text-sm font-semibold">{group.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {group.links.map((link) => (
                        <li key={link.name}>
                          <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Contact</h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="mailto:info@careerguide.et" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      info@careerguide.et
                    </a>
                  </li>
                  <li>
                    <a href="tel:+251911234567" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      +251 911 234 567
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Addis Ababa, Ethiopia
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-sm font-semibold mb-3">Subscribe to our newsletter</h3>
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email address" 
                  type="email" 
                  className="max-w-xs" 
                />
                <Button>Subscribe</Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ዋርካ . ሁሉም መብቶች የተጠበቁ ናቸው።
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}