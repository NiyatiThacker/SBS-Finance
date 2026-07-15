import { useState, useRef, useEffect } from 'react'
import { ArrowUp, Loader2 } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSend(input.trim())
      setInput('')
    }
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className={`bg-white px-5 pt-3 border-t border-slate-100 shrink-0 ${isMobile ? 'rounded-none pb-7' : 'rounded-b-[1.3rem] pb-4'}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center mb-2.5">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-full pl-5 pr-12 py-3.5 text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 focus:border-gold-400 transition-all disabled:opacity-50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute right-1.5 bg-gold-400 text-green-950 rounded-full w-[34px] h-[34px] flex items-center justify-center hover:bg-green-700 hover:text-white hover:shadow-md disabled:opacity-50 disabled:hover:bg-gold-400 disabled:hover:shadow-none transition-all duration-250 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin text-white" />
          ) : (
            <ArrowUp size={20} className="stroke-[2.5]" />
          )}
        </button>
      </form>
      <div className="text-center text-[10px] text-slate-400 font-medium tracking-wide flex items-center justify-center gap-1.5">
        <span className="w-2 h-2 rounded-full border border-slate-300"></span>
        Your data is secure and encrypted
      </div>
    </div>
  )
}
