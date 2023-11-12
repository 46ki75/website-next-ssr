import React from 'react'

// scss modules
import styles from './portfolio.module.scss'
import {
  faEnvelope,
  faAt,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

// image
import Image from 'next/image'
import profile from './profile.webp'

const page = () => {
  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <h1>
          <p>イラストレーター？エンジニア？</p>
          <p>コイツは……オタクだ。</p>
        </h1>

        <div className={styles['profile-container']}>
          <Image
            src={profile.src}
            width={profile.width}
            height={profile.height}
            alt=''
          />
          <div>
            <p>
              チョモランマ白雪
              <br />
              (Chomolungma Shirayuki)
            </p>
            <ul>
              <li>1999年 愛知で生を受ける</li>
              <li>2022年 活動開始</li>
            </ul>
          </div>
        </div>

        <p>
          初めまして。チョモランマ白雪と申します。東京のプライム上場SIerでシステムアーキテクトをしています。
          趣味は創作です。好きなようにイラストを描いてヤンチャしています。
        </p>

        <p>
          主にサブカルチャーに関心を寄せており、かなり前からいろいろな作品に触れてきました。しかし、消費するだけでは飽き足らず、創作する側に回るようになりました。当時、自分と同じ種の人間が描いたものと思えない作品を見て超越的感覚(Sense
          of
          Awe)を受けたことを覚えています。入口はイラストでしたが、様々な創作活動が好きであり、人間に一番必要なのは独創力ではないかと今は考えています。
        </p>

        <p>
          数年前の学生時代、イラストのお仕事をさせてもらったこともありましたが、自分の好きなように描きたいときが多くなり完全に趣味でのびのびと描くことに決めました。
        </p>
        <p>
          イラストはそのときの情動のスナップショットを撮るようなものだと現在では考えています。
        </p>

        <h2>システムアーキテクトとして</h2>
        <p>
          みなさんはシステムアーキテクトと言う役職をご存知でしょうか？IT関連のことをする人全員エンジニアだと思っている方が多いと思いますが、現代の業界はもう少し細かく分かれています。
        </p>
        <p>
          システムアーキテクトは、コンピューターシステムやソフトウェアの基本設計を行う専門家です。よくアーキテクトと省略されて呼ばれます。
        </p>
        <p>
          アーキテクトはシステムがどのように機能し、様々な部分がどのように連携するかを計画します。アーキテクトの責任範囲には適切な技術を選ぶこと、システムのパフォーマンスとセキュリティを保証することが含まれます。
        </p>
        <p>
          加えてプロジェクトの初期段階から関わり、開発チームに技術的な指導を提供します。アーキテクトは、建築家が建物を設計するのと同様に、コンピューターシステムの
          <i>「設計図」</i>を作成する役割を果たします。
        </p>
        <p>
          そのような仕事をしながら生活をしていますが、まだ新卒の青二才なので毒にも薬にもならない仕事をしてお茶を濁しています。
        </p>
        <h2>コンタクト</h2>
        <p>
          仕事に関しては、会社勤めのほうで満足していますので受け付けていません。
        </p>
        <p>
          私が感銘を受けた作品や一緒に成し遂げたいと感じたプロジェクトには積極的に参加してより良いものにしたいと思っていますので、ご連絡をお待ちしています。
        </p>
        <ul className={styles.contact}>
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
            <span>
              個人: shirayuki
              <FontAwesomeIcon icon={faAt} />
              46ki75.com
            </span>
          </li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
            <span>
              web管理: webmaster
              <FontAwesomeIcon icon={faAt} />
              46ki75.com
            </span>
          </li>
          <li>
            <a
              href={'https://twitter.com/46ki75'}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesomeIcon icon={faTwitter} />
              <span>twitter(X)</span>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </li>
        </ul>
      </article>
    </div>
  )
}

export default page
