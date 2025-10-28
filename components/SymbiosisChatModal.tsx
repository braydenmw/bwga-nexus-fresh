
import React, { useState, useEffect, useRef } from 'react';
import type { SymbiosisContext, ChatMessage } from '../types.ts';
import useEscapeKey from '../hooks/useEscapeKey.ts';
import { marked } from 'marked';
import { SymbiosisIcon, CloseIcon, SendIcon } from './Icons.tsx';

interface SymbiosisChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: SymbiosisContext;
  onSendMessage: (history: ChatMessage[]) => Promise<string>;
}

const SymbiosisChatModal: React.FC<SymbiosisChatModalProps> = ({ isOpen, onClose, context, onSendMessage }) => {
  useEscapeKey(onClose);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{
        sender: 'ai',
        text: `Nexus Symbiosis activated. You've selected the topic: **${context.topic}**. The original finding was: *"${context.originalContent}"*. How can I elaborate or provide updated information on this specific point?`
      }]);
    }
  }, [isOpen, context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim() || isThinking) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsThinking(true);

    try {
      const aiResponseText = await onSendMessage(newMessages);
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponseText }]);
    } catch (error) {
      console.error("Symbiosis chat error:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "I'm sorry, I encountered an error connecting to my core systems. Please try again." }]);
    } finally {
      setIsThinking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-nexus-primary-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog">
      <div 
        className="bg-nexus-surface-800 border border-nexus-border-medium rounded-2xl max-w-2xl w-full h-[80vh] flex flex-col shadow-2xl shadow-nexus-accent-cyan/10"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex-shrink-0 p-4 border-b border-nexus-border-medium flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SymbiosisIcon className="w-6 h-6 text-nexus-accent-cyan" />
            <div>
              <h2 className="text-lg font-bold text-nexus-text-primary">Nexus Symbiosis™ Chat</h2>
              <p className="text-xs text-nexus-text-secondary truncate max-w-md">Topic: {context.topic}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-nexus-text-secondary hover:text-nexus-text-primary hover:bg-nexus-surface-700 transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-nexus-primary-800">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-nexus-accent-cyan/20 flex-shrink-0 flex items-center justify-center"><SymbiosisIcon className="w-5 h-5 text-nexus-accent-cyan"/></div>}
              <div className={`max-w-md p-3 rounded-lg prose prose-sm prose-invert prose-p:my-1 ${msg.sender === 'ai' ? 'bg-nexus-surface-700' : 'bg-nexus-accent-gold text-nexus-primary-900'}`}
                dangerouslySetInnerHTML={{ __html: msg.sender === 'ai' ? marked.parse(msg.text) as string : `<p>${msg.text}</p>` }}>
              </div>
            </div>
          ))}
          {isThinking && (
             <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-nexus-accent-cyan/20 flex-shrink-0 flex items-center justify-center"><SymbiosisIcon className="w-5 h-5 text-nexus-accent-cyan animate-pulse"/></div>
                <div className="max-w-md p-3 rounded-lg bg-nexus-surface-700 flex items-center">
                    <div className="w-2 h-2 bg-nexus-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-nexus-text-muted rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
                    <div className="w-2 h-2 bg-nexus-text-muted rounded-full animate-bounce"></div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <footer className="flex-shrink-0 p-4 border-t border-nexus-border-medium">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask a clarifying question..."
              className="w-full p-3 bg-nexus-surface-700 border border-nexus-border-medium rounded-lg focus:ring-2 focus:ring-nexus-accent-brown focus:outline-none transition placeholder:text-nexus-text-muted"
              disabled={isThinking}
            />
            <button onClick={handleSend} disabled={isThinking || !userInput.trim()} className="p-3 bg-nexus-accent-brown rounded-lg hover:bg-nexus-accent-brown-dark transition-colors disabled:bg-nexus-text-muted disabled:cursor-not-allowed text-white">
              <SendIcon className="w-6 h-6" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SymbiosisChatModal;