import { useState, FormEvent } from 'react';
import { 
  MessageCircle, 
  Instagram, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface ContactSectionProps {
  onOpenBespoke?: () => void;
}

export function ContactSection({ onOpenBespoke }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    furnitureType: 'Custom Sofas',
    clientType: 'Homeowner',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fallbackRef = `INQ-${Date.now().toString(36).toUpperCase()}`;
    let refId = fallbackRef;

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        const data = await res.json();
        if (data.referenceNumber) refId = data.referenceNumber;
      }
    } catch {
      // Graceful static hosting fallback for Hostinger
    } finally {
      try {
        const saved = JSON.parse(localStorage.getItem('carved_co_inquiries') || '[]');
        saved.unshift({ ...formData, id: refId, submittedAt: new Date().toISOString() });
        localStorage.setItem('carved_co_inquiries', JSON.stringify(saved.slice(0, 50)));
      } catch {
        // storage ignored
      }
      setReferenceNumber(refId);
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const prefilledWhatsappMsg = `Hello CARVED & CO., my name is ${formData.name || 'a client'}. I would like to inquire about ${formData.furnitureType}. Message: ${formData.message || 'I would like to discuss custom options.'}`;
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(prefilledWhatsappMsg)}`;

  return (
    <section id="contact-section" className="py-24 bg-[#F8F6F2] text-[#242424] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-serif tracking-[0.25em] text-[#8A6A4A] uppercase block mb-3">
            Private Concierge & Custom Orders
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#3A2A22] mb-4">
            Connect With Our Master Artisans
          </h2>
          <p className="text-sm text-[#242424]/80 font-light leading-relaxed">
            Whether you need a single statement sofa, a custom 12-foot dining table, or full interior furniture specifications, our concierge team is ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT 5 COLS: CONTACT INFORMATION & QUICK LINKS */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-[#3A2A22] text-[#F8F6F2] p-8 organic-corner-card shadow-2xl space-y-6 border border-[#C7A46A]/20">
              
              <div className="border-b border-[#C7A46A]/30 pb-4">
                <span className="text-xs font-serif text-[#C7A46A] uppercase tracking-widest block mb-1">
                  Direct Communications
                </span>
                <h3 className="font-serif text-2xl font-semibold text-white">
                  CARVED & CO. Concierge
                </h3>
              </div>

              {/* WHATSAPP CTA BUTTON */}
              <a
                id="contact-whatsapp-direct"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5B] text-white py-3.5 px-6 organic-corner-button font-serif text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer font-bold"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat Instantly on WhatsApp</span>
              </a>

              {/* INSTAGRAM CTA BUTTON */}
              <a
                id="contact-instagram-direct"
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3.5 px-6 organic-corner-button font-serif text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Instagram className="w-5 h-5 text-[#E1306C]" />
                <span>Follow & DM on Instagram</span>
              </a>

              {/* CONTACT DETAILS LIST */}
              <div className="pt-4 border-t border-[#C7A46A]/20 space-y-4 text-xs font-light">
                
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C7A46A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#C7A46A] font-medium uppercase tracking-wider text-[10px]">Direct Phone</p>
                    <a href={`tel:${COMPANY_INFO.phoneClean}`} className="text-white hover:underline">{COMPANY_INFO.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C7A46A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#C7A46A] font-medium uppercase tracking-wider text-[10px]">Email Enquiries</p>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:underline">{COMPANY_INFO.email}</a>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT 7 COLS: INQUIRY FORM */}
          <div className="lg:col-span-7 bg-[#F2EDE4] p-8 sm:p-10 organic-corner-card border border-[#3A2A22]/15 shadow-xl">
            
            <div className="mb-6 border-b border-[#3A2A22]/10 pb-4">
              <span className="text-xs font-serif text-[#8A6A4A] uppercase tracking-widest block mb-1">
                Bespoke Order Request
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#3A2A22]">
                Request a Furniture Quotation
              </h3>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-[#C7A46A] mx-auto" />
                <h4 className="font-serif text-2xl font-semibold text-[#3A2A22]">
                  Thank You for Reaching Out
                </h4>
                {referenceNumber && (
                  <div className="inline-block px-4 py-1.5 bg-[#3A2A22]/10 rounded-full text-xs font-mono font-medium text-[#3A2A22]">
                    Reference: {referenceNumber}
                  </div>
                )}
                <p className="text-sm text-[#242424]/80 font-light leading-relaxed max-w-md mx-auto">
                  We have received your message. A CARVED & CO. furniture designer will contact you within 12 business hours.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white px-5 py-2.5 organic-corner-button font-serif text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center gap-2 font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setReferenceNumber('');
                    }}
                    className="bg-[#3A2A22] text-[#F8F6F2] px-5 py-2.5 organic-corner-button font-serif text-xs uppercase tracking-widest hover:bg-[#C7A46A] hover:text-[#3A2A22] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#3A2A22] font-semibold mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elizabeth Taylor"
                      className="w-full bg-[#F8F6F2] border border-[#3A2A22]/20 organic-corner-badge p-3 text-xs text-[#242424] focus:outline-none focus:border-[#C7A46A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#3A2A22] font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#F8F6F2] border border-[#3A2A22]/20 organic-corner-badge p-3 text-xs text-[#242424] focus:outline-none focus:border-[#C7A46A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#3A2A22] font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-[#F8F6F2] border border-[#3A2A22]/20 organic-corner-badge p-3 text-xs text-[#242424] focus:outline-none focus:border-[#C7A46A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#3A2A22] font-semibold mb-1">
                      I Am A
                    </label>
                    <select
                      value={formData.clientType}
                      onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                      className="w-full bg-[#F8F6F2] border border-[#3A2A22]/20 organic-corner-badge p-3 text-xs text-[#242424] focus:outline-none focus:border-[#C7A46A]"
                    >
                      <option value="Homeowner">Homeowner</option>
                      <option value="Interior Designer">Interior Designer</option>
                      <option value="Architect">Architect</option>
                      <option value="Luxury Home Builder">Luxury Home Builder</option>
                      <option value="Hospitality / Commercial">Hospitality / Commercial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#3A2A22] font-semibold mb-1">
                    Furniture Type / Collection
                  </label>
                  <select
                    value={formData.furnitureType}
                    onChange={(e) => setFormData({ ...formData, furnitureType: e.target.value })}
                    className="w-full bg-[#F8F6F2] border border-[#3A2A22]/20 organic-corner-badge p-3 text-xs text-[#242424] focus:outline-none focus:border-[#C7A46A]"
                  >
                    <option value="Custom Sofas">Sofas & Sectionals</option>
                    <option value="Dining Tables">Dining Tables</option>
                    <option value="Coffee & Center Tables">Coffee & Center Tables</option>
                    <option value="Entry Consoles">Entry Consoles & Side Tables</option>
                    <option value="Bedside & Dressing Tables">Bedside & Dressing Tables</option>
                    <option value="Entire Bespoke Home Package">Entire Bespoke Home Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#3A2A22] font-semibold mb-1">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your room size, finish preferences, leather/fabric choices, or delivery timeline..."
                    className="w-full bg-[#F8F6F2] border border-[#3A2A22]/20 organic-corner-badge p-3 text-xs text-[#242424] focus:outline-none focus:border-[#C7A46A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3A2A22] hover:bg-[#C7A46A] text-[#F8F6F2] hover:text-[#3A2A22] py-4 px-6 organic-corner-button font-serif text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer font-bold disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting to Studio...' : 'Submit Order Inquiry'}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
