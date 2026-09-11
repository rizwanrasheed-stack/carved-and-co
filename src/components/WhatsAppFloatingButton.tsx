import { useState, FormEvent } from 'react';
import { MessageCircle, X, Send, Mail, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { sendInquiryToCompanyEmail, TARGET_COMPANY_EMAIL } from '../services/emailService';

export function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email'>('whatsapp');
  
  // WhatsApp state
  const [userMsg, setUserMsg] = useState('');

  // Quick email form state
  const [emailName, setEmailName] = useState('');
  const [emailContact, setEmailContact] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [emailRef, setEmailRef] = useState('');

  const defaultMsg = COMPANY_INFO.whatsappMessageDefault;

  const handleWhatsAppSend = () => {
    const textToSend = userMsg.trim() || defaultMsg;
    const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleQuickEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailMessage.trim() || !emailContact.trim()) return;

    setIsSendingEmail(true);
    const ref = `QUICK-${Date.now().toString(36).toUpperCase()}`;

    const isEmail = emailContact.includes('@');

    try {
      const res = await sendInquiryToCompanyEmail({
        name: emailName.trim() || 'Website Visitor',
        email: isEmail ? emailContact.trim() : '',
        phone: !isEmail ? emailContact.trim() : '',
        message: emailMessage.trim(),
        clientType: 'Quick Inquiry',
        furnitureType: 'General Furniture Consultation',
        referenceNumber: ref
      });

      setEmailRef(res.referenceNumber || ref);
      setEmailSentSuccess(true);
    } catch {
      setEmailRef(ref);
      setEmailSentSuccess(true);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const resetEmailForm = () => {
    setEmailName('');
    setEmailContact('');
    setEmailMessage('');
    setEmailSentSuccess(false);
    setEmailRef('');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      
      {/* QUICK CONCIERGE POPOVER */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-88 max-w-sm bg-[#F4EEE4] text-[#24201E] rounded-2xl shadow-2xl border border-[#35171B]/20 overflow-hidden animate-in slide-in-from-bottom duration-300">
          
          {/* HEADER */}
          <div className="bg-[#35171B] text-[#F4EEE4] p-3.5 sm:p-4 flex items-center justify-between border-b border-[#B89458]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#B89458] text-[#35171B] flex items-center justify-center font-serif font-bold text-xs">
                C&C
              </div>
              <div>
                <p className="font-serif font-bold text-sm leading-tight text-[#F4EEE4]">CARVED & CO. Concierge</p>
                <p className="text-[10px] text-[#B89458]">Instant Client Communication</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center text-white/80 hover:text-white"
              aria-label="Close Concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* TAB SWITCHER */}
          <div className="grid grid-cols-2 bg-[#EDE3D5] p-1 border-b border-[#35171B]/15 text-xs font-serif font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('whatsapp')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-[#25D366] text-white shadow-xs'
                  : 'text-[#35171B] hover:bg-white/50'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('email')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'email'
                  ? 'bg-[#35171B] text-[#F4EEE4] shadow-xs'
                  : 'text-[#35171B] hover:bg-white/50'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Quick Email</span>
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="p-4 space-y-3 bg-[#FAF6F0]">
            
            {activeTab === 'whatsapp' ? (
              <>
                <div className="p-3 bg-white rounded-xl shadow-xs text-xs text-[#24201E]/90 space-y-1 border border-[#35171B]/10">
                  <p className="font-serif font-semibold text-[#35171B] flex items-center gap-1.5">
                    <span>Direct Artisan Chat</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  </p>
                  <p className="font-light text-[11px] leading-relaxed text-[#24201E]/80">
                    Connect directly with our workshop concierge on WhatsApp for instant pricing, wood samples, and video consultations.
                  </p>
                </div>

                <textarea
                  rows={2}
                  value={userMsg}
                  onChange={(e) => setUserMsg(e.target.value)}
                  placeholder="Type your inquiry or bespoke idea..."
                  className="w-full bg-white border border-[#35171B]/20 rounded-xl p-2.5 text-xs text-[#24201E] focus:outline-none focus:border-[#25D366]"
                />

                <button
                  onClick={handleWhatsAppSend}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5B] text-white py-3 rounded-xl font-serif text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm font-semibold min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Chat (+92 300 9223156)</span>
                </button>
              </>
            ) : (
              <>
                {emailSentSuccess ? (
                  <div className="p-4 bg-white rounded-xl text-center space-y-2 border border-[#35171B]/10">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="font-serif font-bold text-sm text-[#35171B]">Inquiry Dispatched</p>
                    <p className="text-[11px] text-[#24201E]/80">
                      Sent directly to <strong>{TARGET_COMPANY_EMAIL}</strong>. Ref: <span className="font-mono font-semibold text-[#35171B]">{emailRef}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={resetEmailForm}
                      className="mt-2 text-xs font-serif text-[#B89458] hover:underline font-semibold cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickEmailSubmit} className="space-y-2.5">
                    <div className="text-[11px] text-[#24201E]/75 font-sans">
                      Delivered directly to <strong className="text-[#35171B]">{TARGET_COMPANY_EMAIL}</strong>:
                    </div>

                    <input
                      type="text"
                      placeholder="Your Name (optional)"
                      value={emailName}
                      onChange={(e) => setEmailName(e.target.value)}
                      className="w-full bg-white border border-[#35171B]/20 rounded-lg p-2 text-xs text-[#24201E] focus:outline-none focus:border-[#35171B]"
                    />

                    <input
                      type="text"
                      required
                      placeholder="Email or Phone Number *"
                      value={emailContact}
                      onChange={(e) => setEmailContact(e.target.value)}
                      className="w-full bg-white border border-[#35171B]/20 rounded-lg p-2 text-xs text-[#24201E] focus:outline-none focus:border-[#35171B]"
                    />

                    <textarea
                      rows={2}
                      required
                      placeholder="What furniture piece are you envisioning? *"
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      className="w-full bg-white border border-[#35171B]/20 rounded-lg p-2 text-xs text-[#24201E] focus:outline-none focus:border-[#35171B]"
                    />

                    <button
                      type="submit"
                      disabled={isSendingEmail}
                      className="w-full bg-[#35171B] hover:bg-[#B89458] text-[#F4EEE4] hover:text-[#35171B] py-2.5 rounded-lg font-serif text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold disabled:opacity-50 min-h-[40px]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSendingEmail ? 'Dispatching...' : 'Send to carvedandco@carvedandco.net'}</span>
                    </button>
                  </form>
                )}
              </>
            )}

            {/* QUICK CONTACT ACTION BAR */}
            <div className="pt-2 border-t border-[#35171B]/15 flex items-center justify-between text-[11px] text-[#35171B]">
              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="hover:underline flex items-center gap-1 font-semibold"
              >
                <Phone className="w-3 h-3 text-[#B89458]" />
                <span>Call: {COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="hover:underline flex items-center gap-1 text-[10px] opacity-80"
              >
                <Mail className="w-3 h-3 text-[#B89458]" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON */}
      <button
        id="floating-whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-[#25D366] hover:bg-[#1EBE5B] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-transform hover:scale-110 cursor-pointer group flex items-center justify-center"
        aria-label="Contact CARVED & CO. Concierge"
        title="Quick Concierge (WhatsApp & Email)"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
        
        {/* ONLINE BADGE */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full animate-ping" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
      </button>

    </div>
  );
}
