import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, Bell } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'submitting') return;

    setStatus('submitting');

    try {
      // Simulation eines API-Calls (z.B. Formspree oder eigener Endpunkt)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-swiss-red/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal animation="zoom-in">
          <div className="max-w-4xl mx-auto bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            
            {/* Animated Border Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-swiss-red/0 via-swiss-red/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-swiss-red/10 border border-swiss-red/20 text-swiss-red text-xs font-bold tracking-widest uppercase mb-6">
                  <Bell size={14} className="animate-bounce" />
                  Immer einen Schritt voraus
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  KI-Insights & <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-swiss-red to-blue-400">Branchen-Updates</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Erhalten Sie monatlich kuratierte Informationen über die neuesten KI-Trends in der Schweiz und wie KMUs davon profitieren.
                </p>
              </div>

              <div className="relative">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-4 animate-fade-in-up">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-green-500/50">
                      <CheckCircle className="text-green-500" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Willkommen an Bord!</h3>
                    <p className="text-gray-400 text-center mt-2">Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-sm text-swiss-red hover:underline"
                    >
                      Noch eine Anmeldung?
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === 'submitting'}
                        placeholder="Ihre E-Mail-Adresse"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-swiss-red focus:ring-1 focus:ring-swiss-red transition-all disabled:opacity-50"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'submitting' || !email}
                      className="w-full bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-swiss-red/20 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Verarbeite...
                        </>
                      ) : (
                        <>
                          Jetzt abonnieren
                          <Send size={18} />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-gray-500 text-center px-4">
                      Durch das Abonnieren akzeptieren Sie unsere Datenschutzbestimmungen. Abmeldung jederzeit möglich.
                    </p>
                    {status === 'error' && (
                      <p className="text-red-400 text-xs text-center">Ups! Da ist etwas schiefgelaufen. Bitte erneut versuchen.</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsletterSection;