
import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle, ArrowRight, Camera } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import HologramGraphic from './HologramGraphic';
import { DetailPageData, SectionId } from '../types';

interface DetailPageProps {
  data: DetailPageData;
  onBack: () => void;
  onContact: () => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ data, onBack, onContact }) => {
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-slate-900">
      
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-10 pointer-events-none -translate-y-1/2 translate-x-1/3">
        <HologramGraphic className="w-full h-full" />
      </div>

      {/* Decorative Background Camera for KI Video Page */}
      {data.id === 'ki-video' && (
        <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none select-none z-0">
          <div className="absolute bottom-[-5%] right-[-2%] w-[500px] h-[500px] md:w-[700px] md:h-[700px]">
            <img 
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200" 
              alt="Background Camera Decor" 
              className="w-full h-full object-contain opacity-40 mix-blend-screen drop-shadow-[0_0_50px_rgba(59,130,246,0.3)] animate-float"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Back Button */}
        <button 
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-4 py-2 rounded-lg hover:bg-white/5 backdrop-blur-sm"
        >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Übersicht
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Content */}
            <div className="relative z-20">
                <ScrollReveal animation="fade-in-right">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-swiss-red shadow-[0_0_30px_rgba(239,68,68,0.25)] backdrop-blur-md">
                            <data.icon size={32} />
                        </div>
                        <div>
                            <span className="text-swiss-red font-bold tracking-wider uppercase text-sm">Swiss AI Solutions</span>
                            <h1 className="text-4xl md:text-5xl font-bold mt-1 leading-tight text-white">{data.title}</h1>
                        </div>
                    </div>
                    
                    <h2 className="text-2xl text-blue-100 font-light mb-8 border-l-4 border-swiss-red pl-4">
                        {data.subtitle}
                    </h2>

                    <div className="prose prose-lg prose-invert text-gray-200 mb-12">
                        <p className="whitespace-pre-line leading-relaxed font-medium">
                            {data.description}
                        </p>
                    </div>

                    <div className="space-y-6 mb-12">
                        <h3 className="text-xl font-bold text-white uppercase tracking-widest text-sm border-b border-white/10 pb-2">Ihre Vorteile</h3>
                        <div className="grid gap-4">
                            {data.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-swiss-red/40 transition-all backdrop-blur-md group/benefit">
                                    <div className="mt-1 flex-shrink-0">
                                        <CheckCircle className="text-swiss-red" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{benefit.title}</h4>
                                        <p className="text-sm text-gray-400 mt-1 leading-relaxed">{benefit.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={onContact}
                        className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 border border-white/20 shadow-xl"
                    >
                        Beratungstermin vereinbaren
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </ScrollReveal>
            </div>

            {/* Right Column: Visuals & Use Cases */}
            <div className="space-y-8 relative z-20">
                <ScrollReveal animation="fade-in-left" delay={200}>
                    <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700 rounded-3xl overflow-hidden p-8 shadow-2xl relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-50"></div>
                        
                        <h3 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                            Anwendungsbeispiele
                        </h3>
                        
                        <div className="space-y-4 relative z-10">
                            {data.useCases.map((useCase, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <span className="text-gray-200 font-medium">{useCase}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Main Image Box - Fixed visibility */}
                <ScrollReveal animation="zoom-in" delay={400}>
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center group shadow-2xl ring-1 ring-white/10 z-30">
                        
                        {data.imageUrl ? (
                           <div className="relative w-full h-full">
                               <img 
                                   src={data.imageUrl} 
                                   alt={data.title} 
                                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 block"
                                   onError={(e) => {
                                       const target = e.target as HTMLImageElement;
                                       target.src = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200';
                                   }}
                               />
                               
                               {/* Subtle Overlay Gradients */}
                               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                               
                               {/* Tech effects with higher priority */}
                               <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(59,130,246,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                           </div>
                        ) : (
                           <>
                             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
                             <div className="relative z-10 opacity-60">
                                  <HologramGraphic className="w-48 h-48" />
                             </div>
                           </>
                        )}
                        
                        <div className="absolute bottom-6 right-6 text-[10px] font-mono font-bold text-blue-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-blue-500/40 uppercase tracking-[0.2em] flex items-center gap-3 z-40 shadow-2xl backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                            Swiss AI Processing Node
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
