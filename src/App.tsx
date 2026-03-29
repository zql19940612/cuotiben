/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, LayoutGrid, Trophy, ChevronLeft } from 'lucide-react';
import WrongQuestionHome from './components/WrongQuestionHome';
import WrongQuestionDetail from './components/WrongQuestionDetail';
import WrongQuestionManagement from './components/WrongQuestionManagement';
import WrongQuestionAchievement from './components/WrongQuestionAchievement';
import { MOCK_QUESTIONS, WrongQuestion } from './types';

type Page = 'home' | 'detail' | 'management' | 'achievement';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedQuestion, setSelectedQuestion] = useState<WrongQuestion | null>(null);

  const navigateToDetail = (question: WrongQuestion) => {
    setSelectedQuestion(question);
    setCurrentPage('detail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <WrongQuestionHome onQuestionClick={navigateToDetail} onGoToAchievement={() => setCurrentPage('achievement')} />;
      case 'detail':
        return selectedQuestion ? (
          <WrongQuestionDetail 
            question={selectedQuestion} 
            onBack={() => setCurrentPage('home')} 
          />
        ) : null;
      case 'management':
        return <WrongQuestionManagement onBack={() => setCurrentPage('home')} />;
      case 'achievement':
        return <WrongQuestionAchievement onBack={() => setCurrentPage('home')} />;
      default:
        return <WrongQuestionHome onQuestionClick={navigateToDetail} onGoToAchievement={() => setCurrentPage('achievement')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a3a] text-white font-sans selection:bg-purple-500/30 overflow-hidden relative flex">
      {/* Background Stars/Nebula */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-indigo-600/10 blur-[80px] rounded-full" />
      </div>

      {/* Left Navigation Bar */}
      <nav className="relative z-50 w-24 h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-12 gap-10 shadow-2xl">
        <div className="mb-8">
          <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
            <BookOpen size={24} className="text-purple-900" />
          </div>
        </div>
        
        <NavItem 
          active={currentPage === 'home'} 
          onClick={() => setCurrentPage('home')} 
          icon={<Home size={24} />} 
          label="错题本" 
        />
        <NavItem 
          active={currentPage === 'management'} 
          onClick={() => setCurrentPage('management')} 
          icon={<LayoutGrid size={24} />} 
          label="管理" 
        />
        <NavItem 
          active={currentPage === 'achievement'} 
          onClick={() => setCurrentPage('achievement')} 
          icon={<Trophy size={24} />} 
          label="成就" 
        />
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 h-screen flex flex-col">
        {/* Top Header (Optional, but good for back navigation) */}
        {currentPage !== 'home' && (
          <header className="p-4 flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage('home')}
              className="p-2 bg-white/10 rounded-full backdrop-blur-md"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <h1 className="text-xl font-bold">
              {currentPage === 'detail' ? '小迷糊题详情' : 
               currentPage === 'management' ? '小迷糊题管理' : 
               '我的荣誉勋章'}
            </h1>
          </header>
        )}

        <div className="flex-1 overflow-y-auto px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`relative flex flex-col items-center gap-2 transition-colors ${active ? 'text-yellow-400' : 'text-white/60'}`}
    >
      <div className={`p-3 rounded-2xl ${active ? 'bg-yellow-400/20' : 'hover:bg-white/5'}`}>
        {icon}
      </div>
      <span className="text-xs font-bold">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-indicator" 
          className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-yellow-400 rounded-full" 
        />
      )}
    </motion.button>
  );
}
