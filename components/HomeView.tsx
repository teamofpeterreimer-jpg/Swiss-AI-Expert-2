
import React, { useState, useEffect } from 'react';
import ChatWidget from './ChatWidget';
import Logo from './Logo';
import HologramGraphic from './HologramGraphic';
import HologramIcon from './HologramIcon';
import ScrollReveal from './ScrollReveal';
import PrivacyModal from './PrivacyModal';
import LegalNoticeModal from './LegalNoticeModal';
import SitemapModal from './SitemapModal';
import { SectionId, WebsiteContent } from '../types';
import { getContent } from '../services/cmsService';
import {
  Users,
  Megaphone,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Play,
  X,
  ShieldCheck,
  Loader2,
  Video,
  Globe,
  Search,
  Zap,
  RefreshCw,
  ClipboardCheck,
  ArrowDown,
  Settings,
  Network,
  Link as LinkIcon
} from 'lucide-react';

interface HomeViewProps {
  onNavigateToDetail: (detailId: string) => void;
  setActiveSection: (id: string) => void;
  onNavigate: (sectionId: string) => void;
}

const RoadmapStep: React.FC<{
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  isLast?: boolean
}> = ({ number, title, desc, icon, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex gap-8 md:gap-12 group pb-12 last:pb-0">
      {!isLast && (
        <div className="absolute left-7 top-14 bottom-0 w-0.5 bg-gradient-to-b from-swiss-red via-blue-600 to-transparent opacity-30 group-hover:opacity-60 transition-opacity"></div>
      )}

      <div className="relative z-10 shrink-0">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-lg ${isOpen ? 'bg-swiss-red border-white text-white shadow-swiss-red/40 scale-110' : 'bg-slate-900 border-slate-700 text-swiss-red hover:border-swiss-red/50'}`}>
          {icon}
          <div className="absolute -top-2 -right-2 bg-slate-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-700 text-gray-400">{number}</div>
        </div>
        {isOpen && <div className="absolute inset-0 bg-swiss-red/20 blur-xl rounded-full animate-pulse"></div>}
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex-1 bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:border-swiss-red/30 relative overflow-hidden ${isOpen ? 'bg-slate-800/40 shadow-xl' : ''}`}
      >
        <div className="flex justify-between items-center">
          <h3 className={`text-xl font-bold transition-colors ${isOpen ? 'text-white' : 'text-gray-200'}`}>{title}</h3>
          <ArrowDown size={16} className={`text-gray-500 transition-transform duration-500 ${isOpen ? 'rotate-180 text-swiss-red' : ''}`} />
        </div>

        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <p className="text-gray-400 text-sm leading-relaxed border-t border-slate-700/50 pt-4">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeView: React.FC<HomeViewProps> = ({ onNavigateToDetail, setActiveSection, onNavigate }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [cms, setCms] = useState<WebsiteContent | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: 'Digitale Mitarbeiter'
  });

  useEffect(() => {
    const content = getContent();
    setCms(content);
    document.title = content.seo.globalTitle;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { threshold: 0.3 });
    Object.values(SectionId).forEach((id) => {
      const el = document.getElementById(id); if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [setActiveSection]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mreeagjq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(contactForm)
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
        setContactForm({ name: '', company: '', email: '', phone: '', interest: 'Digitale Mitarbeiter' });
      } else {
        alert("Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.");
      }
    } catch (error) {
      console.error("Formspree error:", error);
      alert("Es gab einen Fehler bei der Übermittlung.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cms) return null;

  return (
    <>
      {/* Hero Section */}
      <section id={SectionId.HOME} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            <div className="mb-8 animate-zoom-in"><Logo className="w-48 h-48 md:w-64 md:h-64" showTagline={true} /></div>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-swiss-red/30 bg-swiss-red/10 backdrop-blur-sm">
              <span className="text-swiss-red font-medium text-sm tracking-wide uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-swiss-red animate-pulse"></span>
                KI für KMUs im DACH-Raum
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight drop-shadow-2xl">
              {cms.hero.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400">{cms.hero.subtitle}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {cms.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate(SectionId.CONTACT)} className="px-8 py-4 bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-blue-500/20">{cms.hero.ctaPrimary}</button>
              <button onClick={() => onNavigate(SectionId.DEMO)} className="px-8 py-4 bg-slate-800 border border-slate-700 rounded-lg font-bold hover:bg-slate-700 transition-all">{cms.hero.ctaSecondary}</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id={SectionId.ABOUT} className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="fade-in-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">{cms.about.title}</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {cms.about.description}
              </p>
              <div className="space-y-4">
                {cms.about.features.map((f, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                    <CheckCircle className="text-swiss-red shrink-0" />
                    <div><h3 className="font-bold">{f.title}</h3><p className="text-gray-400 text-sm">{f.desc}</p></div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-4">
              <HologramIcon icon={Users} value="Digitale MA" label="Ressourcen" onClick={() => onNavigateToDetail('digital-employees')} />
              <HologramIcon icon={Megaphone} value="Marketing" label="Wachstum" onClick={() => onNavigateToDetail('marketing')} />
              <HologramIcon icon={Globe} value="Webdesign" label="Präsenz" onClick={() => onNavigateToDetail('webdesign')} />
              <HologramIcon icon={Video} value="KI Video" label="Storytelling" onClick={() => onNavigateToDetail('ki-video')} />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Card */}
      <section className="py-12 md:py-24 relative z-10 flex justify-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl" onClick={() => setIsVideoOpen(true)}>
            <div className="absolute inset-0 bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x opacity-60 group-hover:opacity-100 transition-all"></div>
            <div className="absolute inset-[2px] bg-slate-900 rounded-[22px] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
            </div>
            <div className="relative z-10 h-[350px] md:h-[450px] flex flex-col items-center justify-center p-8">
              <div className="relative mb-8 group-hover:scale-110 transition-transform">
                <div className="w-24 h-24 bg-slate-800/80 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">VISION ANSEHEN</h3>
                <p className="text-gray-400 mt-2">Wie KI Ihr Geschäftsmodell verändern wird.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Roadmap Section */}
      <section id={SectionId.SERVICES} className="py-24 bg-blue-950/40 border-y border-blue-900/20 backdrop-blur-sm shadow-inner relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <ScrollReveal animation="fade-in-up">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-white mb-6">Zusammenarbeit & KMU Roadmap</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Der strukturierte Weg zu Ihrem intelligenten Unternehmen. Wir begleiten Sie in jeder Phase Ihrer digitalen Transformation mit Schweizer Präzision.</p>
            </div>
          </ScrollReveal>

          <div className="space-y-2">
            <ScrollReveal animation="fade-in-up" delay={100}>
              <RoadmapStep
                number="01"
                title="Analyse-Gespräch"
                icon={<Search size={24} />}
                desc="In einem ersten Gespräch identifizieren wir Ihre individuellen KI-Potenziale und klären offene Fragen zur Machbarkeit innerhalb Ihrer Branche."
              />
            </ScrollReveal>
            <ScrollReveal animation="fade-in-up" delay={200}>
              <RoadmapStep
                number="02"
                title="Strategie & Audit"
                icon={<ClipboardCheck size={24} />}
                desc="Wir führen ein technisches Audit Ihrer Daten durch und erstellen eine detaillierte Roadmap für Ihre KI-Transformation inklusive klarer Erfolgskennzahlen."
              />
            </ScrollReveal>
            <ScrollReveal animation="fade-in-up" delay={300}>
              <RoadmapStep
                number="03"
                title="Technische Integration"
                icon={<Zap size={24} />}
                desc="Unsere Experten binden die KI-Modelle (wie Sprachmodelle oder Agenten) nahtlos in Ihre bestehende Infrastruktur und täglichen Workflows ein."
              />
            </ScrollReveal>
            <ScrollReveal animation="fade-in-up" delay={400}>
              <RoadmapStep
                number="04"
                title="Betreuung & Training"
                icon={<Users size={24} />}
                desc="Wir lassen Sie nicht allein. Wir schulen Ihre Mitarbeiter im Umgang mit den neuen Tools und begleiten den Live-Betrieb für maximale Akzeptanz."
              />
            </ScrollReveal>
            <ScrollReveal animation="fade-in-up" delay={500}>
              <RoadmapStep
                number="05"
                title="Datenschutz & Audit"
                icon={<ShieldCheck size={24} />}
                desc="Wir garantieren 100% DSGVO-konforme Lösungen. Ihre sensiblen Unternehmensdaten werden ausschliesslich auf sicheren Servern verarbeitet."
              />
            </ScrollReveal>
            <ScrollReveal animation="fade-in-up" delay={600}>
              <RoadmapStep
                number="06"
                title="Laufende Updates"
                isLast
                icon={<RefreshCw size={24} />}
                desc="Die KI-Welt dreht sich rasant. Wir sorgen dafür, dass Ihre Systeme immer auf dem neuesten Stand der Technik bleiben und kontinuierlich optimiert werden."
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id={SectionId.DEMO} className="py-24 relative overflow-hidden flex flex-col items-center justify-center min-h-[700px]">
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-20">
          <HologramGraphic className="w-[800px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 w-full max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Live Demo: Swiss AI Assistant</h2>
            <p className="text-gray-300 mt-4">Fragen Sie unseren Assistenten alles über KI-Integration für KMUs.</p>
          </div>
          <ChatWidget />
        </div>
      </section>

      {/* Contact Section */}
      <section id={SectionId.CONTACT} className="py-24 bg-slate-950/80 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="grid md:grid-cols-2">
              <div className="p-10 bg-gradient-to-br from-swiss-red to-red-900 text-white relative">
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">Transformation starten</h3>
                  <p className="mb-8 text-white/80">Lassen Sie uns besprechen, wie unsere KI-Lösungen Ihr Unternehmen voranbringen können.</p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4"><Mail className="text-white/80" /><span>{cms.contact.email}</span></div>
                    <div className="flex items-center gap-4"><Phone className="text-white/80" /><span>{cms.contact.phone}</span></div>
                    <div className="flex items-center gap-4"><MapPin className="text-white/80" /><span>{cms.contact.address}</span></div>
                  </div>
                </div>
              </div>
              <div className="p-10 relative">
                {isSuccess ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 z-20 animate-fade-in text-center p-6">
                    <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
                    <h3 className="text-xl font-bold">Anfrage gesendet!</h3>
                    <p className="text-gray-400 mt-2">Vielen Dank. Wir melden uns in Kürze bei Ihnen.</p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleContactSubmit}>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-swiss-red transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Unternehmen"
                      required
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-swiss-red transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-swiss-red transition-all"
                    />
                    <input
                      type="tel"
                      placeholder="Telefonnummer"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-swiss-red transition-all"
                    />
                    <select
                      value={contactForm.interest}
                      onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-swiss-red transition-all cursor-pointer"
                    >
                      <option>Digitale Mitarbeiter</option>
                      <option>Marketing Automation</option>
                      <option>Strategieberatung</option>
                      <option>KI Video</option>
                    </select>
                    <button
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-70 border border-white/10"
                    >
                      {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Sende...</> : "Jetzt anfragen"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="text-gray-500 text-sm order-3 md:order-1">
            &copy; {new Date().getFullYear()} Swiss AI Expert AG. Alle Rechte vorbehalten.
          </div>

          <div className="flex flex-col items-center gap-2 order-1 md:order-2">
            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">site by</span>
            <div className="flex items-center justify-center group cursor-pointer">
              <img src="https://i.imgur.com/95bAVmK.png" alt="Fuchs Logo" className="w-24 h-24 md:w-32 md:h-32 object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

          <div className="flex gap-6 text-gray-400 text-sm items-center order-2 md:order-3">
            <button onClick={() => setIsSitemapOpen(true)} className="hover:text-white transition-colors">Sitemap</button>
            <button onClick={() => setIsLegalOpen(true)} className="hover:text-white transition-colors">Impressum</button>
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Datenschutz</button>
            <button
              onClick={() => onNavigate(SectionId.ADMIN)}
              className="w-10 h-10 flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700 hover:text-swiss-red hover:border-swiss-red/50 transition-all"
              title="Admin Login"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </footer>

      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-zoom-in">
          <button onClick={() => setIsVideoOpen(false)} className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full"><X size={32} /></button>
          <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/5I6dqV5n7xg?autoplay=1" allowFullScreen></iframe>
          </div>
        </div>
      )}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <LegalNoticeModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
      <SitemapModal isOpen={isSitemapOpen} onClose={() => setIsSitemapOpen(false)} />
    </>
  );
};

export default HomeView;
