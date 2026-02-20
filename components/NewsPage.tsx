
import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Newspaper, ExternalLink, X, ArrowLeft } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { NewsArticle } from '../types';
import { getNews } from '../services/newsService';

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    setArticles(getNews());
  }, []);

  const handleArticleClick = (article: NewsArticle) => {
    if (article.externalLink) {
      window.open(article.externalLink, '_blank');
    } else if (article.content) {
      setSelectedArticle(article);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen container mx-auto px-4">
      {selectedArticle ? (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Übersicht
          </button>
          
          <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl">
            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-swiss-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {selectedArticle.category}
                </span>
                <span className="text-gray-300 text-xs flex items-center gap-1">
                  <Calendar size={12} /> {selectedArticle.date}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">{selectedArticle.title}</h1>
            </div>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <div className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-line">
              {selectedArticle.content}
            </div>
          </div>
        </div>
      ) : (
        <>
          <ScrollReveal animation="fade-in-up">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center justify-center text-swiss-red shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                <Newspaper size={32} />
              </div>
              <div>
                <span className="text-swiss-red font-medium tracking-wider uppercase text-sm">Insights & Updates</span>
                <h1 className="text-4xl md:text-5xl font-bold mt-1">KI-News Schweiz</h1>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <ScrollReveal key={article.id} animation="fade-in-up" delay={idx * 100}>
                <article 
                  onClick={() => handleArticleClick(article)}
                  className="group bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-swiss-red/50 transition-all duration-500 h-full flex flex-col cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-swiss-red/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {article.category}
                    </div>
                    {article.externalLink && (
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-1.5 rounded-lg text-white">
                        <ExternalLink size={14} />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                      <Calendar size={14} />
                      {article.date}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-swiss-red transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-swiss-red font-semibold text-sm">
                      {article.externalLink ? 'Externen Artikel öffnen' : 'Weiterlesen'}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="zoom-in" delay={500}>
            <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 text-center">
              <h3 className="text-2xl font-bold mb-4">Wollen Sie tiefer eintauchen?</h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Wir veröffentlichen regelmässig Whitepaper und Case Studies zur KI-Transformation in der Schweiz.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-swiss-red hover:text-white transition-all shadow-xl">
                Whitepaper Archiv
                <ExternalLink size={18} />
              </button>
            </div>
          </ScrollReveal>
        </>
      )}
    </div>
  );
};

export default NewsPage;
