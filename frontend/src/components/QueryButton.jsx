import React from 'react'

const QueryButton = ({ onClick, disabled = false }) => {
  return (
    <button
      className="query-button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Kirim pesan / Send message"
    >
      <span>Kirim / Send</span>
      <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </button>
  )
}

export default QueryButton