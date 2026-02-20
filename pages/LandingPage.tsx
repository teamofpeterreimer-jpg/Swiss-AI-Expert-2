import React from 'react';
import ChatWidget from '../components/ChatWidget';
import Logo from '../components/Logo';
import HologramGraphic from '../components/HologramGraphic';
import HologramIcon from '../components/HologramIcon';
import ServiceCard from '../components/ServiceCard';
import ScrollReveal from '../components/ScrollReveal';
import { SectionId } from '../types';
import { 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Code2, 
  BarChart3, 
  Cpu,
  Mail,
  MapPin,
  Phone,
  Bot,
  Play,
  Activity,
  Users,
  Megaphone,
  Loader2,
  X
} from 'lucide-react';

interface LandingPageProps {
  isVideoOpen: boolean;
  setIsVideoOpen: (open: boolean) => void;
  contactForm: any;
  handleContactChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleContactSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  errorMessage: string;
}

const LandingPage: React.FC<LandingPageProps> = ({
  isVideoOpen,
  setIsVideoOpen,
  contactForm,
  handleContactChange,
  handleContactSubmit,
  isSubmitting,
  isSuccess,
  errorMessage
}) => {
  return (
    <>
      {/* Hero Section */}
        <section id={SectionId.HOME} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          
          <div className="container mx-auto px-4 z-10 relative">
            <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
              {/* Logo as Main Element in Hero - Animated on Load */}
              <div className="mb-8 hover:scale-105 transition-transform duration-700 ease-out animate-zoom-in">
                 <Logo className="w-48 h-48 md:w-64 md:h-64" showTagline={true} />
              </div>

              <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-swiss-red/30 bg-swiss-red/10 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <span className="text-swiss-red font-medium text-sm tracking-wide uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-swiss-red animate-pulse"></span>
                    KI für KMUs im DACH-Raum
                  </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                Maßgeschneiderte KI-Lösungen & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  Digitale Mitarbeiter
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                Wir transformieren Unternehmen im DACH-Raum durch intelligente Automation. Etablieren Sie digitale Mitarbeiter und revolutionieren Sie Ihr Marketing mit generativer KI – sicher, effizient und lokal.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <button 
                  onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group border border-white/10"
                >
                  Kostenlose KI-Analyse
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* Demo Button - Updated to match HologramIcon style */}
                <button 
                   onClick={() => document.getElementById(SectionId.DEMO)?.scrollIntoView({ behavior: 'smooth' })}
                   className="relative group w-full sm:w-auto rounded-lg transition-transform duration-300 hover:scale-105 flex items-center justify-center"
                >
                  {/* 1. Default Background (Static) - Disappears on hover */}
                  <div className="absolute inset-0 bg-slate-800/80 border border-slate-600 rounded-lg transition-opacity duration-300 group-hover:opacity-0 backdrop-blur-sm"></div>

                  {/* 2. Hover Background (Animated Gradient Border) - Appears on hover */}
                  <div className="absolute inset-0 rounded-lg p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <div className="h-full w-full bg-slate-900 rounded-[7px]"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 px-8 py-4 font-semibold text-white flex items-center justify-center gap-2 group-hover:text-blue-100 transition-colors">
                    Digitale Mitarbeiter live erleben
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
            <ArrowRight className="transform rotate-90" />
          </div>
        </section>

        {/* About Section */}
        <section id={SectionId.ABOUT} className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <ScrollReveal animation="fade-in-right">
                <div className="space-y-8">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Warum <span className="text-swiss-red">Swiss AI?</span>
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Die Zukunft gehört Unternehmen, die KI nicht nur nutzen, sondern integrieren. Swiss AI hilft KMUs im DACH-Raum dabei, <strong>Digitale Mitarbeiter</strong> einzustellen, die niemals schlafen, und Marketing-Kampagnen zu automatisieren, die messbar mehr Leads generieren.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { title: 'Effizienzsteigerung', desc: 'Reduzieren Sie repetitive Aufgaben um bis zu 80% durch KI.' },
                      { title: 'Wachstum durch KI', desc: 'Skalieren Sie Marketing und Vertrieb ohne zusätzliches Personal.' },
                      { title: 'Schweizer Werte', desc: 'Präzision, Verlässlichkeit und höchster Datenschutz.' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-slate-700/50">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle className="text-swiss-red" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{item.title}</h3>
                          <p className="text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fade-in-left" delay={200}>
                <div className="relative">
                  {/* Decorative Glowing Effect behind the box */}
                  <div className="absolute inset-0 bg-swiss-red/20 blur-3xl rounded-full opacity-30 animate-pulse"></div>
                  
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl relative shadow-2xl">
                     <div className="grid grid-cols-2 gap-4">
                        <HologramIcon 
                          icon={Users} 
                          value="Digitale MA" 
                          label="Ressourcen" 
                          description="Stellen Sie KI-Agenten ein: 24/7 Kundensupport, automatisierte Sachbearbeitung und intelligente Terminplanung."
                          linkTo="/digitale-mitarbeiter"
                        />
                        <HologramIcon 
                          icon={Megaphone} 
                          value="KI Marketing" 
                          label="Wachstum" 
                          description="Generieren Sie Content, SEO-Texte und Social Media Kampagnen auf Autopilot für maximale Sichtbarkeit."
                          linkTo="/marketing"
                        />
                        <HologramIcon 
                          icon={ShieldCheck} 
                          value="Datenschutz" 
                          label="Sicherheit" 
                          description="Unsere KI-Lösungen sind DSGVO-konform. Ihre sensiblen Unternehmensdaten bleiben geschützt."
                          linkTo="/datenschutz"
                        />
                        <HologramIcon 
                          icon={Cpu} 
                          value="Integration" 
                          label="Technik" 
                          description="Nahtlose Anbindung an Ihre bestehenden CRM- und ERP-Systeme. Keine Insellösungen, sondern Workflow."
                          linkTo="/integration"
                        />
                     </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Vision / Call to Action Card Section (Triggers Video) */}
        <section className="py-12 md:py-24 relative z-10 flex justify-center">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Interactive Card */}
            <div 
                className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-[0_0_50px_rgba(59,130,246,0.2)] hover:shadow-[0_0_80px_rgba(239,68,68,0.3)] transition-all duration-500"
                onClick={() => setIsVideoOpen(true)}
            >
                {/* 1. Animated Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* 2. Inner Content Background */}
                <div className="absolute inset-[2px] bg-slate-900 rounded-[22px] overflow-hidden">
                    {/* Abstract Grid Background */}
                    <div className="absolute inset-0 opacity-20" 
                         style={{ 
                             backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', 
                             backgroundSize: '40px 40px' 
                         }}>
                    </div>
                    
                    {/* Animated Pulse Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15),transparent_70%)] transition-colors duration-500"></div>
                </div>

                {/* 3. Main Content Content */}
                <div className="relative z-10 h-[350px] md:h-[450px] flex flex-col items-center justify-center p-8">
                    
                    {/* Center Action Button */}
                    <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500">
                        {/* Ring Animations */}
                        <div className="absolute inset-0 -m-8 border border-blue-500/30 rounded-full animate-[spin_8s_linear_infinite] group-hover:border-swiss-red/40 transition-colors"></div>
                        <div className="absolute inset-0 -m-4 border border-swiss-red/30 rounded-full animate-[spin_6s_linear_infinite_reverse] border-dashed"></div>
                        
                        {/* Glow */}
                        <div className="absolute inset-0 bg-swiss-red/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Button Body */}
                        <div className="w-24 h-24 bg-slate-800/80 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:border-swiss-red/50 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-tr from-swiss-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Play className="w-10 h-10 text-white fill-white relative z-10 ml-1" />
                        </div>
                    </div>

                    <div className="text-center space-y-3">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase group-hover:bg-swiss-red/10 group-hover:border-swiss-red/20 group-hover:text-swiss-red transition-colors">
                            <Activity size={14} className="animate-pulse" />
                            KI Potenzial entfesseln
                         </div>
                         <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all">
                             VISION ANSEHEN
                         </h3>
                         <p className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors">
                             Wie KI Ihr Geschäftsmodell verändern wird.
                         </p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id={SectionId.SERVICES} className="py-24 bg-slate-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-in-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Lösungen für KMUs</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Von der Strategie bis zur Implementierung: Wir bieten schlüsselfertige KI-Produkte für Marketing, Vertrieb und Administration.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Bot size={28} />,
                  title: "Digitale Mitarbeiter",
                  desc: "Implementierung intelligenter KI-Agenten für Kundensupport (Chatbots), Terminvereinbarung und Lead-Qualifizierung rund um die Uhr."
                },
                {
                  icon: <BarChart3 size={28} />,
                  title: "KI-Marketing & Sales",
                  desc: "Automatisierte Content-Erstellung, personalisierte Kundenansprache und Predictive Analytics für höhere Conversion-Rates."
                },
                {
                  icon: <Code2 size={28} />,
                  title: "Prozess-Integration",
                  desc: "Wir verbinden ChatGPT & Co. sicher mit Ihren Unternehmensdaten (RAG), um interne Wissensdatenbanken nutzbar zu machen."
                }
              ].map((service, idx) => (
                <ScrollReveal key={idx} animation="fade-in-up" delay={idx * 150}>
                  <ServiceCard 
                    icon={service.icon}
                    title={service.title}
                    description={service.desc}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id={SectionId.DEMO} className="py-24 relative overflow-hidden flex flex-col items-center justify-center min-h-[800px]">
            {/* Tech background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.05)_0%,_transparent_50%)] z-0"></div>
          
            {/* Holographic Background Layer - Centered & Large */}
            <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none">
                <div className="w-[800px] md:w-[1200px] opacity-30 animate-pulse-slow transform scale-125">
                     <HologramGraphic className="w-full h-full" />
                </div>
            </div>

          <div className="container mx-auto px-4 relative z-10 w-full max-w-4xl">
            <ScrollReveal animation="zoom-in">
              <div className="text-center mb-12">
                <span className="text-swiss-red font-semibold tracking-wider text-sm border border-swiss-red/30 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md">LIVE DEMO</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-6 text-white drop-shadow-md">Testen Sie Ihren digitalen Assistenten</h2>
                <p className="text-gray-300 mt-4 max-w-xl mx-auto drop-shadow-sm font-medium">
                  Stellen Sie Fragen zu KI-Integration, Marketing-Automation oder unseren Dienstleistungen.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-in-up" delay={200}>
              <div className="flex justify-center w-full">
                <div className="w-full shadow-2xl shadow-blue-900/10">
                   <ChatWidget />
                </div>
              </div>
            </ScrollReveal>
            
          </div>
        </section>

        {/* Contact Section */}
        <section id={SectionId.CONTACT} className="py-24 bg-slate-950/80 border-t border-slate-900">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fade-in-up">
              <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                <div className="grid md:grid-cols-2">
                  <div className="p-10 bg-gradient-to-br from-swiss-red to-red-900 text-white flex flex-col justify-between relative overflow-hidden">
                     {/* Geometric pattern overlay */}
                     <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-6">Transformation starten</h3>
                      <p className="text-white/80 mb-8">
                        Lassen Sie uns besprechen, wie Digitale Mitarbeiter und KI-Marketing Ihr Unternehmen voranbringen können.
                      </p>
                      
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <Mail className="text-white/80" />
                          <span>sebastian.fuchs@expert.versicherung</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Phone className="text-white/80" />
                          <span>+41 44 123 45 67</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <MapPin className="text-white/80" />
                          <span>Im Stadtwald 5, 9400 Rorschach</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-12 relative z-10">
                       <div className="w-16 h-1 bg-white/30 rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-10 relative">
                    {isSuccess ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center animate-fade-in-up bg-slate-900/50 backdrop-blur-sm z-20">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/50">
                                <CheckCircle className="text-green-500 w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Anfrage gesendet!</h3>
                            <p className="text-gray-300">
                                Vielen Dank, {contactForm.name}.<br/>
                                Ihre Anfrage wurde erfolgreich an <strong>Sebastian Fuchs</strong> weitergeleitet.
                            </p>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleContactSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                            <input 
                            type="text" 
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactChange}
                            required
                            disabled={isSubmitting}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-swiss-red focus:bg-slate-800 transition-all cursor-text disabled:opacity-50" 
                            placeholder="Max Muster" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input 
                            type="email" 
                            name="email"
                            value={contactForm.email}
                            onChange={handleContactChange}
                            required
                            disabled={isSubmitting}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-swiss-red focus:bg-slate-800 transition-all cursor-text disabled:opacity-50" 
                            placeholder="max@firma.ch" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Interesse an</label>
                            <select 
                            name="interest"
                            value={contactForm.interest}
                            onChange={handleContactChange}
                            disabled={isSubmitting}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-swiss-red focus:bg-slate-800 transition-all cursor-pointer disabled:opacity-50"
                            >
                                <option>Digitale Mitarbeiter</option>
                                <option>KI Marketing Automation</option>
                                <option>Strategieberatung</option>
                                <option>Anderes</option>
                            </select>
                        </div>
                        {errorMessage && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200 text-sm">
                                {errorMessage}
                            </div>
                        )}
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/20 border border-white/10 flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-wait"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Sende Anfrage...
                                </>
                            ) : (
                                "Jetzt anfragen"
                            )}
                        </button>
                        </form>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      {/* Full Screen Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 animate-zoom-in">
           {/* Close Button */}
           <button 
             onClick={() => setIsVideoOpen(false)}
             className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-swiss-red transition-colors bg-black/50 p-2 rounded-full border border-white/10 hover:border-swiss-red z-[110]"
           >
             <X size={32} />
           </button>
           
           {/* Video Container */}
           <div className="w-full max-w-6xl relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.2)] border border-slate-800 bg-black aspect-video">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/5I6dqV5n7xg?autoplay=1&rel=0&modestbranding=1" 
                title="Swiss AI Vision"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
           </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
