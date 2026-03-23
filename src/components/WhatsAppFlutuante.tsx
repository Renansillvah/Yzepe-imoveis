import { MessageCircle } from 'lucide-react'

export default function WhatsAppFlutuante() {
  return (
    <a
      href="https://wa.me/5535998309575?text=Olá,%20vim%20pelo%20site%20e%20quero%20mais%20informações"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-2xl px-4 py-3 font-semibold text-sm hover:scale-105 transition-transform duration-300"
      style={{
        animation: 'pulse-whatsapp 2.5s infinite',
      }}
    >
      <MessageCircle size={22} className="flex-shrink-0" />
      <span className="hidden sm:inline">Falar no WhatsApp</span>
      <style>{`
        @keyframes pulse-whatsapp {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
          50% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
        }
      `}</style>
    </a>
  )
}
