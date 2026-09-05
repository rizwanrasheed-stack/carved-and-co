import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const defaultMsg = COMPANY_INFO.whatsappMessageDefault;

  const handleSend = () => {
    const textToSend = userMsg.trim() || defaultMsg;
    const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      
      {/* QUICK POP-OVER DIALOG */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-[#F8F6F2] text-[#242424] rounded-xl shadow-2xl border border-[#3A2A22]/20 overflow-hidden animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-5 h-5 fill-current" />
              <div>
                <p className="font-serif font-bold text-sm leading-tight">CARVED & CO. Concierge</p>
                <p className="text-[10px] text-white/90">Direct WhatsApp Inquiry</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-black/10 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-[#F2EDE4]">
            <div className="p-3 bg-white rounded-lg shadow-xs text-xs text-[#242424]/90 space-y-1">
              <p className="font-serif font-semibold text-[#3A2A22]">Hello there 👋</p>
              <p className="font-light text-[11px] leading-relaxed">
                Welcome to CARVED & CO. How can our master artisans assist with your furniture requirements today?
              </p>
            </div>

            <textarea
              rows={2}
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              placeholder="Type your furniture inquiry..."
              className="w-full bg-white border border-[#3A2A22]/20 rounded p-2.5 text-xs text-[#242424] focus:outline-none focus:border-[#25D366]"
            />

            <button
              onClick={handleSend}
              className="w-full bg-[#25D366] hover:bg-[#1EBE5B] text-white py-2.5 rounded font-serif text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON */}
      <button
        id="floating-whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-[#25D366] hover:bg-[#1EBE5B] text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 cursor-pointer group flex items-center justify-center"
        aria-label="Contact CARVED & CO. on WhatsApp"
        title="Direct WhatsApp Inquiry"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        
        {/* ONLINE BADGE */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full animate-ping" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
      </button>

    </div>
  );
}
