import React from 'react'

// Material UI
import Tooltip from '@mui/material/Tooltip'

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'

// scss modules
import styles from './Date.module.scss'

export const Date = ({
  createdAt,
  updatedAt
}: {
  createdAt: string
  updatedAt: string
}) => {
  return (
    <div className={styles['date-container']}>
      <Tooltip title='作成日時'>
        <div>
          <FontAwesomeIcon icon={faCalendarCheck} />
          <span>{createdAt.substring(0, 10)}</span>
        </div>
      </Tooltip>
      <Tooltip title='作成日時'>
        <div>
          <FontAwesomeIcon icon={faHistory} />
          <span>{updatedAt.substring(0, 10)}</span>
        </div>
      </Tooltip>
    </div>
  )
}
