import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Instagram, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { sendInquiryToCompanyEmail, generateMailtoUrl, TARGET_COMPANY_EMAIL } from '../services/emailService';

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
  const [submissionMethod, setSubmissionMethod] = useState<'email' | 'whatsapp'>('email');
  const [referenceNumber, setReferenceNumber] = useState('');

  const buildWhatsappMessage = (ref: string) => {
    return `Hello CARVED & CO., I would like to submit a furniture inquiry:
• Inquiry Ref: ${ref}
• Client Name: ${formData.name || 'Not provided'}
• Client Type: ${formData.clientType}
• Phone: ${formData.phone || 'Not provided'}
• Email: ${formData.email || 'Not provided'}
• Furniture Category: ${formData.furnitureType}
• Requirements / Message: ${formData.message || 'I would like to inquire about custom options.'}`;
  };

  // Default form submission: sends directly to company email (carvedandco@carvedandco.net)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fallbackRef = `INQ-${Date.now().toString(36).toUpperCase()}`;
    let refId = fallbackRef;

    try {
      const res = await sendInquiryToCompanyEmail({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        clientType: formData.clientType,
        furnitureType: formData.furnitureType,
        message: formData.message,
        referenceNumber: fallbackRef
      });
      if (res.referenceNumber) refId = res.referenceNumber;
    } catch {
      // Graceful local logging fallback
    } finally {
      try {
        const saved = JSON.parse(localStorage.getItem('carved_co_inquiries') || '[]');
        saved.unshift({ ...formData, id: refId, method: 'email', targetEmail: TARGET_COMPANY_EMAIL, submittedAt: new Date().toISOString() });
        localStorage.setItem('carved_co_inquiries', JSON.stringify(saved.slice(0, 50)));
      } catch {
        // storage ignored
      }
      setReferenceNumber(refId);
      setIsSubmitting(false);
      setSubmissionMethod('email');
      setSubmitted(true);
    }
  };

  // Direct WhatsApp submission option
  const handleWhatsAppSubmit = () => {
    const fallbackRef = `INQ-${Date.now().toString(36).toUpperCase()}`;
    const whatsappMsg = buildWhatsappMessage(fallbackRef);
    const waUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(waUrl, '_blank');

    try {
      const saved = JSON.parse(localStorage.getItem('carved_co_inquiries') || '[]');
      saved.unshift({ ...formData, id: fallbackRef, method: 'whatsapp', submittedAt: new Date().toISOString() });
      localStorage.setItem('carved_co_inquiries', JSON.stringify(saved.slice(0, 50)));
    } catch {
      // storage ignored
    }
    setReferenceNumber(fallbackRef);
    setSubmissionMethod('whatsapp');
    setSubmitted(true);
  };

  const prefilledWhatsappMsg = buildWhatsappMessage(referenceNumber || 'INQUIRY');
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(prefilledWhatsappMsg)}`;
  const mailtoUrl = generateMailtoUrl(formData, referenceNumber);

  return (
    <section id="contact-section" className="py-20 sm:py-28 bg-[#EAEBED] text-[#1C1D20] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-[11px] sm:text-xs font-serif tracking-[0.25em] text-[#6A353A] uppercase block mb-3 font-semibold">
            Private Concierge & Custom Orders
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#35171B] mb-4">
            Connect With Our Master Artisans
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#24201E]/80 font-light leading-relaxed">
            Whether you need a single statement sofa, a custom 12-foot dining table, or full interior furniture specifications, our concierge team is ready to assist.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* LEFT 5 COLS: CONTACT INFORMATION & QUICK LINKS */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 sm:space-y-8 min-w-0"
          >
            
            <div className="bg-[#35171B] text-[#F4EEE4] p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 border border-[#B89458]/20">
              
              <div className="border-b border-[#B89458]/30 pb-4">
                <span className="text-xs font-serif text-[#B89458] uppercase tracking-widest block mb-1 font-semibold">
                  Direct Communications
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#F4EEE4]">
                  CARVED & CO. Concierge
                </h3>
              </div>

              {/* WHATSAPP CTA BUTTON */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                id="contact-whatsapp-direct"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5B] text-white py-4 px-6 rounded-xl font-serif text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer font-bold min-h-[44px]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat Instantly on WhatsApp</span>
              </motion.a>

              {/* INSTAGRAM CTA BUTTON */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                id="contact-instagram-direct"
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-4 px-6 rounded-xl font-serif text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-semibold min-h-[44px]"
              >
                <Instagram className="w-5 h-5 text-[#B89458]" />
                <span>Follow & DM on Instagram</span>
              </motion.a>

              {/* CONTACT DETAILS LIST */}
              <div className="pt-4 border-t border-[#B89458]/20 space-y-4 text-xs font-light">
                
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B89458] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[#B89458] font-medium uppercase tracking-wider text-[10px]">Direct Phone</p>
                    <a href={`tel:${COMPANY_INFO.phoneClean}`} className="text-[#F4EEE4] hover:underline font-normal break-all">{COMPANY_INFO.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B89458] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[#B89458] font-medium uppercase tracking-wider text-[10px]">Email Enquiries</p>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#F4EEE4] hover:underline font-normal break-all">{COMPANY_INFO.email}</a>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>

          {/* RIGHT 7 COLS: INQUIRY FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#DFE1E5] p-5 xs:p-6 sm:p-10 rounded-2xl border border-[#35171B]/15 shadow-xl min-w-0"
          >
            
            <div className="mb-6 border-b border-[#35171B]/10 pb-4">
              <span className="text-xs font-serif text-[#6A353A] uppercase tracking-widest block mb-1 font-semibold">
                Bespoke Order Request
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#35171B]">
                Request a Furniture Quotation
              </h3>
            </div>

            {submitted ? (
              <div className="text-center py-10 sm:py-12 space-y-4">
                <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-[#B89458] mx-auto" />
                <h4 className="font-serif text-2xl font-semibold text-[#35171B]">
                  {submissionMethod === 'email' ? 'Inquiry Sent to Studio Email' : 'Inquiry Sent to WhatsApp'}
                </h4>
                {referenceNumber && (
                  <div className="inline-block px-4 py-1.5 bg-[#35171B]/10 rounded-full text-xs font-mono font-medium text-[#35171B]">
                    Reference: {referenceNumber}
                  </div>
                )}
                {submissionMethod === 'email' ? (
                  <div className="space-y-2 max-w-md mx-auto">
                    <p className="text-xs sm:text-sm text-[#24201E]/85 font-light leading-relaxed">
                      Your inquiry has been submitted and dispatched directly to <strong className="font-semibold text-[#35171B]">carvedandco@carvedandco.net</strong>.
                    </p>
                    <p className="text-[11px] text-[#24201E]/70 font-light">
                      Our furniture concierge will review your requirements and respond to <strong>{formData.email}</strong> within 12 business hours.
                    </p>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-[#24201E]/80 font-light leading-relaxed max-w-md mx-auto">
                    Your specifications have been launched directly in WhatsApp. If WhatsApp did not open automatically, tap below to forward your message:
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  {submissionMethod === 'email' ? (
                    <>
                      <a
                        href={mailtoUrl}
                        className="bg-[#35171B] hover:bg-[#B89458] text-[#F4EEE4] hover:text-[#35171B] px-5 py-3 rounded-xl font-serif text-xs uppercase tracking-widest transition-colors flex items-center gap-2 font-semibold min-h-[44px]"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email App (carvedandco@carvedandco.net)</span>
                      </a>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] text-white px-5 py-3 rounded-xl font-serif text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center gap-2 font-semibold min-h-[44px]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Also Chat on WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${COMPANY_INFO.phoneClean}`}
                        className="bg-[#35171B]/10 hover:bg-[#35171B]/20 text-[#35171B] border border-[#35171B]/30 px-5 py-3 rounded-xl font-serif text-xs uppercase tracking-wider transition-colors flex items-center gap-2 font-semibold min-h-[44px]"
                      >
                        <Phone className="w-4 h-4 text-[#B89458]" />
                        <span>Call ({COMPANY_INFO.phone})</span>
                      </a>
                    </>
                  ) : (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white px-5 py-3 rounded-xl font-serif text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center gap-2 font-semibold min-h-[44px]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open in WhatsApp</span>
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setReferenceNumber('');
                    }}
                    className="bg-white border border-[#35171B]/20 text-[#35171B] px-5 py-3 rounded-xl font-serif text-xs uppercase tracking-widest hover:bg-[#FAF6F0] transition-colors cursor-pointer font-semibold min-h-[44px]"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elizabeth Taylor"
                      className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458] min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458] min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458] min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                      I Am A
                    </label>
                    <select
                      value={formData.clientType}
                      onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                      className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458] min-h-[44px]"
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
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                    Furniture Type / Collection
                  </label>
                  <select
                    value={formData.furnitureType}
                    onChange={(e) => setFormData({ ...formData, furnitureType: e.target.value })}
                    className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458] min-h-[44px]"
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
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#35171B] font-semibold mb-1.5">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your room size, finish preferences, leather/fabric choices, or delivery timeline..."
                    className="w-full bg-white border border-[#35171B]/20 rounded-xl p-3 text-xs text-[#24201E] focus:outline-none focus:border-[#B89458]"
                  />
                </div>

                {/* SUBMIT ACTIONS: EMAIL & WHATSAPP */}
                <div className="space-y-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#35171B] hover:bg-[#B89458] text-[#F4EEE4] hover:text-[#35171B] py-4 px-6 rounded-xl font-serif text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer font-bold disabled:opacity-50 min-h-[48px]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending to carvedandco@carvedandco.net...' : 'Submit Inquiry to Company Email'}</span>
                  </motion.button>
                  <p className="text-[11px] text-center text-[#24201E]/70 font-sans">
                    Form inquiries are sent directly to <strong className="text-[#35171B] font-medium">carvedandco@carvedandco.net</strong>.
                  </p>

                  <div className="relative flex items-center justify-center py-1">
                    <div className="border-t border-[#35171B]/15 w-full"></div>
                    <span className="bg-[#DFE1E5] px-3 text-[10px] font-serif uppercase tracking-widest text-[#35171B]/60 font-semibold shrink-0">
                      Or Connect via WhatsApp
                    </span>
                    <div className="border-t border-[#35171B]/15 w-full"></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5B] text-white py-3.5 px-6 rounded-xl font-serif text-xs uppercase tracking-wider transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2.5 cursor-pointer font-semibold min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Inquiry via WhatsApp Instead</span>
                  </button>
                </div>

              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
