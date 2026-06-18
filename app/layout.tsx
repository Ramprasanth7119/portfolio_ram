import './globals.css'
import { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Ramprasanth Sakthivel | Software Developer Portfolio',
  description: 'Software Developer skilled in MERN Stack, Spring Boot, Next.js, Java, and modern web technologies.',
  keywords: ['Ramprasanth Sakthivel', 'Software Developer', 'MERN Stack', 'Spring Boot', 'Next.js', 'Full Stack Engineer', 'Java Developer'],
  authors: [{ name: 'Ramprasanth Sakthivel' }],
  openGraph: {
    title: 'Ramprasanth Sakthivel | Software Developer Portfolio',
    description: 'Software Developer skilled in MERN Stack, Spring Boot, Next.js, Java, and modern web technologies.',
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
