
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import NeuralBackground from './components/NeuralBackground';
import HomeView from './components/HomeView';
import DetailPage from './components/DetailPage';
import NewsPage from './components/NewsPage';
import AdminPage from './components/AdminPage';
import { SectionId, DetailPageData, WebsiteContent } from './types';
import { getContent } from './services/cmsService';
import { Users, Megaphone, ShieldCheck, Cpu, Video, Globe, LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  'Users': Users,
  'Megaphone': Megaphone,
  'ShieldCheck': ShieldCheck,
  'Cpu': Cpu,
  'Video': Video,
  'Globe': Globe
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SectionId.HOME);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavigateToDetail = (id: string) => {
    navigate(`/detail/${id}`);
  };

  const handleSectionNavigation = (id: string) => {
    if (id === SectionId.NEWS) {
      navigate('/news');
      return;
    }
    if (id === SectionId.ADMIN) {
      navigate('/admin');
      return;
    }

    // Check if we are already on home
    const isHome = location.pathname === '/';

    if (!isHome) {
      navigate('/');
      // Delay scrolling until after navigation
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Already on home, just scroll
      if (id === SectionId.HOME) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen text-white selection:bg-swiss-red relative bg-transparent">
      {/* Background stays fixed and behind everything */}
      <NeuralBackground />

      {/* Content wrapper needs to be relative and have a z-index to stay above background but allow transparency */}
      <div className="relative z-10">
        <Navbar
          activeSection={activeSection}
          onNavigate={handleSectionNavigation}
        />
        <Routes>
          <Route path="/" element={<HomeView onNavigateToDetail={handleNavigateToDetail} setActiveSection={setActiveSection} onNavigate={handleSectionNavigation} />} />
          <Route path="/detail/:id" element={<DetailWrapper />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<HomeView onNavigateToDetail={handleNavigateToDetail} setActiveSection={setActiveSection} onNavigate={handleSectionNavigation} />} />
        </Routes>
      </div>
    </div>
  );
};

// Wrapper to handle extracting ID from params and fetching data
const DetailWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<DetailPageData | null>(null);

  useEffect(() => {
    if (id) {
      const content = getContent();
      const subpage = content.subpages.find(s => s.id === id);
      if (subpage) {
        const detail: DetailPageData = {
          ...subpage,
          icon: ICON_MAP[subpage.iconName] || Cpu
        };
        setData(detail);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  if (!data) return null; // Or loading state

  return <DetailPage data={data} onBack={() => navigate('/')} onContact={() => navigate('/')} />; // Contact should probably scroll to contact
};

export default App;
