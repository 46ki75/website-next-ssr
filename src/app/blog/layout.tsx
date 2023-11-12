import React from 'react'

// components
import { Footer, Header, Side } from './components'
import { Pagetop } from '@/components'

// scss modules
import styles from './page.module.scss'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}) {
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
      <Footer />
      <Pagetop />
    </>
  )
}
