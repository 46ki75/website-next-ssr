import styles from './Home.module.scss'
import { Section1, Section2, Section3, Menu } from '.'

export default function Home() {
  return (
    <>
      <Menu />
      <div className={styles['scroll-container']}>
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </>
  )
}
