import React, { useEffect, useRef } from 'react'
import logoItb from '../assets/Logo_Institut_Teknologi_Bandung.svg'

const TypingIndicator = () => (
  <div className="message-bubble bot" style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }}>
    <div className="sender-name" style={{ paddingLeft: '0.25rem' }}>Roga</div>
    <div className="message-text bot typing-indicator">
      <span className="typing-text">sedang mengetik / typing</span>
      <div className="typing-dots">
        <div className="typing-dot" style={{ animation: 'typingDot 1.4s infinite ease-in-out' }} />
        <div className="typing-dot" style={{ animation: 'typingDot 1.4s infinite ease-in-out 0.2s' }} />
        <div className="typing-dot" style={{ animation: 'typingDot 1.4s infinite ease-in-out 0.4s' }} />
      </div>
    </div>
  </div>
)

const Chatbox = ({ messages, isLoading = false }) => {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="chatbox">
      {messages.length === 0 && !isLoading ? (
        <div className="empty-state">
          <div className="chatbot-icon">
            <img
              src={logoItb}
              alt="Logo ITB"
              className="chatbot-logo"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <div>
            <div className="empty-state-title">
              Selamat Datang di Chatbot ITB
            </div>
            <div className="empty-state-desc">
              Tanyakan apapun tentang Institut Teknologi Bandung
              <br />
              <span className="empty-state-desc-en">Ask anything about Institut Teknologi Bandung</span>
            </div>
            <div className="empty-state-hint">
              Contoh / Example: "Apa itu ITB?", "Sejarah ITB", "Fakultas di ITB"
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message-bubble ${msg.from}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.from === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div className="sender-name" style={{
                paddingLeft: msg.from === 'user' ? '0' : '0.25rem',
                paddingRight: msg.from === 'user' ? '0.25rem' : '0',
                textAlign: msg.from === 'user' ? 'right' : 'left',
              }}>
                {msg.from === 'user' ? 'Kamu' : 'Roga'}
              </div>

              {msg.type === 'links' ? (
                <div className="message-text bot links-bubble">
                  <div className="links-header">{msg.text}</div>
                  <div className="links-container">
                    {msg.links.map((linkItem, linkIdx) => (
                      <div key={linkIdx} className="link-item">
                        <div className="link-content-preview">
                          <strong>{linkItem.category}</strong>: {linkItem.content}
                        </div>
                        <div className="link-urls">
                          {linkItem.links.map((url, urlIdx) => (
                            <a
                              key={urlIdx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="itb-link"
                              title={url}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                              </svg>
                              {new URL(url).hostname.replace('www.', '')}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={`message-text ${msg.from}`}>
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}

export default Chatbox