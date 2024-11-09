'use client'
import React from 'react'

const BetaBadge = ({ text = 'BETA', className = '' }) => {
  return (
    <>
      <span className={`beta-badge ${className}`}>
        {text}
      </span>
      <style jsx>{`
        .beta-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: bold;
          color: #ffffff;
          background-color: #3b82f6;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          top: -0.9em;
          margin-left: 0em;
          padding: 2px 4px;
        }
      `}</style>
    </>
  )
}

export default BetaBadge