import { useState } from 'react'
import './assets/App.css'

import logoItb from './assets/Logo_Institut_Teknologi_Bandung.svg'

import Chatbox from './components/Chatbox'
import InputField from './components/InputField'
import QueryButton from './components/QueryButton'
import { askToBackend } from './services/apicall'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { from: 'user', text: userMessage }])
    setInput("")
    setIsLoading(true)

    try {
      const data = await askToBackend(userMessage)
      setMessages(prev => [...prev, { from: 'bot', text: data.answer }])

      if (data.hasLinks && data.links && data.links.length > 0) {
        const linkMessage = {
          from: 'bot',
          type: 'links',
          links: data.links,
          text: 'Tautan terkait / Related links:'
        }
        setMessages(prev => [...prev, linkMessage])
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        from: 'bot',
        text: 'Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi.\nSorry, an error occurred while contacting the server. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  return (
    <div className="main-chat-container">
      <div className="header-section">
        <img src={logoItb} alt="Logo ITB" className="itb-logo" />
        <div className="header-title">
          <h1>Chatbot ITB</h1>
          <span className="header-subtitle">Asisten Informasi / Information Assistant</span>
        </div>
        <div className="header-status">
          <span className="status-dot"></span>
          <span className="status-text">Online</span>
        </div>
      </div>
      <div className="chatbox-section">
        <Chatbox messages={messages} isLoading={isLoading} />
      </div>
      <div className="input-section">
        <InputField 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <QueryButton 
          onClick={handleSend} 
          disabled={isLoading || input.trim() === ""}
        />
      </div>
      <div className="copyright-footer">
        &copy; 2025 rlukassa
      </div>
    </div>
  )
}

export default App
