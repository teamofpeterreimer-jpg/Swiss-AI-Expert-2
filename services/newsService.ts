import { NewsArticle } from '../types';

const STORAGE_KEY = 'swiss_ai_news_v3';

const DEFAULT_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: "KI-Durchbruch in der Schweizer Medizintechnik",
    date: "12. Mai 2024",
    excerpt: "Ein Konsortium aus ETH Zürich und privaten Partnern stellt ein neues Modell zur Früherkennung von seltenen Krankheiten vor.",
    content: "Zürich, 12. Mai 2024 – In einer bahnbrechenden Zusammenarbeit zwischen der ETH Zürich und führenden Schweizer Medizintechnik-Unternehmen wurde heute ein neues KI-Modell vorgestellt. Das System nutzt Deep-Learning-Algorithmen, um komplexe radiologische Muster zu analysieren, die für das menschliche Auge oft unsichtbar bleiben. \n\nTests in drei grossen Schweizer Spitälern zeigten eine Verbesserung der Früherkennungsrate um über 25%. Dies markiert einen bedeutenden Schritt für den Medtech-Standort Schweiz und unterstreicht die Relevanz von KI im Gesundheitswesen.",
    category: "Technologie",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    seo: {
      metaTitle: "KI in der Medizintechnik Schweiz | Swiss AI News",
      metaDescription: "Erfahren Sie mehr über den neuesten KI-Durchbruch der ETH Zürich in der Medizintechnik.",
      keywords: "KI, Medizintechnik, ETH Zürich, Schweiz, Technologie"
    }
  },
  {
    id: '2',
    title: "Der digitale Mitarbeiter: Wie KMUs den Fachkräftemangel besiegen",
    date: "05. Mai 2024",
    excerpt: "Immer mehr Schweizer Betriebe setzen auf KI-Agenten, um administrative Aufgaben zu automatisieren und Ressourcen freizusetzen.",
    externalLink: "https://www.google.ch/search?q=KI+Fachkräftemangel+Schweiz",
    category: "Wirtschaft",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    seo: {
      metaTitle: "Digitaler Mitarbeiter gegen Fachkräftemangel | Swiss AI",
      metaDescription: "Wie Schweizer KMUs durch KI-Agenten administrative Aufgaben automatisieren.",
      keywords: "Digitaler Mitarbeiter, KMU, Fachkräftemangel, Automation"
    }
  }
];

export const getNews = (): NewsArticle[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NEWS));
    return DEFAULT_NEWS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("News Storage corrupted:", e);
    return DEFAULT_NEWS;
  }
};

export const addNews = (article: NewsArticle) => {
  const news = getNews();
  const updated = [article, ...news];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const deleteNews = (id: string): NewsArticle[] => {
  const news = getNews();
  // String-Vergleich um Typ-Konflikte zu vermeiden
  const updated = news.filter(n => String(n.id) !== String(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};