'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  GraduationCap, BookOpen, Users, ShoppingBag,
  Menu, X, Sun, Moon, Globe
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSupabase } from '@/components/providers/supabase-provider'
import { UserNav } from '@/components/user-nav'
import Lg from '@/public/assets/images/warkalogo.png'

const navigation = [
  { name: 'ዋና ገጽ', href: '/' },
  { name: 'ስልጠናዎች', href: '/learn' },
  { name: 'ማህበር', href: '/community' },
  { name: 'መገበያያ', href: '/shop' },
  { name: 'መዝገብ', href: '/resources' },
  { name: 'Pr', href: '/presentation' },
  { name: 'ስለ እኛ', href: '/about' },
]

function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" className="opacity-0 pointer-events-none">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { user } = useSupabase()
  const lawyerExcludedNames = ['ማህበር', 'መገበያያ', 'ስለ እኛ', 'Pr'];

  const filteredNavigation = navigation.filter((item) => {

  // No user or admin → show everything
  if (!user || user?.user_metadata?.role === 'admin') {
    return true;
  }

  // Lawyer → exclude specific links
  if (user?.user_metadata?.role === 'lawyer') {
    return !lawyerExcludedNames.includes(item.name);
  }

  return true;
});


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      'sticky top-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-background/75 backdrop-blur-md border-b shadow-sm'
        : 'bg-transparent'
    )}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Image src={Lg} alt="Tesfa Logo" className="h-[40px] w-auto " />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {filteredNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors",
                pathname === item.href
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>


        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 items-center">
          <Button variant="ghost" size="icon" aria-label="Toggle language">
            <Globe className="h-5 w-5" />
          </Button>
          <ThemeToggleButton />

          {user ? (
            <UserNav />
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <Image src={Lg} alt="Tesfa Logo" className="h-[25px] w-auto " />
              </Link>              
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="flex flex-col lg:gap-x-8">
                  {filteredNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-sm font-semibold leading-6 transition-colors",
                        pathname === item.href
                          ? "text-primary font-bold"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="py-6 space-y-4 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" aria-label="Toggle language">
                      <Globe className="h-5 w-5" />
                    </Button>
                    <ThemeToggleButton />
                  </div>

                  {user ? (
                    <UserNav />
                  ) : (
                    <div className="flex flex-col gap-2 w-full">
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}