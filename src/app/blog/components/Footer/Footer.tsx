import React from 'react'
import Link from 'next/link'

// scss modules
import styles from './Footer.module.scss'

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faExternalLinkAlt,
  faEnvelope,
  faAt,
  faLink
} from '@fortawesome/free-solid-svg-icons'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['link-container']}>
        <div>
          <span>LINKS</span>
          <ul>
            <li>
              <Link href={'#'}>
                <FontAwesomeIcon icon={faLink} />
                <span>Portfolio</span>
              </Link>
            </li>
            <li>
              <Link href={'/blog'}>
                <FontAwesomeIcon icon={faLink} />
                <span>Blog</span>
              </Link>
            </li>
            <li>
              <Link href={'#'}>
                <FontAwesomeIcon icon={faLink} />
                <span>Sitemap</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <span>SOCIAL</span>
          <ul>
            <li>
              <Link href={'https://twitter.com/46ki75'}>
                <FontAwesomeIcon icon={faTwitter} />
                <span>twitter(X)</span>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </Link>
            </li>
            <li>
              <Link href={'https://github.com/46ki75'}>
                <FontAwesomeIcon icon={faGithub} />
                <span>GitHub</span>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <span>CONTACT</span>
          <ul>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>
                全般: info&nbsp;
                <FontAwesomeIcon icon={faAt} />
                &nbsp;46ki75.com
              </span>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>
                web管理: webmaster&nbsp;
                <FontAwesomeIcon icon={faAt} />
                &nbsp;46ki75.com
              </span>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className={styles.copyright}>
        <span>
          <FontAwesomeIcon icon={faCopyright} />
          &nbsp;2022-{new Date().getUTCFullYear()}&nbsp;Chomolungma Shirayuki
        </span>
      </div>
    </footer>
  )
}
