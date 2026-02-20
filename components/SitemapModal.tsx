import React from 'react';
import { X, Network, ChevronRight, Globe, FileText, Settings, ShieldCheck, Mail } from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const structure = [
    {
      title: 'Hauptnavigation',
      icon: <Globe size={18} className="text-swiss-red" />,
      links: ['Startseite', 'Über Swiss AI', 'KMU Roadmap', 'Live Demo', 'KI-News Feed', 'Kontakt']
    },
    {
      title: 'Leistungen & Details',
      icon: <Network size={18} className="text-blue-400" />,
      links: ['Digitale Mitarbeiter', 'KI-Marketing Automation', 'Intelligentes Webdesign', 'KI-Video Generation']
    },
    {
      title: 'Rechtliches & Sicherheit',
      icon: <ShieldCheck size={18} className="text-green-400" />,
      links: ['Impressum', 'Datenschutzerklärung', 'Sicherheits-Audit (Schweiz)']
    },
    {
      title: 'Administration',
      icon: <Settings size={18} className="text-gray-400" />,
      links: ['Admin Dashboard', 'News CMS', 'Content Editor']
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md animate-fade-in" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-zoom-in">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-swiss-red/10 flex items-center justify-center border border-swiss-red/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
              <Network size={20} className="text-swiss-red" />
            </div>
            Website-Struktur / Sitemap
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 grid sm:grid-cols-2 gap-8">
          {structure.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                {section.icon}
                <h3 className="font-bold text-sm uppercase tracking-widest text-white/80">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx} className="flex items-center gap-2 text-gray-400 hover:text-swiss-red transition-colors cursor-default text-sm group">
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end">
          <button onClick={onClose} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-all border border-slate-700">
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default SitemapModal;