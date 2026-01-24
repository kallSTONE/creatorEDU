// app/about/page.tsx
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AboutPage() {
  return (
    <main className="w-full mx-auto py-12">
      {/* Hero */}
      <section className="flex flex-col px-10 space-y-10 items-center w-full border border-red-900 bg-background-start-rgb">

        <div className="space-y-6 flex flex-col items-center py-8 border shadow-sm">

          <h1 className="text-4xl text-center md:text-5xl font-extrabold leading-tight">
            Tesfa — Empowering Ethiopian Youth through Practical Learning
          </h1>

          <p className="mt-4 text-center text-muted-foreground max-w-xl">
            Tesfa provides career-focused courses, mentorship and community resources designed for
            Ethiopian learners. Our goal is to make high-quality skills training accessible, practical,
            and relevant to local job markets.
          </p>

          <div className="mt-6 flex gap-3">
            <Link href="/register" className="">
              <Button>Get Started</Button>
            </Link>
            <Link href="/learn" className="">
              <Button variant="outline">Browse Courses</Button>
            </Link>
          </div>

          <div className="mt-6 flex gap-3 flex-wrap">
            <Badge>Local-first</Badge>
            <Badge>Project-based</Badge>
            <Badge>Low-bandwidth friendly</Badge>
          </div>
        </div>

        <div className="space-y-14">
          <Card className="p-6 text-center w-auto md:max-w-[600px]">
            <h3 className="text-lg font-semibold">Mission</h3>
            <div className="flex flex-row">
                <p className="mt-2 text-sm text-muted-foreground">
                To close the opportunity gap for Ethiopian youth by providing accessible, high-quality learning,
                mentorship and tools that lead to real-world outcomes.
                <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil accusamus architecto quia? Saepe natus nisi eveniet facilis similique ducimus asperiores iure dolor, modi, est a cumque reprehenderit labore excepturi fuga, sed laboriosam magnam non. Ea facere quibusdam architecto quod quam, dignissimos veritatis fugiat cumque impedit aspernatur repellendus voluptate odio. Illo vitae aspernatur totam molestias, temporibus nostrum aut culpa pariatur asperiores ipsa. Optio consectetur obcaecati laudantium odit ducimus in, voluptate provident officia eveniet fugit nihil ipsa tempore reiciendis quam voluptatum iure illum magnam veritatis aut, quidem modi. Animi voluptatibus quis explicabo in quidem vitae doloribus qui officia, quas, maxime, illo quo.
                </p>
                <img src="@/public/assets/images/AIVECTOR.jpg" alt="AI Banner" />
            </div>
          </Card>

          <Card className="p-6 text-center w-auto md:max-w-[600px]">
            <h3 className="text-lg font-semibold">Vision</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                A future where every young Ethiopian has access to the skills and support they need to pursue the career they want.
                <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil accusamus architecto quia? Saepe natus nisi eveniet facilis similique ducimus asperiores iure dolor, modi, est a cumque reprehenderit labore excepturi fuga, sed laboriosam magnam non. Ea facere quibusdam architecto quod quam, dignissimos veritatis fugiat cumque impedit aspernatur repellendus voluptate odio. Illo vitae aspernatur totam molestias, temporibus nostrum aut culpa pariatur asperiores ipsa. Optio consectetur obcaecati laudantium odit ducimus in, voluptate provident officia eveniet fugit nihil ipsa tempore reiciendis quam voluptatum iure illum magnam veritatis aut, quidem modi. Animi voluptatibus quis explicabo in quidem vitae doloribus qui officia, quas, maxime, illo quo.
            </p>
          </Card>
        </div>

      </section>

      {/* Features */}
      <section className="mt-12 px-10">
        <h2 className="text-2xl font-semibold">What we build</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Practical content, hands-on projects, and simple tools for learners, mentors, and institutions.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4">
            <h4 className="font-semibold">Career-aligned Courses</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Short, project-based courses in development, design, data, business and more.
            </p>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold">Mentorship & Community</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Local mentors, community projects and peer support that help learners apply skills.
            </p>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold">Admin Tools</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Manage courses, students and analytics with role-based access for institutions and educators.
            </p>
          </Card>
        </div>
      </section>

      {/* Impact / Stats */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
        <div className="p-6 bg-gradient-to-r from-green-500 to-white rounded-lg">
          <h3 className="text-3xl font-bold">2,150+</h3>
          <p className="text-background mt-1">Learners enrolled</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-white rounded-lg">
          <h3 className="text-3xl font-bold">120+</h3>
          <p className="text-background mt-1">Hands-on projects</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-yellow-500 to-white rounded-lg">
          <h3 className="text-3xl font-bold">40%</h3>
          <p className="text-background mt-1">Report improved job readiness</p>
        </div>
      </section>

      {/* Team / CTA */}
      <section className="mt-12 grid md:grid-cols-2 gap-8 items-center px-10">
        <div>
          <h2 className="text-2xl font-semibold">Join the movement</h2>
          <p className="text-muted-foreground mt-2 max-w-lg">
            Whether you want to learn, mentor, or partner with Tesfa, we welcome your support. Together we can help more
            youth develop meaningful careers.
          </p>

          <div className="mt-6 flex gap-3">
            <Link href="/contact"><Button>Contact us</Button></Link>
            <Link href="/learn"><Button variant="outline">Explore courses</Button></Link>
          </div>
        </div>

        <div className="space-y-3">
          <Card className="p-4">
            <h4 className="font-semibold">Our Team</h4>
            <p className="text-sm text-muted-foreground mt-2">Small, local team with global standards. Designers, engineers and educators from Ethiopia and beyond.</p>
          </Card>
          <Card className="p-4">
            <h4 className="font-semibold">Partners</h4>
            <p className="text-sm text-muted-foreground mt-2">Working with local employers and NGOs to connect learners to opportunities.</p>
          </Card>
        </div>
      </section>
    </main>
  )
}
