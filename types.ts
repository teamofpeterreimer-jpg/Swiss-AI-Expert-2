
import React from 'react';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  DEMO = 'demo',
  CONTACT = 'contact',
  NEWS = 'news',
  ADMIN = 'admin'
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  externalLink?: string;
  category: 'Technologie' | 'Wirtschaft' | 'Recht' | 'Marketing';
  image: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

export interface DetailPageData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  imageUrl?: string;
  benefits: {
    title: string;
    text: string;
  }[];
  useCases: string[];
}

export interface EditableSubpage {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  imageUrl?: string;
  description: string;
  benefits: {
    title: string;
    text: string;
  }[];
  useCases: string[];
}

export interface WebsiteContent {
  seo: {
    globalTitle: string;
    globalDescription: string;
    globalKeywords: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    description: string;
    features: {
      title: string;
      desc: string;
    }[];
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  subpages: EditableSubpage[];
}
