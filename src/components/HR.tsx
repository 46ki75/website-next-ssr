'use client'
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import React from 'react'

export const HR = () => {
  return (
    <div
      style={{
        width: '100%',
        margin: '0.25rem 0',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap'
      }}
    >
      <motion.img
        src='/images/common/hr3.svg'
        style={{ width: '25%', opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.1 }}
      ></motion.img>
      <motion.img
        src='/images/common/hr1.svg'
        style={{ width: '16%', opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.1 }}
      ></motion.img>
      <motion.img
        src='/images/common/hr2.svg'
        style={{ width: '18%', opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.1 }}
      ></motion.img>
      <motion.img
        src='/images/common/hr1.svg'
        style={{ width: '16%', opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.1 }}
      ></motion.img>
      <motion.img
        src='/images/common/hr3.svg'
        style={{ width: '25%', opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.1 }}
      ></motion.img>
    </div>
  )
}
