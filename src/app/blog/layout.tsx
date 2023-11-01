import React from 'react'

// components
import { Header, Side } from './components'
import Pagetop from '@/components/Pagetop'

// scss modules
import styles from './page.module.scss'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}) {
  const response = await fetch(`http://localhost:3000/api/notion/blog/4`)
  return {
    title: '...'
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className={styles['body-container']}>
        <main className={styles.main}>{children}</main>
        <Side />
      </div>
      <Pagetop />
    </>
  )
}
