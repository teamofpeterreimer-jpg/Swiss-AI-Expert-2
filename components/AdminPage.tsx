
import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Plus, Trash2, LayoutDashboard, LogOut, FileText, Globe, Save, CheckCircle, Search, Edit3, ChevronRight, Image as ImageIcon, ListChecks, HelpCircle, Link as LinkIcon, Type, Mail, Phone, MapPin, Settings, AlertCircle } from 'lucide-react';
import { NewsArticle, WebsiteContent, EditableSubpage } from '../types';
import { getNews, addNews, deleteNews } from '../services/newsService';
import { getContent, saveContent } from '../services/cmsService';
import ScrollReveal from './ScrollReveal';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'news' | 'content'>('content');
  const [editingSubpageId, setEditingSubpageId] = useState<string | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent | null>(null);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [newsFormData, setNewsFormData] = useState({
    title: '', excerpt: '', content: '', externalLink: '', category: 'Technologie', image: ''
  });

  const refreshNews = useCallback(() => {
    const latestNews = getNews();
    setArticles([...latestNews]);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshNews();
      setWebsiteContent(getContent());
    }
  }, [isAuthenticated, refreshNews]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'SwissAI2024') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: NewsArticle = {
      id: Date.now().toString(),
      title: newsFormData.title,
      date: new Date().toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' }),
      excerpt: newsFormData.excerpt,
      content: newsFormData.content || undefined,
      externalLink: newsFormData.externalLink || undefined,
      category: newsFormData.category as any,
      image: newsFormData.image || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
      seo: { metaTitle: '', metaDescription: '', keywords: '' }
    };
    addNews(newArticle);
    refreshNews();
    setShowNewsForm(false);
    setNewsFormData({ title: '', excerpt: '', content: '', externalLink: '', category: 'Technologie', image: '' });
  };

  const handleDeleteNews = (id: string) => {
    if (window.confirm('Möchten Sie diesen News-Beitrag wirklich unwiderruflich löschen?')) {
      // Direct deletion in service and immediate state update
      deleteNews(id);
      const updated = getNews();
      setArticles([...updated]);
    }
  };

  const handleSaveWebsiteContent = () => {
    if (websiteContent) {
      setIsSaving(true);
      saveContent(websiteContent);
      setTimeout(() => {
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }, 800);
    }
  };

  const updateSubpage = (id: string, updates: Partial<EditableSubpage>) => {
    if (!websiteContent) return;
    const newSubpages = websiteContent.subpages.map(sp => 
      sp.id === id ? { ...sp, ...updates } : sp
    );
    setWebsiteContent({ ...websiteContent, subpages: newSubpages });
  };

  const addBenefit = (subpageId: string) => {
    if (!websiteContent) return;
    const subpage = websiteContent.subpages.find(s => s.id === subpageId);
    if (!subpage) return;
    const newBenefits = [...subpage.benefits, { title: 'Neuer Vorteil', text: 'Kurze Beschreibung des Vorteils...' }];
    updateSubpage(subpageId, { benefits: newBenefits });
  };

  const removeBenefit = (subpageId: string, index: number) => {
    if (!websiteContent) return;
    const subpage = websiteContent.subpages.find(s => s.id === subpageId);
    if (!subpage) return;
    const newBenefits = subpage.benefits.filter((_, i) => i !== index);
    updateSubpage(subpageId, { benefits: newBenefits });
  };

  const addUseCase = (subpageId: string) => {
    if (!websiteContent) return;
    const subpage = websiteContent.subpages.find(s => s.id === subpageId);
    if (!subpage) return;
    const newUseCases = [...subpage.useCases, 'Neuer Anwendungsfall'];
    updateSubpage(subpageId, { useCases: newUseCases });
  };

  const removeUseCase = (subpageId: string, index: number) => {
    if (!websiteContent) return;
    const subpage = websiteContent.subpages.find(s => s.id === subpageId);
    if (!subpage) return;
    const newUseCases = subpage.useCases.filter((_, i) => i !== index);
    updateSubpage(subpageId, { useCases: newUseCases });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <ScrollReveal animation="zoom-in">
          <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl text-center">
            <div className="w-20 h-20 bg-swiss-red/10 rounded-full flex items-center justify-center text-swiss-red mb-8 mx-auto border border-swiss-red/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]"><Lock size={40} /></div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-500 mb-8">Bitte geben Sie das Zugriffspasswort ein.</p>
            <form onSubmit={handleLogin} className="space-y-6 text-left">
              <div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className={`w-full bg-slate-800/50 border ${loginError ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-slate-700'} rounded-2xl px-5 py-4 text-white outline-none focus:border-swiss-red focus:ring-1 focus:ring-swiss-red/50 transition-all`} 
                  placeholder="Passwort" 
                />
                {loginError && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12}/> Ungültiges Passwort</p>}
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-swiss-red via-blue-600 to-swiss-red bg-[length:200%_auto] animate-gradient-x py-4 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all transform active:scale-[0.98]">Anmelden</button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-swiss-red border border-slate-700 shadow-xl"><LayoutDashboard size={28} /></div>
          <div>
            <h1 className="text-3xl font-bold">Zentrale Steuerung</h1>
            <p className="text-gray-500 text-sm">Verwalten Sie Inhalte und News-Feeds</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="bg-slate-800/50 p-1.5 rounded-2xl flex border border-slate-700/50 backdrop-blur-sm shadow-inner">
                <button onClick={() => setActiveTab('content')} className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'content' ? 'bg-swiss-red text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><Globe size={18}/> Website Editor</button>
                <button onClick={() => setActiveTab('news')} className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'news' ? 'bg-swiss-red text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}><FileText size={18}/> News CMS</button>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="p-3.5 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-red-500 rounded-2xl border border-slate-700 transition-colors shadow-lg" title="Abmelden"><LogOut size={22} /></button>
        </div>
      </div>

      {activeTab === 'content' && websiteContent ? (
        <div className="space-y-12 animate-fade-in-up pb-24">
            
            {/* Global Settings & SEO Card */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10"></div>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-4 text-white">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20"><Search size={22}/></div>
                        Globales SEO & Branding
                    </h2>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Grundlagen</span>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Type size={12}/> Website Haupttitel (Title Tag)</label>
                            <input 
                                value={websiteContent.seo.globalTitle} 
                                onChange={(e) => setWebsiteContent({...websiteContent, seo: {...websiteContent.seo, globalTitle: e.target.value}})} 
                                className="w-full bg-slate-800/40 border border-slate-700 rounded-2xl px-5 py-3.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all" 
                                placeholder="Swiss AI | Ihr Partner..."
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Settings size={12}/> Fokus-Keywords (Kommasepariert)</label>
                            <input 
                                value={websiteContent.seo.globalKeywords} 
                                onChange={(e) => setWebsiteContent({...websiteContent, seo: {...websiteContent.seo, globalKeywords: e.target.value}})} 
                                className="w-full bg-slate-800/40 border border-slate-700 rounded-2xl px-5 py-3.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all" 
                                placeholder="KI, Automation, Schweiz..."
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><FileText size={12}/> Meta Description (Suchmaschinenvorschau)</label>
                        <textarea 
                            rows={5} 
                            value={websiteContent.seo.globalDescription} 
                            onChange={(e) => setWebsiteContent({...websiteContent, seo: {...websiteContent.seo, globalDescription: e.target.value}})} 
                            className="w-full bg-slate-800/40 border border-slate-700 rounded-2xl px-5 py-3.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all resize-none" 
                            placeholder="Beschreiben Sie kurz Ihr Angebot für Google..."
                        />
                    </div>
                </div>
            </div>

            {/* Core Sections Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Hero Editor Card */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 shadow-xl border-t-swiss-red/20 border-t-2">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-swiss-red">
                        <Edit3 size={20}/> Hero-Bereich
                    </h2>
                    <div className="space-y-5">
                        <input 
                            value={websiteContent.hero.title} 
                            onChange={(e) => setWebsiteContent({...websiteContent, hero: {...websiteContent.hero, title: e.target.value}})} 
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-swiss-red outline-none" 
                            placeholder="Überschrift (H1)"
                        />
                        <input 
                            value={websiteContent.hero.subtitle} 
                            onChange={(e) => setWebsiteContent({...websiteContent, hero: {...websiteContent.hero, subtitle: e.target.value}})} 
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-swiss-red outline-none" 
                            placeholder="Unterzeile (Highlight)"
                        />
                        <textarea 
                            rows={4} 
                            value={websiteContent.hero.description} 
                            onChange={(e) => setWebsiteContent({...websiteContent, hero: {...websiteContent.hero, description: e.target.value}})} 
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-swiss-red outline-none resize-none" 
                            placeholder="Intro-Text"
                        />
                    </div>
                </div>

                {/* Contact Information Editor Card */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 shadow-xl border-t-green-500/20 border-t-2">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-green-400">
                        <Mail size={20}/> Kontakt-Zentrale
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Ziel-Email für Anfragen</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14}/>
                                <input 
                                    value={websiteContent.contact.email} 
                                    onChange={(e) => setWebsiteContent({...websiteContent, contact: {...websiteContent.contact, email: e.target.value}})} 
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:border-green-400 outline-none" 
                                    placeholder="email@beispiel.ch"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Telefonnummer</label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14}/>
                                <input 
                                    value={websiteContent.contact.phone} 
                                    onChange={(e) => setWebsiteContent({...websiteContent, contact: {...websiteContent.contact, phone: e.target.value}})} 
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:border-green-400 outline-none" 
                                    placeholder="+41..."
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Firmenadresse</label>
                            <div className="relative">
                                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14}/>
                                <input 
                                    value={websiteContent.contact.address} 
                                    onChange={(e) => setWebsiteContent({...websiteContent, contact: {...websiteContent.contact, address: e.target.value}})} 
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:border-green-400 outline-none" 
                                    placeholder="Strasse, PLZ Ort"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subpage Quick Nav Card */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 shadow-xl border-t-purple-500/20 border-t-2 h-full flex flex-col">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-purple-400">
                        <LayoutDashboard size={20}/> Unterseiten
                    </h2>
                    <div className="space-y-2.5 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar flex-1">
                        {websiteContent.subpages.map(sp => (
                            <button 
                                key={sp.id}
                                onClick={() => setEditingSubpageId(editingSubpageId === sp.id ? null : sp.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${editingSubpageId === sp.id ? 'bg-purple-500/10 border-purple-500/50 text-white shadow-lg' : 'bg-slate-800/30 border-slate-700 text-gray-400 hover:border-slate-500 hover:bg-slate-800/50'}`}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${editingSubpageId === sp.id ? 'bg-purple-400 animate-pulse' : 'bg-slate-600'}`}></div>
                                    <span className="font-bold text-xs truncate">{sp.title}</span>
                                </div>
                                <Edit3 size={14} className={editingSubpageId === sp.id ? 'text-purple-400' : 'opacity-40'} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subpage Detailed Editor Panel */}
            {editingSubpageId && (
                <div className="bg-slate-900/90 border border-purple-500/30 rounded-[2.5rem] p-10 space-y-10 animate-fade-in-up shadow-[0_0_50px_rgba(168,85,247,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 blur-[120px] -z-10"></div>
                    {(() => {
                        const sp = websiteContent.subpages.find(s => s.id === editingSubpageId);
                        if (!sp) return null;
                        return (
                            <>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-slate-800">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 border border-purple-500/20"><Edit3 size={24}/></div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Inhalts-Editor: {sp.title}</h3>
                                            <p className="text-gray-500 text-sm">Präzisieren Sie das Angebot dieser Sektion</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setEditingSubpageId(null)} className="p-2.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"><LogOut size={22}/></button>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div className="bg-slate-800/20 p-6 rounded-2xl border border-slate-800">
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Titel & Branding</label>
                                            <div className="space-y-4">
                                                <input value={sp.title} onChange={(e) => updateSubpage(sp.id, { title: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-400 outline-none" placeholder="Anzeigetitel"/>
                                                <input value={sp.subtitle} onChange={(e) => updateSubpage(sp.id, { subtitle: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-400 outline-none" placeholder="Untertitel / Slogan"/>
                                            </div>
                                        </div>
                                        <div className="bg-slate-800/20 p-6 rounded-2xl border border-slate-800">
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><ImageIcon size={12}/> Medien-Ressourcen</label>
                                            <input value={sp.imageUrl} onChange={(e) => updateSubpage(sp.id, { imageUrl: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-[10px] font-mono focus:border-purple-400 outline-none" placeholder="Bild URL (https://...)"/>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800/20 p-6 rounded-2xl border border-slate-800 h-full flex flex-col">
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Ausführliche Beschreibung</label>
                                        <textarea rows={10} value={sp.description} onChange={(e) => updateSubpage(sp.id, { description: e.target.value })} className="w-full flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white text-sm focus:border-purple-400 outline-none resize-none leading-relaxed" placeholder="Beschreiben Sie das Angebot im Detail..."/>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-10 pt-10 border-t border-slate-800">
                                    {/* Benefits Editor */}
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20"><ListChecks size={16}/></div>
                                                Kernvorteile
                                            </h4>
                                            <button onClick={() => addBenefit(sp.id)} className="text-[10px] bg-blue-600/10 text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-600/20 border border-blue-500/20 transition-all font-bold">+ Hinzufügen</button>
                                        </div>
                                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                            {sp.benefits.map((ben, idx) => (
                                                <div key={idx} className="bg-slate-800/30 p-5 rounded-2xl border border-slate-700 relative group animate-fade-in">
                                                    <button onClick={() => removeBenefit(sp.id, idx)} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1.5 hover:bg-red-500/10 rounded-lg"><Trash2 size={16}/></button>
                                                    <input 
                                                        value={ben.title} 
                                                        onChange={(e) => {
                                                            const newBens = [...sp.benefits];
                                                            newBens[idx].title = e.target.value;
                                                            updateSubpage(sp.id, { benefits: newBens });
                                                        }} 
                                                        className="w-[calc(100%-40px)] bg-transparent font-bold text-white mb-2 outline-none border-b border-slate-700 focus:border-blue-500 transition-colors" 
                                                        placeholder="Vorteil Bezeichnung" 
                                                    />
                                                    <textarea 
                                                        value={ben.text} 
                                                        onChange={(e) => {
                                                            const newBens = [...sp.benefits];
                                                            newBens[idx].text = e.target.value;
                                                            updateSubpage(sp.id, { benefits: newBens });
                                                        }} 
                                                        className="w-full bg-transparent text-xs text-gray-500 outline-none resize-none leading-relaxed" 
                                                        rows={2} 
                                                        placeholder="Detailliertere Beschreibung des Vorteils..." 
                                                    />
                                                </div>
                                            ))}
                                            {sp.benefits.length === 0 && <p className="text-center text-gray-600 py-6 text-sm italic border-2 border-dashed border-slate-800 rounded-2xl">Keine Vorteile definiert</p>}
                                        </div>
                                    </div>

                                    {/* Use Cases Editor */}
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-sm font-bold text-green-400 uppercase tracking-widest flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20"><CheckCircle size={16}/></div>
                                                Anwendungsbeispiele
                                            </h4>
                                            <button onClick={() => addUseCase(sp.id)} className="text-[10px] bg-green-600/10 text-green-400 px-3 py-1.5 rounded-lg hover:bg-green-600/20 border border-blue-500/20 transition-all font-bold">+ Hinzufügen</button>
                                        </div>
                                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                            {sp.useCases.map((uc, idx) => (
                                                <div key={idx} className="flex gap-3 items-center group animate-fade-in bg-slate-800/20 p-2 rounded-xl border border-transparent hover:border-slate-700">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
                                                    <input 
                                                        value={uc} 
                                                        onChange={(e) => {
                                                            const newUC = [...sp.useCases];
                                                            newUC[idx] = e.target.value;
                                                            updateSubpage(sp.id, { useCases: newUC });
                                                        }} 
                                                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-300 focus:text-white transition-colors" 
                                                        placeholder="Beispiel Case Study..."
                                                    />
                                                    <button onClick={() => removeUseCase(sp.id, idx)} className="text-gray-700 hover:text-red-500 p-1.5 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                                                </div>
                                            ))}
                                            {sp.useCases.length === 0 && <p className="text-center text-gray-600 py-6 text-sm italic border-2 border-dashed border-slate-800 rounded-2xl">Keine Beispiele definiert</p>}
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}

            {/* Final Save Action - Sticky Bottom */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4">
                <button 
                    onClick={handleSaveWebsiteContent}
                    disabled={isSaving}
                    className={`w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all transform hover:scale-105 active:scale-95 border border-white/20 ${saveSuccess ? 'bg-green-600' : 'bg-blue-600'} text-white overflow-hidden relative group`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    {isSaving ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Wird gesichert...
                        </>
                    ) : saveSuccess ? (
                        <><CheckCircle size={22}/> Änderungen aktiv!</>
                    ) : (
                        <><Save size={22}/> Alles jetzt live stellen</>
                    )}
                </button>
            </div>
        </div>
      ) : activeTab === 'news' ? (
        <div className="space-y-10 animate-fade-in-up">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-[2rem] p-8 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">KI-News Feed Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Aktuell {articles.length} Beiträge in der Datenbank</p>
                </div>
                <button onClick={() => setShowNewsForm(!showNewsForm)} className="bg-swiss-red px-6 py-3.5 rounded-2xl font-bold flex items-center gap-3 transition-all hover:bg-red-600 shadow-xl shadow-swiss-red/20 active:scale-95">
                    {showNewsForm ? 'Abbrechen' : <><Plus size={22}/> Neuer Beitrag</>}
                </button>
            </div>

            {showNewsForm && (
                <form onSubmit={handleNewsSubmit} className="bg-slate-900/60 backdrop-blur-xl border border-swiss-red/20 rounded-[2.5rem] p-10 space-y-8 shadow-2xl animate-fade-in-down">
                    <div className="grid lg:grid-cols-2 gap-10">
                        <div className="space-y-6">
                             <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Artikel Titel</label>
                                <input placeholder="z.B. KI-Durchbruch in Zürich" required value={newsFormData.title} onChange={(e) => setNewsFormData({...newsFormData, title: e.target.value})} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:border-swiss-red outline-none" />
                             </div>
                             <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Kurzvorschau (Excerpt)</label>
                                <textarea placeholder="Geben Sie eine kurze Einleitung für die News-Karte..." required rows={4} value={newsFormData.excerpt} onChange={(e) => setNewsFormData({...newsFormData, excerpt: e.target.value})} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4 text-white resize-none focus:border-swiss-red outline-none" />
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Kategorie</label>
                                    <select className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white cursor-pointer focus:border-swiss-red outline-none appearance-none" value={newsFormData.category} onChange={(e) => setNewsFormData({...newsFormData, category: e.target.value as any})}>
                                        <option>Technologie</option><option>Wirtschaft</option><option>Marketing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Bild URL</label>
                                    <input placeholder="https://..." value={newsFormData.image} onChange={(e) => setNewsFormData({...newsFormData, image: e.target.value})} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:border-swiss-red outline-none" />
                                </div>
                             </div>
                        </div>
                        <div className="space-y-6">
                            <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700 space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest mb-3"><LinkIcon size={14}/> Option A: Externer Link</div>
                                    <input 
                                        placeholder="Ganze News-URL (https://...)" 
                                        value={newsFormData.externalLink} 
                                        onChange={(e) => setNewsFormData({...newsFormData, externalLink: e.target.value, content: e.target.value ? '' : newsFormData.content})} 
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3.5 text-white focus:border-blue-400 outline-none transition-all" 
                                    />
                                    <p className="text-[10px] text-gray-500 mt-2 italic">Nutzen Sie dies für Artikel von Drittseiten wie NZZ, SRF etc.</p>
                                </div>
                                
                                <div className="border-t border-slate-700 pt-6">
                                    <div className="flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-widest mb-3"><Type size={14}/> Option B: Eigener Artikel-Inhalt</div>
                                    <textarea 
                                        placeholder="Schreiben Sie hier den vollständigen Text..." 
                                        rows={6} 
                                        disabled={!!newsFormData.externalLink}
                                        value={newsFormData.content} 
                                        onChange={(e) => setNewsFormData({...newsFormData, content: e.target.value})} 
                                        className={`w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-white resize-none focus:border-green-400 outline-none transition-all ${!!newsFormData.externalLink ? 'opacity-30 cursor-not-allowed grayscale' : ''}`} 
                                    />
                                    {newsFormData.externalLink && <p className="text-[10px] text-swiss-red mt-2 font-bold animate-pulse">Hinweis: Deaktiviert, da ein externer Link gesetzt wurde.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-swiss-red py-5 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-xl hover:shadow-swiss-red/30 active:scale-[0.99] border border-white/10 uppercase tracking-widest text-sm">Beitrag jetzt live schalten</button>
                </form>
            )}

            <div className="grid gap-4">
                {articles.length === 0 && <div className="bg-slate-900/60 border-2 border-dashed border-slate-800 p-16 rounded-[2rem] text-center"><p className="text-gray-500 font-medium">Bisher keine News-Beiträge veröffentlicht.</p></div>}
                {articles.map(art => (
                <div key={art.id} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center group hover:border-slate-600 transition-all shadow-lg gap-6">
                    <div className="flex gap-6 items-center w-full">
                        <div className="relative shrink-0">
                            <img src={art.image} className="w-16 h-16 rounded-xl object-cover border border-slate-700 shadow-md group-hover:scale-105 transition-transform" alt="" />
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-swiss-red rounded-lg flex items-center justify-center text-[10px] font-bold border border-slate-900">{art.category[0]}</div>
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold text-lg text-white truncate">{art.title}</p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                                <span className="flex items-center gap-1.5"><Calendar size={12}/> {art.date}</span>
                                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                <span className="flex items-center gap-1.5">{art.category}</span>
                                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                {art.externalLink ? (
                                    <span className="text-blue-400 flex items-center gap-1.5 font-bold"><LinkIcon size={12}/> Link zu Drittseite</span>
                                ) : (
                                    <span className="text-green-400 flex items-center gap-1.5 font-bold"><Type size={12}/> Manueller Artikel</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button onClick={() => handleDeleteNews(art.id)} className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20" title="Beitrag löschen"><Trash2 size={20}/></button>
                    </div>
                </div>
                ))}
            </div>
        </div>
      ) : null}
    </div>
  );
};

const Calendar = ({ size }: { size: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;

export default AdminPage;
