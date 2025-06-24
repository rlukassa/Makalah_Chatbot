import React from 'react' // import react
import logoItb from '../assets/Logo_Institut_Teknologi_Bandung.svg' // import logo itb

const TypingIndicator = () => ( // komponen typing indicator
    <div className="message-bubble bot" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    }}>
        <div className="sender-name" style={{
            fontSize: '0.75rem',
            color: '#64748b',
            marginBottom: '0.25rem',
            paddingLeft: '0.5rem',
            fontWeight: '500'
        }}>
            Roga {/* sender name */}
        </div>
        <div className="message-text bot" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            padding: '1rem 1.25rem'
        }}>
            <span>sedang mengetik</span> {/* typing text */}
            <div style={{ display: 'flex', gap: '2px' }}>
                <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#667eea',
                    animation: 'typingDot 1.4s infinite ease-in-out'
                }}></div> {/* dot pertama */}
                <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#667eea',
                    animation: 'typingDot 1.4s infinite ease-in-out 0.2s'
                }}></div> {/* dot kedua */}                <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#667eea',
                    animation: 'typingDot 1.4s infinite ease-in-out 0.4s'
                }}></div> {/* dot ketiga */}
            </div>
        </div>
    </div>
)

const Chatbox = ({ messages, isLoading = false }) => { // komponen chatbox utama
return (
    <div className="chatbox"> {/* container chatbox */}
        {messages.length === 0 && !isLoading ? ( // kondisi empty state
            <div className="empty-state"> {/* empty state */}
                <div className="chatbot-icon"> {/* icon chatbot */}
                    <img 
                        src={logoItb} 
                        alt="Logo ITB" 
                        className="chatbot-logo"
                        onError={(e) => { // handler error logo
                            console.log('Chatbot logo failed to load, using fallback'); // log error
                            e.target.style.display = 'none'; // hide logo
                            e.target.nextSibling.style.display = 'inline-block'; // show fallback
                        }}
                    />
                    <span className="chatbot-logo-fallback" style={{display: 'none', fontSize: '64px'}}>🎓</span> {/* fallback logo */}
                </div>
                <div>
                    <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                        Selamat datang di Chatbot ITB! {/* welcome message */}
                    </div>
                    <div style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                        Tanyakan apapun tentang Institut Teknologi Bandung {/* description */}
                        <br />
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                            Contoh: "Apa itu ITB?", "Fakultas di ITB", "Sejarah ITB" {/* example queries */}
                        </span>                    </div>
                </div>
            </div>
        ) : (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.5rem',
                height: '100%',
                paddingBottom: '1rem'
            }}>
                {messages.map((msg, idx) => ( // map semua messages
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
                            fontSize: '0.75rem',
                            color: '#64748b',
                            marginBottom: '0.25rem',
                            paddingLeft: msg.from === 'user' ? '0' : '0.5rem',
                            paddingRight: msg.from === 'user' ? '0.5rem' : '0',
                            fontWeight: '500'
                        }}>
                            {msg.from === 'user' ? 'User' : 'Roga'} {/* sender name */}
                        </div>
                        <div className={`message-text ${msg.from}`}>
                            {msg.text} {/* message text */}
                        </div>
                    </div>
                ))}
                {isLoading && <TypingIndicator />} {/* typing indicator saat loading */}
            </div>
        )}        
        <style jsx>{`
            .chatbot-logo {
                width: 64px;
                height: 64px;
                object-fit: contain;
                filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
                transition: all 0.3s ease;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.1);
                padding: 8px;
            }
            
            .chatbot-logo:hover {
                transform: scale(1.05);
                filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.2));
            }
            
            .chatbot-logo-fallback {
                line-height: 1;
                filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
                animation: bounce 2s ease-in-out infinite;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-10px);
                }
                60% {
                    transform: translateY(-5px);
                }
            }
            
            @keyframes typingDot {
                0%, 60%, 100% {
                    transform: translateY(0);
                    opacity: 0.4;
                }
                30% {
                    transform: translateY(-10px);
                    opacity: 1;
                }
            }
            
            @media (max-width: 640px) {
                .chatbot-logo {
                    width: 56px;
                    height: 56px;
                }
                .chatbot-logo-fallback {
                    font-size: 56px !important;
                }
            }
            
            @media (max-width: 480px) {
                .chatbot-logo {
                    width: 48px;
                    height: 48px;
                }
                .chatbot-logo-fallback {
                    font-size: 48px !important;
                }
            }
        `}</style> {/* styles untuk chatbox */}
    </div>
)
}

export default Chatbox // export komponen chatbox