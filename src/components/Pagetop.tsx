'use client'

import React from 'react'

// Material UI
import Tooltip from '@mui/material/Tooltip'

const Pagetop = () => {
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 150)
  }

  return (
    <>
      <Tooltip title='ページトップ'>
        <div className='pagetop_container' id='page-top' onClick={scrollToTop}>
          <div className='pagetop_sub_container'>
            <div className='chevron'></div>
            <div className='chevron'></div>
            <div className='chevron'></div>
          </div>
        </div>
      </Tooltip>
      <span className='page-top-fix-text'>Page Top</span>
      <style jsx>
        {`
                    /*リンクを右下に固定*/
                    #page-top {
                        display: fixed;
                        right: 10px;
                        bottom: 10px;
                        width: 56px:
                        height:56px;
                        margin: 0;
                        z-index: 50;
                        cursor: pointer;
                    }

                    /* 上に上がる動き */

                    #page-top.UpMove {
                        animation: UpAnime 0.5s forwards;
                    }

                    @keyframes UpAnime {
                        0% {
                            opacity: 0;
                            transform: translateY(100px) rotate(-180deg);
                        }

                        100% {
                            opacity: 1;
                            transform: translateY(0) rotate(180deg);
                        }
                    }

                    /* 下に下がる動き */

                    #page-top.DownMove {
                        animation: DownAnime 0.5s forwards;
                    }

                    @keyframes DownAnime {
                        0% {
                            opacity: 1;
                            transform: translateY(0) rotate(180deg);
                        }

                        50% {
                            opacity: 1;
                            transform: translateY(0) rotate(0deg);
                        }

                        100% {
                            opacity: 1;
                            transform: translateY(100px) rotate(0deg);
                        }
                    }

                    .page-top-fix-text {
                        position: fixed;
                        z-index: 50;
                        right: 15px;
                        bottom: 1px;
                        font-size: 11px;
                        color: rgba(0, 0, 0, 0.6);
                        transition: all 1s ease-out;
                    }

                    .pagetop_container {
                        position: fixed;
                        right: 25px;
                        bottom: 0px;
                        z-index: 151;
                        transform: rotate(180deg);
                    }

                    .pagetop_sub_container {
                        position: relative;
                        width: 56px;
                        height: 56px;
                        opacity: 0.6;
                    }

                    .chevron {
                        position: absolute;
                        width: 56px;
                        height: 16px;
                        opacity: 0;
                        transform: scale3d(0.5, 0.5, 0.5);
                        animation: move 3s ease-out infinite;
                    }

                    .chevron:first-child {
                        animation: move 3s ease-out 1s infinite;
                    }

                    .chevron:nth-child(2) {
                        animation: move 3s ease-out 2s infinite;
                    }

                    .chevron:before,
                    .chevron:after {
                        content: " ";
                        position: absolute;
                        top: 0;
                        height: 100%;
                        width: 51%;
                        background: rgb(0, 114, 88);
                    }

                    .chevron:before {
                        left: 0;
                        transform: skew(0deg, 30deg);
                    }

                    .chevron:after {
                        right: 0;
                        width: 50%;
                        transform: skew(0deg, -30deg);
                    }

                    @keyframes move {
                        25% {
                            opacity: 1;
                        }

                        33% {
                            opacity: 1;
                            transform: translateY(20px);
                        }

                        67% {
                            opacity: 1;
                            transform: translateY(50px);
                        }

                        100% {
                            opacity: 0;
                            transform: translateY(65px) scale3d(0.5, 0.5, 0.5);
                        }
                    }

                    @keyframes pulse {
                        to {
                            opacity: 1;
                        }
                    }
                `}
      </style>
    </>
  )
}

export default Pagetop
