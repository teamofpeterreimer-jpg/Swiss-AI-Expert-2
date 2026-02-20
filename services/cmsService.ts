
import { WebsiteContent } from '../types';

const STORAGE_KEY = 'swiss_ai_content_v9';

const DEFAULT_CONTENT: WebsiteContent = {
  seo: {
    globalTitle: 'Swiss AI | Führende KI-Integration & KI-Transformation für KMUs im DACH-Raum',
    globalDescription: 'Swiss AI ist Ihr Partner für Künstliche Intelligenz in der Schweiz sowie auch im ganzen DACH Raum. Wir bieten KI-Integration, Voice Agents/digitale Mitarbeiter und KI-Transformation für KMUs. Effizienz steigern durch modernste AI-Lösungen.',
    globalKeywords: 'KI Integration Schweiz, KI Transformation KMU, Künstliche Intelligenz Lösungen, Digitale Mitarbeiter, KI Video Generation, AI Marketing Automation, Schweizer KI Experten, Künstliche Integligenz'
  },
  hero: {
    title: 'Ganzheitliche KI-Integration &',
    subtitle: 'KI-Transformation für KMU',
    description: 'Wir begleiten Unternehmen im DACH Raum sicher durch die Ära der Künstlichen Intelligenz. Optimieren Sie Ihre Wertschöpfungskette durch massgeschneiderte KI-Integration, digitale Mitarbeiter und automatisierte Prozesslandschaften – präzise, sicher und lokal.',
    ctaPrimary: 'KI-Potential Analyse',
    ctaSecondary: 'KI-Lösungen entdecken'
  },
  about: {
    title: 'Ihre Experten für KI-Transformation',
    description: 'Als führender Schweizer Partner für KI-Integration kombinieren wir lokale Verlässlichkeit mit globaler technologischer Exzellenz. Wir erschaffen intelligente KI-Systeme, die Schweizer KMUs einen signifikanten Wettbewerbsvorteil verschaffen und repetitive Arbeitsprozesse nachhaltig eliminieren.',
    features: [
      { title: 'KI-Strategie & Consulting', desc: 'Ganzheitliche Roadmap für Ihre KI-Transformation und Prozessoptimierung.' },
      { title: 'Nahtlose KI-Integration', desc: 'Sichere Anbindung modernster Sprachmodelle an Ihre bestehende IT-Infrastruktur.' },
      { title: 'Schweizer Datenschutz', desc: 'Höchste Sicherheitsstandards und DSGVO-konforme KI-Lösungen für sensible Daten.' }
    ]
  },
  contact: {
    email: 'info@swiss-ai.expert',
    phone: '+41 44 123 45 67',
    address: 'Im Stadtwald 5, 9400 Rorschach'
  },
  subpages: [
    {
      id: 'digital-employees',
      title: 'Digitale Mitarbeiter',
      subtitle: 'Intelligente KI-Agenten für maximale Produktivität',
      iconName: 'Users',
      imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=1200',
      description: 'Digitale Mitarbeiter sind spezialisierte KI-Agenten, die nahtlos in Ihre Teams integriert werden. Diese autonomen Systeme übernehmen den Kundensupport, qualifizieren Leads oder automatisieren komplexe Sachbearbeitungen – rund um die Uhr, in Schweizer Qualität und mit stetig wachsender Intelligenz.',
      benefits: [
        { title: '24/7 Verfügbarkeit', text: 'Kundenanfragen werden in Sekunden bearbeitet, unabhängig von Geschäftszeiten.' },
        { title: 'Drastische Kostenreduktion', text: 'Minimieren Sie administrative Fixkosten durch effiziente KI-Automation.' },
        { title: 'Sofortige Skalierbarkeit', text: 'Passen Sie Ihre Kapazitäten in Echtzeit an schwankende Auftragsvolumina an.' },
        { title: 'Absolute Datenpräzision', text: 'Fehlerfreie Bearbeitung komplexer Geschäftsvorfälle durch optimierte KI-Modelle.' },
        { title: 'Maximale Mitarbeiterentlastung', text: 'Befreien Sie Ihre Talente von repetitiven Aufgaben für strategisches Wachstum.' }
      ],
      useCases: ['KI-Kundensupport', 'Automatisierte Terminbuchung', 'Intelligente Lead-Qualifizierung']
    },
    {
      id: 'marketing',
      title: 'KI-Marketing Automation',
      subtitle: 'Datengesteuertes Wachstum durch generative KI',
      iconName: 'Megaphone',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      description: 'Revolutionieren Sie Ihre Marktpräsenz durch KI-gestütztes Performance Marketing. Wir implementieren generative KI-Systeme für SEO-Content, Social Media und hyper-personalisierte Kampagnen, die sich in Echtzeit an das Nutzerverhalten anpassen und Ihren ROI signifikant steigern.',
      benefits: [
        { title: 'KI-Personalisierung', text: 'Individuelle Customer Journeys basierend auf prädiktiven Verhaltensanalysen.' },
        { title: 'Automatisierte SEO-Dominanz', text: 'Kontinuierliche Erstellung von ranking-relevantem Content durch generative KI.' },
        { title: 'Echtzeit-Kampagnenoptimierung', text: 'Algorithmische Budgetsteuerung für die niedrigsten Akquisitionskosten.' },
        { title: 'Integrierte Markenkonsistenz', text: 'KI-Prüfung aller Inhalte auf Konformität mit Ihrer Corporate Identity.' },
        { title: 'Skalierbare Content-Produktion', text: 'Erstellung von Multichannel-Assets in Minuten statt in Tagen.' }
      ],
      useCases: ['KI-SEO Automation', 'Algorithmisches Ad-Management', 'Social Media KI-Content']
    },
    {
      id: 'webdesign',
      title: 'Intelligentes Webdesign',
      subtitle: 'Konversionsstarke Plattformen mit KI-Core',
      iconName: 'Globe',
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1200',
      description: 'Wir gestalten Webseiten, die das Zentrum Ihrer KI-Strategie bilden. Durch die Integration von KI in UI/UX-Prozesse erschaffen wir hochgradig optimierte Plattformen mit Schweizer Präzision, die Besucher nicht nur informieren, sondern durch interaktive KI-Elemente direkt binden.',
      benefits: [
        { title: 'Behavioral UX Design', text: 'Schnittstellen, die sich dynamisch an das Klickverhalten Ihrer Nutzer anpassen.' },
        { title: 'Extreme Ladezeit-Optimierung', text: 'KI-gesteuerte Kompression und Code-Struktur für Bestnoten bei Core Web Vitals.' },
        { title: 'Native KI-Schnittstellen', text: 'Direkte Einbettung von KI-Tools und Assistenten in das User Interface.' },
        { title: 'Adaptive Mobile Experiences', text: 'KI-optimierte Darstellung für jedes Endgerät und jede Bildschirmgrösse.' },
        { title: 'Prädiktive Analyse-Tools', text: 'Eingebaute Auswertungen zur Vorhersage von Nutzer-Konversionen.' }
      ],
      useCases: ['Corporate AI Websites', 'KI-Landingpage Optimierung', 'Smart E-Commerce Solutions']
    },
    {
      id: 'ki-video',
      title: 'KI-Video Generation',
      subtitle: 'Visuelles Storytelling durch künstliche Intelligenz',
      iconName: 'Video',
      imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
      description: 'Produzieren Sie Video-Inhalte in Kinoqualität ohne teure Studios oder Kamera-Teams. Mit modernster KI-Video-Technologie generieren wir realistische Avatare und Umgebungen für Schulungen, Marketing und Vertrieb – lippensynchron und in jeder gewünschten Sprache.',
      benefits: [
        { title: 'Globale Sprachadaption', text: 'Vollautomatische Übersetzung und Lippensynchronität in über 60 Sprachen.' },
        { title: '90% Kostenersparnis', text: 'Professionelle Video-Assets ohne Studioaufwand oder teure Produktionsteams.' },
        { title: 'Agile Content-Erstellung', text: 'Aktualisierung von Video-Inhalten in Echtzeit ohne neuen Dreh.' },
        { title: 'Custom KI-Avatare', text: 'Digitale Zwillinge Ihres eigenen Personals für authentisches Branding.' },
        { title: 'Personalisierte Sales-Videos', text: 'Automatisierte Generierung von individuellen Videobotschaften für jeden Lead.' }
      ],
      useCases: ['KI-Erklärvideos', 'Personalisierte Sales-Videos', 'Automatisierter Social Video Content']
    }
  ]
};

export const getContent = (): WebsiteContent => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONTENT));
    return DEFAULT_CONTENT;
  }
  return JSON.parse(stored);
};

export const saveContent = (content: WebsiteContent) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  document.title = content.seo.globalTitle;
};
