import React from 'react'

const InputField = ({ value, onChange, onKeyDown, disabled }) => {
  return (
    <input
      className="input-field"
      type="text"
      placeholder="Ketik pertanyaan... / Type a question..."
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      autoComplete="off"
    />
  )
}

export default InputField