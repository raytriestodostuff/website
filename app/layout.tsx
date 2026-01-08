import type { Metadata } from 'next'
import { Nunito, Fraunces } from 'next/font/google'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600', '700'] })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: 'Rayyan Abhram | Personal Portfolio',
  description: 'Personal portfolio, resume, gallery, and project work by Rayyan Abhram.',
  keywords: 'Rayyan Abhram, portfolio, resume, projects, AI systems, product',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${nunito.variable} ${fraunces.variable} font-sans`}>{children}</body>
    </html>
  )
}
