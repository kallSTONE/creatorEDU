// app/about/page.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Target, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="w-full mx-auto py-12 space-y-24">

      {/* ===== Hero Section ===== */}
      <section className="relative flex flex-col items-center text-center px-6 md:px-10 py-20 overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            ተስፋ — የኢትዮጵያ ወጣቶችን በተግባራዊ ትምህርት ማበረታታት
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ተስፋ በሙያ ላይ የተመረኩ ኮርሶችን፣ መንቶርሽፕ እና ለኢትዮጵያውያን ተማሪዎች የተዘጋጀ የማህበረሰብ ሀብት ይሰጣል።
            ዓላማችን ጥራት ያለው የችሎታ ስልጠና ተደራሽ፣ ተግባራዊ እና ከአካባቢ ጋር የተያያዘ እንዲሆን ማድረግ ነው።
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/register"><Button size="lg">ጀምር</Button></Link>
            <Link href="/learn"><Button variant="outline" size="lg">ኮርሶችን ተመልከት</Button></Link>
          </div>
          <div className="mt-6 flex gap-2 flex-wrap justify-center">
            <Badge>ከአካባቢ ጀምሮ</Badge>
            <Badge>በፕሮጀክት የተመሠረተ</Badge>
            <Badge>ዝቅተኛ ባንድዊድ ተስማሚ</Badge>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-12"
        >
          <Image
            src="/assets/images/learning_banner.jpg"
            alt="የተስፋ ትምህርት ባነር"
            width={1000}
            height={500}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* ===== Our Story ===== */}
      <section className="px-6 md:px-10 text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">ታሪካችን</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ተስፋ ለኢትዮጵያ ወጣቶች የእድል ክፍተትን ለመቀነስ በራዕይ ተመሠርቷል።
            ትምህርት ማስተማር ብቻ ሳይኖር ማበረታታት እንዲሆን እናመን።
            ከ2023 ጀምሮ ከአካባቢ ተማሪዎችን ከተግባራዊ ችሎታዎች፣ መንቶሮች እና ከእውነተኛ ፕሮጀክቶች ጋር የሚያገናኝ መድረክ እንገነባ እንቀጥላለን።
          </p>
        </motion.div>
      </section>

      {/* ===== Mission & Vision ===== */}
      <section className="px-6 md:px-10 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="p-6">
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <Target className="text-primary" />
                <h3 className="text-2xl font-semibold">ተልዕኮናችን</h3>
              </div>
              <p className="text-muted-foreground">
                ኢትዮጵያ ወጣቶችን በተደራሽ እና ተዛማጅ የትምህርት ተሞክሮ በኩል በተግባራዊ፣ ሙያ-ዝግጅት ችሎታዎች ማዘጋጀት።
                እውነተኛ እድሎችን የሚያመጡ መንቶርሽፕ፣ ማህበረሰብ እና በእጅ የሚፈጠሩ ፕሮጀክቶች ላይ እንተኩራለን።
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="p-6">
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="text-primary" />
                <h3 className="text-2xl font-semibold">ራዕያችን</h3>
              </div>
              <p className="text-muted-foreground">
                እያንዳንዱ ወጣት ኢትዮጵያዊ ለትርፍ ያለ ሙያ ማቋቋም የሚያገለግሉ ችሎታዎች፣ መመሪያ እና እድሎች የሚደርስበት የወደፊት ዓለም።
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* ===== Our Values ===== */}
      <section className="px-6 md:px-10 text-center space-y-10">
        <h2 className="text-3xl font-bold">እሴቶቻችን</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'ተደራሽነት', desc: 'ከአካባቢ እውነታዎች ጋር በማሰብ እንገነባለን — ከመስመር ውጭ መድረስ፣ ዝቅተኛ ባንድዊድ፣ ሞባይል-መጀመሪያ።' },
            { title: 'ተግባራዊነት', desc: 'ትማሪ በተግባር ሲተገበር ብቻ ውጤታማ ነው። እያንዳንዱ ኮርስ በእጅ የሚፈጠር ፕሮጀክት ያካትታል።' },
            { title: 'ማህበረሰብ', desc: 'በተባበሩ ሥራ፣ መንቶርሽፕ እና በአንድነት መማር እናመናለን።' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-lg transition">
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Impact Stats ===== */}
      <section className="px-6 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-10">ተጽእኖቻችን</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { number: '2,150+', label: 'የተመዘገቡ ተማሪዎች', color: 'from-green-500 to-emerald-300' },
            { number: '120+', label: 'በእጅ የተፈጠሩ ፕሮጀክቶች', color: 'from-indigo-500 to-sky-300' },
            { number: '40%', label: 'የስራ ዝግጁነት ማሻሻል', color: 'from-yellow-400 to-orange-300' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl bg-gradient-to-r ${stat.color} text-background font-semibold`}
            >
              <h3 className="text-4xl font-extrabold">{stat.number}</h3>
              <p className="mt-2 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Team & Partners ===== */}
      <section className="px-6 md:px-10 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">ቡድናችን</h2>
          <p className="text-muted-foreground mb-6">
            ከኢትዮጵያ የምንሠራ ከመምህራን፣ አቀራረብ አበልጻጊዎች እና ኢንጂነሮች የተቀላቀለ በፍላጎት የተነደፈ ትንሽ ቡድን ነን።
            አብረን በሀገሪቱ ውስጥ የተግባራዊ ትምህርት መጠን እንዲሻሻል እናስባለን።
          </p>
          <Link href="/contact"><Button>ከእኛ ጋር ስራ አድርጉ</Button></Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <Image src="/assets/images/team1.jpg" alt="ቡድን 1" width={300} height={300} className="rounded-xl object-cover" />
          <Image src="/assets/images/team2.jpg" alt="ቡድን 2" width={300} height={300} className="rounded-xl object-cover" />
          <Image src="/assets/images/team3.jpg" alt="ቡድን 3" width={300} height={300} className="rounded-xl object-cover" />
          <Image src="/assets/images/team4.jpg" alt="ቡድን 4" width={300} height={300} className="rounded-xl object-cover" />
        </motion.div>
      </section>

      {/* ===== Call to Action ===== */}
      <section className="text-center px-6 md:px-10 py-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">የተስፋ እንቅስቃሴን ይቀላቀሉ</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            ተማሪ ሆነው፣ መንቶር ወይም አጋር — ጉዞዎ እዚህ ይጀምራል።
            አብረን የቀጣይ ትውልድ ኢትዮጵያዊ ፈጠራ አበልጻጊዎችን ማበረታታት እንችላለን።
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register"><Button size="lg">መማር ጀምር</Button></Link>
            <Link href="/contact"><Button variant="outline" size="lg">ከእኛ ጋር ተባብሩ</Button></Link>
          </div>
        </motion.div>
      </section>

    </main>
  )
}
