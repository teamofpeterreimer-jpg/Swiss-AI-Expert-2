
import React from 'react';
import { X, Mail, Phone, MapPin, Globe, Building2 } from 'lucide-react';

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content - Smaller width and strictly bounded height */}
      <div className="relative w-full max-w-2xl max-h-[80vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col animate-zoom-in">
        
        {/* Header - Fixed at top */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 backdrop-blur-sm z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-swiss-red rounded-full"></span>
            Impressum
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
            aria-label="Schließen"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 text-gray-300 space-y-8 prose prose-invert prose-slate max-w-none">
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">Angaben gemäß § 5 TMG</h3>
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-swiss-red/10 flex items-center justify-center shrink-0 border border-swiss-red/20">
                    <Building2 className="text-swiss-red" size={20} />
                </div>
                <div>
                  <p className="font-bold text-white text-lg leading-tight">Swiss AI Expert AG</p>
                  <p className="text-gray-400 text-sm">Im Stadtwald 5</p>
                  <p className="text-gray-400 text-sm">9400 Rorschach</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-700 pt-6 text-sm">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-swiss-red mb-1">
                    <Phone size={14} />
                    <span className="text-[9px] uppercase tracking-widest font-bold">Telefon</span>
                  </div>
                  <span>+49 (0) 89 / 24 88 35 850</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-swiss-red mb-1">
                    <Mail size={14} />
                    <span className="text-[9px] uppercase tracking-widest font-bold">E-Mail</span>
                  </div>
                  <a href="mailto:info@swiss-ai.expert" className="hover:text-swiss-red transition-colors break-all text-blue-400">info@swiss-ai.expert</a>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-swiss-red mb-1">
                    <Globe size={14} />
                    <span className="text-[9px] uppercase tracking-widest font-bold">Internet</span>
                  </div>
                  <a href="https://www.swiss-ai.expert" target="_blank" rel="noopener noreferrer" className="hover:text-swiss-red transition-colors text-blue-400">www.swiss-ai.expert</a>
                </div>
              </div>
            </div>
          </section>

          <div className="grid sm:grid-cols-2 gap-8">
            <section>
              <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest text-swiss-red flex items-center gap-2">
                  <div className="w-1 h-1 bg-swiss-red rounded-full"></div>
                  Inhaltlich Verantwortlich
              </h4>
              <p className="text-xs text-gray-500 mb-1 leading-relaxed">Gemäß § 18 Abs. 2 MStV:</p>
              <p className="font-bold text-white">Peter Reimer</p>
            </section>
            <section>
              <h4 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest text-swiss-red flex items-center gap-2">
                  <div className="w-1 h-1 bg-swiss-red rounded-full"></div>
                  Vorstand
              </h4>
              <p className="text-xs text-gray-500 mb-1 leading-relaxed">Vertretungsberechtigter Vorstand:</p>
              <p className="font-bold text-white">Peter Reimer <span className="text-[10px] font-normal text-gray-500 block sm:inline">(Vorsitzender)</span></p>
            </section>
          </div>

          <section className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-slate-800">
            <div>
              <h4 className="text-white font-bold mb-1 uppercase text-[10px] tracking-widest text-swiss-red">Handelsregister</h4>
              <p className="text-xs text-gray-500 mb-1">Kanton St. Gallen</p>
              <p className="font-bold text-white text-sm">CHE-386.600.069</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-1 uppercase text-[10px] tracking-widest text-swiss-red">USt-IdNr.</h4>
              <p className="text-xs text-gray-500 mb-1">Umsatzsteuer-Identifikation</p>
              <p className="font-bold text-white text-sm">CHE-386.600.069</p>
            </div>
          </section>

          <section className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800/50">
            <h4 className="text-white font-bold mb-4 uppercase text-[10px] tracking-widest text-swiss-red flex items-center gap-2">
                <MapPin size={12} />
                Zuständige Berufskammer
            </h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="font-bold text-white text-md">Amt für Handelsregister und Notariate</p>
                <p className="text-gray-400 text-xs leading-relaxed">Kanton St. Gallen<br/>Davidstrasse 27<br/>9001 St. Gallen</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/50 text-xs">
                  <div className="flex flex-col">
                      <span className="text-gray-600 uppercase text-[9px] tracking-wider font-bold mb-0.5">Telefon</span>
                      <span className="text-gray-300">+41 (0) 58 229 36 00</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-gray-600 uppercase text-[9px] tracking-wider font-bold mb-0.5">Telefax</span>
                      <span className="text-gray-300">+41 (0) 58 229 36 01</span>
                  </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Action - Fixed at bottom */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-all border border-slate-700 hover:border-slate-600 shadow-lg"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticeModal;
