import { X, ShieldCheck, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#F8F6F2] text-[#242424] w-full max-w-2xl rounded-xl shadow-2xl border border-[#3A2A22]/20 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#3A2A22] text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-[#C7A46A] text-[#C7A46A] hover:text-[#3A2A22] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-serif font-semibold shrink-0"
              aria-label="Back"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <ShieldCheck className="w-5 h-5 text-[#C7A46A] hidden xs:block" />
            <h3 className="font-serif text-base sm:text-xl font-normal">Privacy Policy</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded cursor-pointer hidden sm:block">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto text-xs text-[#242424]/80 font-light leading-relaxed">
          <p>
            At <strong>CARVED & CO.</strong>, we respect the privacy of our private homeowners, interior designers, and commercial partners.
          </p>

          <h4 className="font-serif text-sm font-semibold text-[#3A2A22]">1. Information Collection</h4>
          <p>
            When you request a quotation or custom furniture consultation via our WhatsApp or contact form, we collect your provided name, phone number, email address, and project specifications strictly to facilitate custom order production and white-glove delivery.
          </p>

          <h4 className="font-serif text-sm font-semibold text-[#3A2A22]">2. No E-Commerce Payment Processing</h4>
          <p>
            CARVED & CO. operates purely as an artisanal catalog showroom. We do not process online credit card transactions through third-party web portals. All custom specifications, finish approvals, and invoice deposits are handled directly with our concierge team.
          </p>

          <h4 className="font-serif text-sm font-semibold text-[#3A2A22]">3. Data Security</h4>
          <p>
            Your architectural drawings, room measurements, and contact details are stored securely and never sold, leased, or disclosed to external marketing brokers.
          </p>

          <h4 className="font-serif text-sm font-semibold text-[#3A2A22]">4. Contact Us</h4>
          <p>
            For any questions regarding our workshop privacy standards or custom orders, email us directly at <strong>concierge@carvedandco.com</strong>.
          </p>
        </div>

        <div className="p-4 bg-[#ECE8E1] text-right border-t border-[#3A2A22]/10">
          <button
            onClick={onClose}
            className="bg-[#3A2A22] text-white px-6 py-2 rounded text-xs font-serif uppercase tracking-wider hover:bg-[#C7A46A] hover:text-[#3A2A22] transition-colors cursor-pointer"
          >
            Close Disclosures
          </button>
        </div>
      </div>
    </div>
  );
}
