import './globals.css'
import { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Ramprasanth Sakthivel | Java Backend & Full-Stack Developer',
  description: 'Full-stack developer focused on Java backends, building REST APIs and web apps with Spring Boot, NestJS, Next.js and React.js.',
  keywords: ['Ramprasanth Sakthivel', 'Java Backend Developer', 'Full Stack Developer', 'Spring Boot', 'NestJS', 'Next.js', 'React.js'],
  authors: [{ name: 'Ramprasanth Sakthivel' }],
  openGraph: {
    title: 'Ramprasanth Sakthivel | Java Backend & Full-Stack Developer',
    description: 'Full-stack developer focused on Java backends, building REST APIs and web apps with Spring Boot, NestJS, Next.js and React.js.',
    type: 'website',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
