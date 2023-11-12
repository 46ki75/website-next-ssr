import { Header, Side } from './components'

// scss modules
import styles from './draft.module.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Side />
        <div>{children}</div>
      </div>
    </>
  )
}
